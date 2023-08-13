import { useState } from 'react';
import { toast } from 'react-toastify';

const DocumentUploadForm = (props) => {
  //state
  const [isLoading, setIsLoading] = useState(false);
  const [selectFile, setSelectFile] = useState('');
  const [newName, setNewName] = useState('');

  // function

  // Stocker le nom du document
  const nameHandler = (event) => {
    setNewName(event.target.value);
  };

  // Uploader le document 
  const handleDocumentUpload = async () => {
    try {
      if (!selectFile) return;
      setIsLoading(true);
      // Transmettre des informations a l'api
      const body = new FormData();
      // tres important la cle file doit etre la meme sur single ou array de mutter
     
      body.append('folder', props.folder);
      body.append('name', newName); 
      body.append('file', selectFile);    
      const response = await fetch('http://localhost:5000/upload_files', {
        method: 'POST',
        body,
      });
      if (response.ok) {
        // envoyé une notification de succés
        toast('Document envoyé avec succés.');
        console.log(response.message)
        // Vider l'input
        document.querySelector('#name').value = '';
      } else {
        toast('Un probléme est survenue : ' + error.message);
      }
    } catch (error) {}
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center ">
      <h2 className="text-2xl p-2 mx-auto font-semibold text-center">
        {' '}
        Ajouter {props.type}
      </h2>     
      <label>
        {' '}
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectFile(file);
              setNewName(selectFile.name);
            }
          }}
        />
        <div className="w-full	break-all		 mx-auto rounded p-6 flex items-center justify-center border-4 cursor-pointer">
          {!selectFile ? 'Sélectionner un fichier' : selectFile.name}
        </div>
      </label>
      <label className="mx-auto p-2" htmlFor="name">
        Nouveau nom{' '}
      </label>
      <input
        className="rounded ml-2 p-2"
        type="text"
        id="name"
        onChange={nameHandler}
        placeholder={props.placeholder}
      />
      <button
        onClick={handleDocumentUpload}
        className=" mx-auto mt-3 py-2 rounded-lg  px-3 text-2xl text-black bg-quartary hover:text-white hover:bg-tertiaire disabled:bg-primary"
        disabled={newName ? false : true}
      >
        {isLoading ? "En cours d'envoie" : 'Envoyer'}
      </button>
    </div>
  );
};

export default DocumentUploadForm;
