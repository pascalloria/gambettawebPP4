import { connectToDatabase } from '@/helpers/mongoBD';
import PostReply from '../../../components/PostReply/PostReply';
import Head from 'next/head';
import { Parser } from 'html-to-react';
import Link from 'next/link';
import {
  faArrowLeft,
  faEdit,
  faReply,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

const SlugPost = (props) => {
  const htmlParser = new Parser();
  let dateCreate = new Date(props.post.dateCreate).toLocaleDateString('fr');
  const router = useRouter();

  const handleDeletePost = async () => {
    const response = await fetch('/api/post?id=' + props.post._id, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
      router.replace('/forum/type/' + props.post.type);
    } else {
      console.log(data.message);
    }
  };

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
        <div className="mt-2  text-end">
          <button
            className=" me-2 rounded-lg px-2 py-1 b-2  bg-quartary hover:bg-tertiaire hover:text-white"
            onClick={handleDeletePost}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            <span className="  ms-2 hidden lg:inline-block">Supprimer</span>
          </button>
          <button className="me-2 rounded-lg px-2 py-1 b-2  bg-quartary hover:bg-tertiaire hover:text-white  ">
            <Link href={'/forum/editer/' + props.post.slug}>
              <FontAwesomeIcon icon={faEdit} />
              <span className=" ms-2 hidden lg:inline-block">Editer</span>
            </Link>
          </button>
          <button className=" rounded-lg px-2 py-1 b-2  bg-quartary hover:bg-tertiaire hover:text-white  ">
            <Link href={'/forum/reply/' + props.post.slug}>
              <FontAwesomeIcon icon={faReply} />
              <span className=" ms-2 hidden lg:inline-block">Répondre</span>
            </Link>
          </button>
        </div>

        {/* Si il y a des réponse les afficher */}
        {props.post.replys.length > 0 && (
          <div className="border-t-2 border-primary mt-2">
            <PostReply slug={props.post.slug} replys={props.post.replys} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SlugPost;

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
