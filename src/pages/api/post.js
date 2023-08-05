import { connectToDatabase } from '@/helpers/mongoBD';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const { sujet, content, type, author } = req.body;

    // verifier que tous les champs soit rempli
    if (!sujet || !content || !type || !author) {
      res.status(422).json({ message: 'Champ du formulaire manquant' });
      return;
    }

    // Générer le slug
    let slug = sujet[0] + sujet[2] + sujet[4] + Math.floor(Math.random() * 100);

    // stocker le nouveau projet
    const newPost = {
      sujet,
      slug: slug,
      author,
      content,
      type,
      dateCreate: new Date(),
      replys: [],
    };

    // connextion a mongoDB
    let clientMongoDB;
    try {
      clientMongoDB = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connection impossible a la database' });
      return;
    }
    const db = clientMongoDB.db();
    try {
      await db.collection('Forum').insertOne(newPost);
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({ message: 'Un probleme est survenue' });
      return;
    }

    clientMongoDB.close();
    res.status(201).json({
      message: 'projet ajouté avec succés',
      projet: newPost,
    });
  } else if (req.method == 'PUT') {
    const { sujet, content, type, author, slug , replys } = req.body;
    console.log(req.body)
    // verifier que tous les champs soit rempli
    if (!sujet || !content || !type || !author || !slug || !replys) {
      res.status(422).json({ message: 'Champ du formulaire manquant' });
      return;
    }
    // Recuperer l'id de l'article dans la requete
    let { id } = req.query;

    // Vérifier que l'identifiant est présent
    if (!id) {
      res
        .status(422)
        .json({ message: 'Champ "id" manquant dans la requête PUT' });
      return;
    }

    id = new ObjectId(id);


   
    // stocker le nouveau projet
    const newPost = {
      sujet,
      slug,
      author,
      content,
      type,
      dateCreate: new Date(),
      replys,
    };

    // connextion a mongoDB
    let clientMongoDB;
    try {
      clientMongoDB = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connection impossible a la database' });
      return;
    }
    const db = clientMongoDB.db();
    try {
      await db.collection('Forum').findOneAndReplace({ _id: id },{...newPost});
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({ message: 'Un probleme est survenue' });
      return;
    }

    clientMongoDB.close();
    res.status(201).json({
      message: 'projet ajouté avec succés',
      projet: newPost,
    });
  } else {
    res.status(505).json({
      message: 'Methode interdite',
    });
  }
}
