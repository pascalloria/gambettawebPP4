import ArticleBody from '../../../components/ArticleBody/ArticleBody';
import { connectToDatabase } from '@/helpers/mongoBD';
import { getSession } from 'next-auth/react';

const Editer = (props) => {
  return (
    <ArticleBody mode="Editer" article={props.article} user={props.user} />
  );
};

export default Editer;

export async function getServerSideProps(context) {
  let articles;
  let { params } = context;
  let user = null;
  const session = await getSession({ req: context.req });
  if (session) {
    user = session.user;
  }

  try {
    // Connextion a MongoDB
    const clientDB = await connectToDatabase();
    const db = clientDB.db();

    // recuperer l'article a partir de son slug
    articles = await db
      .collection('Articles')
      .find({ slug: params.slug })
      .toArray();
    clientDB.close();
  } catch (error) {
    console.log(error.message);
    articles = [];
  }

  return {
    props: {
      article: JSON.parse(JSON.stringify(articles[0])),
      user: user,
    },
  };
}
