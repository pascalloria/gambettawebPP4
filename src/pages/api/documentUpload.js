import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { split } from 'postcss/lib/list';

// import mv
var mv = require('mv');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {    
      // Recuperons l'extension du fichier
      let ext = split(files.myDoc[0].mimetype, '/')[1];

      // Verifions que le type du fichier est authorisé
      let authorizedExt = ['png', 'jpg', 'jpeg', 'pdf', 'webp'];
      if (!authorizedExt.includes(ext)) {
        return res.status(600).send('Mauvaise extensions');
      }
      // Verifions l'absence d'erreur
      if (err) return reject(err);

      // Deplacons le fichier
      const oldPath = files.myDoc[0].filepath;
      const newPath = `./public/${fields.folder[0]}/${fields.newName ?fields.newName[0]:files.myDoc[0].originalFilename}.${ext}`;
      mv(oldPath, newPath, function (err) {});

      // Renvoyons le code de succes et les données
      res.status(200).json({ fields, files, newPath });      
    });
  });
};
