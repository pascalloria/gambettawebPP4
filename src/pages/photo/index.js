import { useState } from 'react';

import { connectToDatabase } from '@/helpers/mongoBD';
import ImageUploadFrom from '../../../components/ImageUpload/ImageUploadForm';

import { getSession } from 'next-auth/react';
import AddPhoto from '../../../components/Admin/AddPhoto/AddPhoto';

const Photo = (props) => {
  // State

  const [cat, setCat] = useState('residence');

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
          <div key={i}>
            <a href={photo.path}>
              <figure className="overflow-hidden max-h-80">
                <img src={photo.path} alt={photo.title} />
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

      {props.user && props.user.roles.includes('Modo') && <AddPhoto />}

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
