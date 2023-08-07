import { useState } from 'react';
import Head from 'next/head';
import { SpinnerDotted } from 'spinners-react';
import {signIn,getSession} from "next-auth/react"

import Input from '../../../components/Input';
import { checkValidity } from '@/helpers/utility';
import { useRouter } from 'next/router';
import ErrorMessage from '../../../components/ui/Error/Error';

const Connection = () => {
  const [valid, setValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  // Définition des eléments du formulaire ainsi que leurs parametres
  const [inputs, setInputs] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Votre email',
      },
      value: '',
      label: 'Email',
      valid: false,
      validation: {
        required: true,
        email: true,
      },
      errorMessage: 'Merci d"entrer un email valid',
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Mot de passe',
      },
      value: '',
      label: 'Mot de passe',
      valid: false,
      validation: { required: true, minLength: 6 },
      errorMessage: 'Le mot de passe doit comporté au minimum 6 caractéres',
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

  const submitHandler = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setError(null);
      
      const resultat = await signIn('credentials', {
        email: inputs.email.value,
        password: inputs.password.value,
        redirect: false,
      });

      setIsLoading(false);

      if (!resultat.error) {
        router.replace('/');
      } else {
        setError(resultat.error);
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
      <form className="mt-5 p-5 mx-auto" onSubmit={(e) => formHandler(e)}>
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
          />
        ))}
        {/* Bouton de submit */}
        <button
          className="border-4 bg-quartary rounded-xl py-2 px-3 text-white hover:bg-secondary hover:text-black hover:border-black  disabled:bg-primary"
          onClick={submitHandler}
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
            'Connexion'
          )}
        </button>
      </form>
    </>
  );

  return (
    <div className="container">
      <Head>
        <title>Connexion</title>
      </Head>
      <div className="text-3xl font-bold text-center mt-6">Connection</div>
      <div className="flex flex-col justify-center ">{form}</div>
    </div>
  );
};

export default Connection;
