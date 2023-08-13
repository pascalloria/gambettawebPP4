import { useState } from 'react';
import ImageUploadFrom from '../../../components/ImageUpload/ImageUploadForm';
import { split } from 'postcss/lib/list';

const AddPhoto = (props) => {
  const [catPhoto, setCatPhoto] = useState('residence');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectFile, setSelectFile] = useState();
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //function

  const handleDocumentUpload = async (folder, newName, catPhoto) => {
    try {
      if (!selectFile) return;
      setIsLoading(true);
      const body = new FormData();
      body.append('folder', folder);
      body.append('name', newName);
      body.append('file', selectFile);
      const response = await fetch('https://api.pascalloria.fr/upload_files', {
        method: 'POST',
        body,
      });

      // recuperer le resultat du fetch
      const res = await response.json();
      console.log(res.path);
      // recuperer le chemin vers la photo
      let path = res.path;

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

  return (
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
        className="bg-quartary px-3 py-2 text-2xl rounded-lg mt-3 hover:bg-tertiaire hover:text-white "
        onClick={() =>
          handleDocumentUpload('Photos/' + catPhoto, newName, catPhoto)
        }
      >
        {isLoading ? "En cours d'envoie" : 'Envoyer'}
      </button>
    </div>
  );
};

export default AddPhoto;
