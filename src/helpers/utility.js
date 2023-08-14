// function qui permet de verifier dans les formulaires
// que les donnée saisie respecte bien les regles définie.

export const checkValidity = (value, rules) => {
    let isValid = true ;
    if (rules.required){
        isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.email){
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;            
        isValid = pattern.test(value) && isValid;
    }
    
    return isValid
} 

 // Fonction qui recupere la liste des fichier présent dans un dossier de l'API

export   const listFile = async (folderPath) => {
    let datas = [];
    let newDocs;
    const response = await fetch(
      'https://api.pascalloria.fr/list_files/?addPath=' + folderPath,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    if (data.files) {
      data.files.map((file) => {
        let infoFile = {
          path: 'https://api.pascalloria.fr/uploads/' + folderPath + '/' + file,
          name: file.split('-')[0],
        };
        datas.push(infoFile);
      });

      newDocs = datas.map((doc, i) => (
        <li className="text-start" key={i}>
          <a className="text-ellipsis overflow:hidden w-24" href={doc.path} download={doc.name} target="_blank">
            {doc.name}
          </a>
        </li>
      ));
      // afficher les documents les plus anciens en premier
      newDocs.reverse()
    }
    return {datas,newDocs};    
  };
