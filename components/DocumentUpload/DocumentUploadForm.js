import { useState } from 'react';

const DocumentUploadForm = (props) => {
  //state
  const [isLoading, setIsLoading] = useState(false);
  const [selectFile, setSelectFile] = useState("");
  const [newName, setNewName] = useState("");


  // function

  const nameHandler = (event) => {
    setNewName(event.target.value);
  };

  const handleDocumentUpload = async () => {
    try {
      if (!selectFile) return;
      setIsLoading(true);
      const body = new FormData();
      body.append('myDoc', selectFile);
      body.append('folder', props.folder);
      body.append('newName', newName);
      const response = await fetch('/api/documentUpload', {
        method: 'POST',
        body,
      });

      console.log(response);
    } catch (error) {
      console.log(error.response?.data);
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col justify-center'>
      <h2 className="text-2xl p-2 mx-auto font-semibold text-center">
        {' '}
        Ajouter une Gazette
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
              setNewName(selectFile.name)
            }
        }
          }
        />
        <div className="w-full mx-auto rounded p-6 flex items-center justify-center border-4 cursor-pointer">
          {!selectFile ? "Selectioner un fichier" :  selectFile.name}
        </div>
      </label>
      <label className='mx-auto p-2' htmlFor="name">Nouveau nom </label>
      <input
        className="rounded ml-2 p-2"
        type="text"
        id="name"
        onChange={nameHandler}       
        placeholder='GA N-X MMM YY'
        
      />

      <button
        onClick={handleDocumentUpload}
        className=" mx-auto mt-3 py-2 rounded px-3 text-2xl text-white bg-quartary hover:text-black disabled:bg-primary"
        disabled={newName ? false : true}
      >
        {isLoading ? "En cours d'envoie" : 'Envoyer'}
      </button>
    </div>
  );
};

export default DocumentUploadForm;
