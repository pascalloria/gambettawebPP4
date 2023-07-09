const Contact = () => {
  return (
    <div className="container text-center">
      <article className="mt-3">
        <h2 className="text-3xl font-medium">Nous contacter</h2>
        <p className="mt-3 text-xl">
          Pour toutes informations merci de nous contacter par mail à l'adresse
          suivante : <br />
          <a
            className="underline text-blue-700"
            href="mailto:cs.gambetta.yerres@gmail.com?subject=Contact via le site"
          >
            cs.gambetta.yerres@gmail.com
          </a>
          <br />
          
            {' '}
            Pour tout soucis avec le site, merci de contacter : 
            <a
              className="underline text-blue-700 ml-1"
              href="mailto:postmaster@gambettaweb.fr?subject=Contact via le site"
            >
               postmaster@gambettaweb.fr
            </a>
         
        </p>

        <h3 className="text-3xl font-medium mt-5">
          {' '}
          Une idee ? Une remarque ? Une suggestion ?{' '}
        </h3>
        <p className="mt-3 text-xl">
          Tous les retours sont les bienvenus, ce site est pour vous résidents
          de Gambetta. <br />
          Aidez nous à en faire l'outil de communication dont vous avez besoin !{' '}
          <br />
          Photos de la résidence, Idées d'evenements, Histoire et évolution de
          la résidence! <br />
        </p>
        <p className="text-2xl font-bold mt-4">Partagez vos anecdotes !</p>
        <p className="text-xl mt-3">
          {' '}
          Merci d'ecrire à{' '}
          <a
            className="underline text-blue-700"
            href="mailto:postmaster@gambettaweb.fr?subject=Retour sur le site"
          >
            communication@gambettaweb.fr
          </a>
        </p>
      </article>

      {/*  Inserer un formulaire de contact ICI */}
    </div>
  );
};

export default Contact;
