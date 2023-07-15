import { connectToDatabase } from '@/helpers/mongoBD';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const { title, slug, author, content, resume, imgPath } = req.body;
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
  } else {
    res.status(505).json({
      message: 'Methode interdite',
    });
  }
}
