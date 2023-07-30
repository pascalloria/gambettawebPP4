//libraire
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import { connectToDatabase } from '@/helpers/mongoBD';
import { verfyPassword } from '@/helpers/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // connexion a mongoBD
        const client = await connectToDatabase();
        const db = client.db();

        // 1ere etape l'utilasteur existe til

        const user = await client
          .db()
          .collection('Utilisateurs')
          .findOne({ email: email });

        if (!user) {
          client.close();
          throw new Error('impossible de vous identifier');
        }

        // 2 eme etape : le mot depasse est il correct ?
        const isValid = await verfyPassword(password, user.passwordEncoder);

        if (!isValid == true) {
          client.close();
          throw new Error('impossible de vous identifier');
        }

        // succes
        client.close();
        return {
          email: user.email,
          name: user.pseudo,
          id: user._id,
          roles: user.roles,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      session.user = token.user;
      return session;
    },
  },
});
