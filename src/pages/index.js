import { connectToDatabase } from '@/helpers/mongoBD';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

import { getSession } from 'next-auth/react';

const Index = (props) => {
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };
 
  const handleArticleDeleted = () => {
    refreshData();
    toast("Article supprimé avec succés.")
  };

  let articles = props.articles.map((article) => (
    <ArticleCard
      key={article._id}
      article={article}
      onArticleDeleted={handleArticleDeleted}
      user = {props.user}
    />
  ));  

  return (
    <div className="container">
    
      <div className="grid grid-cols-12 lg:gap-10">
        {/* Bloc Gauche : Presentation + Articles */}
        <div id="actualite" className="col-span-12 mt-3 text-lg lg:col-span-8 ">
          {/* Presentation */}
          <p>
            {' '}
            Bienvenue sur ce site dédié à la <strong>
              Résidence GAMBETTA
            </strong>{' '}
            situé dans la ville de <strong>Yerres</strong>. Vous y retrouverez
            les actualités de la résidence, la gazette, des articles sur la vie
            de la résidence et aussi des informations sur le travail du Conseil
            Syndical{' '}
          </p>
          {/* Derniers Articles :  6 */}
          <h2 className="text-center font-bold text-3xl mt-5"> Actualités</h2>

          {articles && articles}
        </div>
        {/* Bloc Droite : Information sur la résidence */}
        <div className="col-span-12 my-3 lg:col-span-4 break-words   lg:min-w-fit	 ">
          <div className="sticky top-20 border-soldid border-2 text border-black shadow-xl  shadow-black	 rounded-lg p-3 flex justify-center lg:text-xl">
            <div>
              <h3 className="font-bold text-xl lg:text-2xl mb-1">
                Coordonnées importantes
              </h3>
              <ul className="list-disc list-inside ">
                <li>
                  {' '}
                  Loge :
                  <ul className="list-circle  list-inside ml-4">
                    <li>
                      <a
                        className="text-blue-500 underline"
                        href="tel:+0771089449"
                      >
                        07.71.08.94.49
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blue-500 underline"
                        href="mailto:logegambetta6@gmail.com?subject=Contact via le site"
                      >
                        logegambetta6@gmail.com
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  {' '}
                  Conseil Syndical :
                  <ul className="list-circle list-inside ml-2">
                    <li>
                      <a
                        className="text-blue-500 underline"
                        href="mailto:cs.gambetta.yerres@gmail.com?subject=Contact via le site"
                      >
                        cs.gambetta.yerres@gmail.com
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <h3 className="font-bold text-2xl mt-3 mb-1">Caractéristiques</h3>
              <ul className="list-disc list-inside ml-2">
                <li>Chauffage au sol</li>
                <li>Plus de 600 appartements</li>
                <li>Calme et bien entretenu</li>
                <li>Cave et place de parking</li>
                <li>Extérieur vert et jeux pour enfants</li>
                <li>Année de construction : 1964</li>
                <li>Batiments de 3 à 4 etages </li>
                <li>Pas d&apos;ascenceur</li>
                <li>Proche de la gare</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  let articles;
  let user = null;
  const session = await getSession({ req: context.req });
  if (session) {
    user = session.user;
  }

  try {
    // Connextion a MongoDB
    const clientDB = await connectToDatabase();
    const db = clientDB.db();

    // recuperer les 6 derniers articles
    articles = await db
      .collection('Articles')
      .find()
      .sort({ dateCreate: 'desc' })
      .limit(6)
      .toArray();   
    clientDB.close()      
  } catch (error) {
    articles = [];
  }
  
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      user: user,
    },
  };
}
