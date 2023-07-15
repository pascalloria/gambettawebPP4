import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { folderParent, folder } = req.query;  
  // construction du chemin
  const dirRelativeToPublicFolder = folderParent + '/' + folder;
  // recuperation du chemin complet
  const dir = path.resolve('./public/', dirRelativeToPublicFolder);
  // Parcourir les fichier et recuperer les noms
  const filenames = fs.readdirSync(dir);

  let pathsNames = [];
  filenames.forEach((name) => {
    pathsNames.push({
      path: path.join('/', dirRelativeToPublicFolder, name),
      name: name,
    });
  });

  res.statusCode = 200;
  res.json(pathsNames);
}
