import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SpinnerDotted } from 'spinners-react';
import { split } from 'postcss/lib/list';

import Input from '../Input';
import { checkValidity } from '@/helpers/utility';
import ImageUploadForm from '../ImageUpload/ImageUploadForm';
import ErrorMessage from '../ui/Error/Error';

const ArticleBody = (props) => {
  // state
  const [valid, setValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState('');
  const [selectFile, setSelectFile] = useState();
  const [imgPath, setImgPath] = useState('');

  const article = props.article;

  useEffect(() => {
    if (article) {
      setSelectedImage('/' + article.imgPath);
      setImgPath(article.imgPath);
    }
  }, []);

  // Définition des eléments du formulaire ainsi que leurs parametres
  const [inputs, setInputs] = useState({
    title: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Titre',
      },
      value: article ? article.title : '',
      label: 'Titre',
      valid: article ? true : false,
      validation: {
        required: true,
        minLength: 6,
      },
      errorMessage: 'Le titre doit comporté au minimum 6 caractéres',
      touched: false,
    },    
    Author: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Auteur',
      },
      value: article ? article.author : '',
      label: 'Auteur',
      valid: article ? true : false,
      validation: { required: true, minLength: 3 },
      errorMessage: "L'auteur Client doit comporté au minimum 3 caractéres",
      touched: false,
    },
    Content: {
      elementType: 'textarea',
      elementConfig: {
        type: 'text',
        placeholder: 'Ecrivez votre message...',
        rows: 5,
        cols: 60,
      },
      value: article ? article.content : '',
      label: 'Contenu',
      valid: article ? true : false,
      validation: {
        required: true,
        minLength: 120,
      },
      errorMessage: 'Le message doit  dépasser 120 caractères ',
      touched: false,
    },
    Resume: {
      elementType: 'textarea',
      elementConfig: {
        type: 'text',
        placeholder: 'Résumé',
        rows: 3,
      },
      value: article ? article.resume : '',
      label: 'Résumé',
      valid: article ? true : false,
      validation: {
        required: true,
        maxLength: 350,
      },
      errorMessage: 'Le message de doit pas avoir plus de 350 caractères ',
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
  // empeche la redirection lors de l'envoie du formulaire
  const formHandler = (e) => {
    e.preventDefault();
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

  //Fonction  Upload image et Envoie de l'article a la BDD
  const imageUploadAndSubmitHandler = async () => {
    if (!isLoading) {
      // image uploads
      let path;

      if (selectFile) {
        try {
          const body = new FormData();
          body.append('myDoc', selectFile);
          body.append('folder', 'uploads/');
          const response = await fetch('/api/documentUpload', {
            method: 'POST',
            body,
          });
          // recuperer le resultat du fetch
          const res = await response.json();
          // recuperer le chemin vers la photo
          path = split(res.newPath, '/').slice(2).join('/');
          setImgPath(path);
        } catch (error) {
          console.log(error.response?.data);
        }
      } else {
        path = 'Header.jpg';
      }

      // on verifie que l'upload c'est bien passé
      if (path) {
        // creation de l'article sur la BDD

        let newArticle = {
          title: inputs.title.value,      
          author: inputs.Author.value,
          content: inputs.Content.value,
          resume: inputs.Resume.value,
          imgPath: path,
        };
        setIsLoading(true);
        setError(null);
        // envoyer le nouveau projet sur l'API next
        // creer un dossier "api" invisible pour l'utilisateur
        const response = await fetch('/api/article', {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(newArticle),
        });

        const data = await response.json();
        if (!response.ok) {
          setIsLoading(false);
          setError(data.message || 'Une erreur est survenue');
        } else {
          setIsLoading(false);
          router.replace('/article/' + data.projet.slug);
        }
      }
    }
  };
    //Fonction  Upload image et edition de l'article dans la BDD
  const imageUploadAndEditSubmitHandler = async () => {
    if (!isLoading) {
      // image uploads
      let path;

      if (selectFile) {
        try {
          const body = new FormData();
          body.append('myDoc', selectFile);
          body.append('folder', 'uploads/');
          const response = await fetch('/api/documentUpload', {
            method: 'POST',
            body,
          });
          // recuperer le resultat du fetch
          const res = await response.json();
          // recuperer le chemin vers la photo
          path = split(res.newPath, '/').slice(2).join('/');
          setImgPath(path);
        } catch (error) {
          console.log(error.response?.data);
        }
      } else {
        path = 'Header.jpg';
      }

      // on verifie que l'upload c'est bien passé
      if (path) {
        // creation de l'article sur la BDD

        let newArticle = {
          title: inputs.title.value,
          slug: article.slug,
          author: inputs.Author.value,
          content: inputs.Content.value,
          resume: inputs.Resume.value,
          imgPath: path,
        };
        setIsLoading(true);
        setError(null);
        // envoyer le nouveau projet sur l'API next
        // creer un dossier "api" invisible pour l'utilisateur
        const response = await fetch('/api/article?id=' + props.article._id, {
          method: 'PUT',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(newArticle),
        });

        const data = await response.json();
        if (!response.ok) {
          setIsLoading(false);
          setError(data.message || 'Une erreur est survenue');
        } else {
          setIsLoading(false);
          router.replace('/article/' + data.projet.slug);
        }
      }
    }
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
          onClick={
            props.mode == 'Editer'
              ? imageUploadAndEditSubmitHandler
              : imageUploadAndSubmitHandler
          }
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
        <title>{props.mode} un Article</title>
      </Head>

      <h1 className="text-center text-3xl font-semibold">
        {props.mode} un Article
      </h1>
      <div className="mx-auto">
        <ImageUploadForm
          selectedImage={selectedImage}
          onChange={({ target }) => {
            if (target.files) {
              // determinier le type du fichier
              let type = split(target.files[0].type, '/')[0];
              // verifier si le fichier selection est une image
              if (type === 'image') {
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setSelectFile(file);
              } else {
                console.log("Ceci n'est pas une image");
                setSelectedImage('');
                setSelectFile();
              }
            }
          }}
        />
      </div>

      <div className="flex flex-col justify-center ">{form}</div>
    </div>
  );
};

export default ArticleBody;
