import { connectToDatabase } from '@/helpers/mongoBD';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const { title, slug, author, content, resume, imgPath } = req.body;
   console.log(req.body)
    // verifier que tous les champs soit rempli
    if (!title || !slug || !author || !content || !resume) {
      res.status(422).json({ message: 'Champ du formulaire manquant' });
      return;
    }

    // stocker le nouveau projet
    const newArticle = {
      title,
      slug,
      author,
      content,
      resume,
      dateCreate: new Date(),
      imgPath: imgPath ? imgPath : 'Header.jpg',
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
      await db.collection('Articles').insertOne(newArticle);
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({ message: 'Un probleme est survenue' });
      return;
    }

    clientMongoDB.close();
    res.status(201).json({
      message: 'projet ajouté avec succés',
      projet: newArticle,
    });
  } else if (req.method == 'DELETE') {
    let { id } = req.query;

    // Vérifier que l'identifiant est présent
    if (!id) {
      res
        .status(422)
        .json({ message: 'Champ "id" manquant dans la requête DELETE' });
      return;
    }

    id = new ObjectId(id);

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
      const result = await db.collection('Articles').deleteOne({ _id: id });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Article supprimé avec succès' });
      } else {
        throw new Error('Article non trouvé');
        res.status(404).json({ message: 'Article non trouvé' });
      }
    } catch (error) {
      clientMongoDB.close();
      console.log(error);
      res.status(500).json({
        message: " Une erreur est survenue lors de la suppression de l'article",
      });
      return;
    }

    clientMongoDB.close();
    res.status(200).json({
      message: 'Article supprimé avec succés',
    });
  } else {
    res.status(505).json({
      message: 'Methode interdite',
    });
  }
}
