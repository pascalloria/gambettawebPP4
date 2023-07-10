import fs from 'fs';
import path from 'path';

export default (req, res) => {
  // chemin a partir du fichier Public
  const dirRelativeToPublicFolder = 'Ressources/Gazette';
  // recuperation du chemin complet
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  // Parcourir les fichier et recuperer les noms
  const filenames = fs.readdirSync(dir);
  // Construire un tableau avec l'url des fichiers
  const docs = filenames.map((name) =>
    path.join('/', dirRelativeToPublicFolder, name)
  );

  let pathsNames = [];
  docs.map((doc, i) => {
    pathsNames.push([doc, filenames[i]]);
  });
 

  res.statusCode = 200;
  res.json(pathsNames);
};
