import { useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import AddPhoto from '../../../components/Admin/AddPhoto/AddPhoto';
import { connectToDatabase } from '@/helpers/mongoBD';

const Photo = (props) => {
  // State

  const [cat, setCat] = useState('residence');

  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handlePhotoAdd = () => {
    refreshData();
    toast('Photo ajouté avec succés.');
  };

  // function
  const afficherImg = (category) => {
    setCat(category);
  };

  // afficher les photos
  let gridPhoto;
  if (props.photos) {
    gridPhoto = props.photos.map(
      (photo, i) =>
        photo.cat === cat && (
          <div key={i} className="flex items-center justify-center">
            <a href={'https://api.pascalloria.fr/' + photo.path}>
              <figure className="overflow-hidden ">
                <img
                  className="object-fill w-80 h-80"
                  src={'https://api.pascalloria.fr/' + photo.path}
                  alt={photo.title}
                />

                <figcaption>{photo.title}</figcaption>
              </figure>
            </a>
          </div>
        )
    );
  }

  return (
    <div className="container">
      <h2 className="text-3xl font-semibold text-center"> Photos </h2>

      {props.user && props.user.roles.includes('Modo') && (
        <AddPhoto onPhotoAdded={handlePhotoAdd} />
      )}

      <div className=" border-t-4 mt-4  pt-4 border-quartary">
        <button
          className={[
            'bg-primary py-2 px-4 rounded-md ml-3  hover:bg-tertiaire',
            cat == 'residence' ? 'bg-tertiaire' : '',
          ].join(' ')}
          id="residence"
          onClick={() => afficherImg('residence')}
        >
          {' '}
          Résidence{' '}
        </button>
        <button
          className={[
            'bg-primary py-2 px-4 rounded-md ml-3  hover:bg-tertiaire',
            cat == 'noel' ? 'bg-tertiaire' : '',
          ].join(' ')}
          id="noel"
          onClick={() => afficherImg('noel')}
        >
          {' '}
          Concours Noël
        </button>
      </div>
      <div
        id="gridPhoto"
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5"
      >
        {gridPhoto}
      </div>
    </div>
  );
};

export default Photo;

export async function getServerSideProps(context) {
  let photos;
  let user = null;
  const session = await getSession({ req: context.req });
  if (session) {
    user = session.user;
  }

  try {
    const clientDB = await connectToDatabase();
    // connexion a la base de donné
    const db = clientDB.db();
    // recuperer les projets
    photos = await db.collection('Photos').find().toArray();
    clientDB.close();
  } catch (error) {
    console.log(error);
    photos = [];
  }
  
  return {
    props: {
      photos: JSON.parse(JSON.stringify(photos)),
      user: user,
    },
  };
}
