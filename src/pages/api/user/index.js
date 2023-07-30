import { connectToDatabase } from '@/helpers/mongoBD';
import { hashPassword } from '@/helpers/auth';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const { pseudo, email, password1, password2 } = req.body;
    // verifier que tous les champs soit rempli
    if (!pseudo || !email || !password1 || !password2) {
      res.status(422).json({ message: 'Champ du formulaire manquant' });
      return;
    }

    // verifier que l'adresse email soit valide et n'existe pas deja
    // connection a la bdd
    let clientMongoDB;
    try {
      clientMongoDB = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connection impossible a la database' });
      return;
    }

    const user = await clientMongoDB
      .db()
      .collection('Utilisateurs')
      .findOne({ email: email });

    if (user) {
      res.status(421).json({ message: 'Cette adresse est deja utilisé' });
      return;
    }

    // verifier que les 2 mdp soit identique
    if (password1 !== password2) {
      res
        .status(475)
        .json({ message: 'Les 2 mots de passes ne correspondent pas' });
      return;
    }

    //Hasher le mdp

    let passwordEncoder = await hashPassword(password1);

    // stocker le nouvel utilistateur

    const newUser = {
      pseudo,
      email,
      passwordEncoder,
      dateCreate: new Date(),
      roles: ['utilisateur'],
    };

    let db = clientMongoDB.db();
    try {
      await db.collection('Utilisateurs').insertOne(newUser);
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({ message: 'Un probleme est survenue' });
      return;
    }
    clientMongoDB.close();
    res.status(201).json({
      message: 'Utilsateur  ajouté avec succés',
      user: newUser,
    });
  } else {
    res.status(505).json({
      message: 'Methode interdite',
    });
  }
}
