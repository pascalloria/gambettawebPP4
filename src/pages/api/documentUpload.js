import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

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
      if (err) return reject(err);
      // console.log(files.myDoc[0].filepath)
      var oldPath = files.myDoc[0].filepath;
      var newPath = `./public/Ressources/${fields.folder[0]}/${fields.newName[0]}.pdf`;
      mv(oldPath, newPath, function (err) {});
      res.status(200).json({ fields, files, newPath });
    });
  });
};
