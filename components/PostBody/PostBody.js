import { useState } from 'react';
import { useRouter } from 'next/router';
import { checkValidity } from '@/helpers/utility';
import ErrorMessage from '../ui/Error/Error';
import Input from '../Input';
import { SpinnerDotted } from 'spinners-react';
import Head from 'next/head';

const PostBody = (props) => {
  const [valid, setValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();
  let post = props.post;

  // Définition des eléments du formulaire ainsi que leurs parametres

  const [inputs, setInputs] = useState({
    sujet:
      props.mode == 'post' || props.mode == 'edit'
        ? {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Sujet',
            },
            value: post ? post.sujet : '',
            label: 'Sujet',
            valid: post ? true : false,
            validation: {
              required: true,
              minLength: 6,
            },
            errorMessage: 'Le titre doit comporté au minimum 6 caractéres',
            touched: false,
          }
        : { valid: true },

    content: {
      elementType: 'textarea',
      elementConfig: {
        type: 'text',
        placeholder: 'Ecrivez votre message...',
        rows: 5,
        cols: 60,
      },
      value: post ? post.content : '',
      label: 'Contenu',
      valid: post ? true : false,
      validation: {
        required: true,
        minLength: props.mode == 'post' ? 120 : 8,
      },
      errorMessage: 'Le message doit dépasser 120 caractères ',
      touched: false,
    },
  });

  // function

  // Gerer le comportement lors de l'ecriture dans les inputs
  const inputChangeHandler = (event, id) => {
    const newInputs = { ...inputs };
    newInputs[id].value = event.target.value;
    newInputs[id].touched = true;

    // verificaiton de la valeur
    newInputs[id].valid = checkValidity(
      event.target.value,
      newInputs[id].validation
    );
    setInputs(newInputs);

    // Vérification du formulaire
    let formIsValid = true;
    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid;
    }
    setValid(formIsValid);
  };

  //fonction pour gérer le changement du contenu de l'éditeur
  const handleEditorChange = (value, id) => {
    const newInputs = { ...inputs };
    newInputs[id].value = value;
    newInputs[id].touched = true;
    // vérification de la valeur
    newInputs[id].valid = checkValidity(value, newInputs[id].validation);
    setInputs(newInputs);

    // Vérification du formulaire
    let formIsValid = true;
    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid;
    }
    setValid(formIsValid);
  };
  //Envoyer le post a la bd

  const addPostHandler = async () => {
    let newPost;
    if (props.mode == 'post') {
      newPost = {
        sujet: inputs.sujet.value,
        content: inputs.content.value,
        type: props.type,
        author: props.author,
      };
      console.log('post');
    } else {
      newPost = {
        content: inputs.content.value,
        slug: props.slug,
        author: props.author,
      };
      console.log('Reply');
    }

    setIsLoading(true);
    setError(null);
    // envoyer le nouveau projet sur l'API next
    // creer un dossier "api" invisible pour l'utilisateur
    // en fonction de la props.mode on appelle une API différente
    let url = props.mode == 'post' ? '/api/post' : '/api/reply';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.message || 'Une erreur est survenue');
    } else {
      setIsLoading(false);
      router.replace('/forum/' + data.projet.slug);
    }
  };

  const editPostHandler = async () => {
    let newPost;  

    newPost = {
      sujet: inputs.sujet.value,
      content: inputs.content.value,
      type: post.type,
      author: post.author,
      slug: post.slug,
      replys: post.replys
    };  

    const response = await fetch('/api/post?id=' + post._id, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.message || 'Une erreur est survenue');
    } else {
      setIsLoading(false);
      router.replace('/forum/' + data.projet.slug);
    }
  };

  // empeche la redirection lors de l'envoie du formulaire
  const formHandler = (e) => {
    e.preventDefault();
  };

  // ajouter tout les elments du formulaire dans un tableau
  const formElementsArray = [];
  for (let key in inputs) {
    formElementsArray.push({
      id: key,
      config: inputs[key],
    });
  }

  // pour chaque élement on appelle le composant Input et on lui passe les Props
  let form = (
    <>
      <form
        className="mt-5 p-5 mx-auto max-w-full  lg:w-2/3	"
        onSubmit={(e) => formHandler(e)}
      >
        {error && <ErrorMessage error={error} />}
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            id={formElement.id}
            value={formElement.config.value}
            label={formElement.config.label}
            type={formElement.config.elementType}
            config={formElement.config.elementConfig}
            valid={formElement.config.valid}
            touched={formElement.config.touched}
            errorMessage={formElement.config.errorMessage}
            changed={(e) => inputChangeHandler(e, formElement.id)}
            changedQuill={(e) => handleEditorChange(e, formElement.id)}
          />
        ))}
        {/* Bouton de submit */}
        <button
          className="border-4 bg-quartary rounded-lg py-2 px-3 text-black hover:bg-tertiaire hover:text-white   disabled:bg-primary"
          onClick={props.mode == 'edit' ? editPostHandler : addPostHandler}
          type="submit"
          disabled={!valid}
        >
          {' '}
          {isLoading ? (
            <SpinnerDotted
              size={15}
              thickness={100}
              speed={100}
              color="#ffffff"
            />
          ) : (
            'Envoyer'
          )}
        </button>
      </form>
    </>
  );

  return (
    <div className="container">
      <Head>
        <title>{props.mode == 'reply' ? 'Répondre' : 'Ecrire'}</title>
      </Head>

      <h1 className="text-center text-3xl font-semibold">
        {props.mode == 'reply' ? 'Répondre' : 'Ecrire'}
      </h1>

      <div className="flex flex-col justify-center ">{form}</div>
    </div>
  );
};

export default PostBody;
