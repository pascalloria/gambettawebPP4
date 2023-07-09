// librairy
import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  // Connexion à MongoDB
  let clientDB = await MongoClient.connect(
    'mongodb+srv://Mistrall:Mistrall@cluster0.9zwivvi.mongodb.net/GambettaWeb?retryWrites=true&w=majority'
  );
  return clientDB;
}
