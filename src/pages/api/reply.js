import { connectToDatabase } from '@/helpers/mongoBD';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const { slug, content,  author } = req.body;

    // verifier que tous les champs soit rempli
    if (!slug || !content || !author) {
      res.status(422).json({ message: 'Champ du formulaire manquant' });
      return;
    }

   

    // stocker le nouveau projet
    const newReply= {      
      slug,
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
      await db.collection('Forum').updateOne({slug:slug},{$push:{replys:newReply}});
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({ message: 'Un probleme est survenue' });
      return;
    }

    clientMongoDB.close();
    res.status(201).json({
      message: 'projet ajouté avec succés',
      projet: newReply,
    });
  } else {
    res.status(505).json({
      message: 'Methode interdite',
    });
  }
}
