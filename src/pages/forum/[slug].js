import { connectToDatabase } from '@/helpers/mongoBD';
import PostReply from '../../../components/PostReply/PostReply';
import Head from 'next/head';
import { Parser } from 'html-to-react';
import Link from 'next/link';

const slugPost = (props) => {
  const htmlParser = new Parser();
  let dateCreate = new Date(props.post.dateCreate).toLocaleDateString('fr');

  return (
    <div className="container">
      <Head>
        <title>Forum de la résidence Gambetta</title>
      </Head>
      <h1 className="text-3xl font-semibold">{props.post.sujet}</h1>

      <div className="text-lg mt-5 border-2 border-double rounded-lg bg-white border-primary p-4">
        <div className="flex  justify-between mb-3 text-base italic">
          <span>{props.post.author}</span>{' '}
          <div>
            <span>écrit le </span>
            {dateCreate}
          </div>
        </div>
        <div className="break-words">
          {htmlParser.parse(props.post.content)}
        </div>
        <div className='mt-2  text-end'>
        <button className="me-2 rounded-lg px-2 py-1 b-2  bg-quartary hover:bg-tertiaire hover:text-white  ">
            <Link href={'/forum/editer/' + props.post.slug}>Editer</Link>
          </button>
          <button className=" rounded-lg px-2 py-1 b-2  bg-quartary hover:bg-tertiaire hover:text-white  ">
            <Link href={'/forum/reply/' + props.post.slug}>Répondre</Link>
          </button>
        </div>

        {/* Si il y a des réponse les afficher */}
        {props.post.replys.length > 0 && (
          <div className="border-t-2 border-primary mt-2">
            <PostReply replys={props.post.replys} />
          </div>
        )}
      </div>
    </div>
  );
};

export default slugPost;

export async function getServerSideProps(context) {
  let posts;
  let { params } = context;

  try {
    // Connextion a MongoDB
    const client = await connectToDatabase();
    const db = client.db();

    // recuperer l'article a partir de son slug
    posts = await db.collection('Forum').find({ slug: params.slug }).toArray();
  } catch (error) {
    posts = [];

    console.log(error);
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(posts[0])),
    },
  };
}
