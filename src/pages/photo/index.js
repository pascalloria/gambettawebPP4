import { useState } from 'react';
import { buildDataSWR } from '@/helpers/folderFilesFetcher';
import { connectToDatabase } from '@/helpers/mongoBD';
import ImageUploadFrom from '../../../components/ImageUpload/ImageUploadForm';
import { split } from 'postcss/lib/list';
import { getSession } from 'next-auth/react';

const Photo = (props) => {
  // State

  const [cat, setCat] = useState('residence');
  const [catPhoto, setCatPhoto] = useState('residence');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectFile, setSelectFile] = useState();
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // function
  const afficherImg = (category) => {
    setCat(category);
  };

  const handleDocumentUpload = async (folder, newName, catPhoto) => {
    try {
      if (!selectFile) return;
      setIsLoading(true);
      const body = new FormData();
      body.append('myDoc', selectFile);
      body.append('folder', folder);
      body.append('newName', newName);
      const response = await fetch('/api/documentUpload', {
        method: 'POST',
        body,
      });

      // recuperer le resultat du fetch
      const res = await response.json();
      // recuperer le chemin vers la photo
      let path = split(res.newPath, '/').slice(2).join('/');

      // Creer un objet avec les infos sur la photos
      let newPhoto = {
        title: newName,
        path: path,
        cat: catPhoto,
      };

      // Ajouter l'objet au la base de donnée
      const responsePhoto = await fetch('/api/sendPhoto', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(newPhoto),
      });
    } catch (error) {}
    setIsLoading(false);
  };

  const nameHandler = (event) => {
    setNewName(event.target.value);
  };
  const catHandler = (event) => {
    setCatPhoto(event.target.value);
  };

  // const { data } = buildDataSWR('Photos/' + cat);

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
      
      {props.user && props.user.roles.includes('Modo') && (
      <div className="flex flex-col justify-center items-center ">
        <ImageUploadFrom
          selectedImage={selectedImage}
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectFile(file);
            }
          }}
        />
        <div className=" flex gap-x-10">
          <input
            className="rounded mx-auto p-2 w-3/5 "
            type="text"
            id="name"
            onChange={nameHandler}
            placeholder="ajouter une legende"
          />
          <select
            className="rounded mx-auto p-2 w-1/5 "
            type="text"
            id="cat"
            onChange={catHandler}
            placeholder="Cat"
          >
            <option value="">--Please choose an option--</option>
            <option value="noel">Noel</option>
            <option value="residence">Residence</option>
          </select>
        </div>

        <button
          className="bg-quartary px-3 py-2 rounded mt-3 "
          onClick={() =>
            handleDocumentUpload('Photos/' + catPhoto, newName, catPhoto)
          }
        >
          {isLoading ? "En cours d'envoie" : 'Envoyer'}
        </button>
      </div>)}



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

