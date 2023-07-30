import ArticleBody from '../../../components/ArticleBody/ArticleBody';
import { connectToDatabase } from '@/helpers/mongoBD';

const Editer = (props) => {
  return <ArticleBody mode="Editer" article={props.article} />;
};

export default Editer;

export async function getServerSideProps(context) {
  let articles;
  let { params } = context;

  try {
    // Connextion a MongoDB
    const client = await connectToDatabase();
    const db = client.db();

    // recuperer l'article a partir de son slug
    articles = await db
      .collection('Articles')
      .find({ slug: params.slug })
      .toArray();
  } catch (error) {
    console.log(error.message);
    articles = [];
  }

  return {
    props: {
      article: JSON.parse(JSON.stringify(articles[0])),
    },
  };
}
