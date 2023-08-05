import { connectToDatabase } from '@/helpers/mongoBD';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const { slug, content, author } = req.body;

    // verifier que tous les champs soit rempli
    if (!slug || !content || !author) {
      res.status(422).json({ message: 'Champ du formulaire manquant' });
      return;
    }
    // stocker le nouveau projet
    const newReply = {
      author,
      content,
      dateCreate: new Date(),
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
      await db
        .collection('Forum')
        .updateOne({ slug: slug }, { $push: { replys: newReply } });
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({ message: 'Un probleme est survenue' });
      return;
    }

    clientMongoDB.close();
    res.status(201).json({
      message: 'projet ajouté avec succés',
      projet: {...newReply, slug}      
    });
  }
  if (req.method == 'PUT') {
    const { slug, i } = req.body;

    // verifier que l'on recupere correctement les parametres
    if (!slug) {
      console.log("i:" + i, "slug:"+ slug);
      res.status(422).json({ message: 'Slug manquant' });
      return;
    }
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
      // Mettre la valeur du tableau Replys a "null" pour l'index souhaité
      await db
        .collection('Forum')
        .updateOne({ slug: slug }, { $unset: { [`replys.${i}`]: 1 } });
      // Supprimer tous les valleur Null du tableau Replys
      await db
        .collection('Forum')
        .updateOne({ slug: slug }, { $pull: { replys: null } });
    } catch (error) {
      clientMongoDB.close();
      console.log(error);
      res.status(500).json({ message: 'Un probleme est survenue' });
      return;
    }

    clientMongoDB.close();
    res.status(201).json({
      message: 'Commentaire supprimé avec succés',
    });
  } else {
    res.status(505).json({
      message: 'Methode interdite',
    });
  }
}
