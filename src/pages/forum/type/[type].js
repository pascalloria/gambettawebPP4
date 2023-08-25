import { connectToDatabase } from '@/helpers/mongoBD';
import Link from 'next/link';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

const Forum = (props) => {
  let posts = props.posts;

  let postShow;
  postShow = posts.map((post, i) => (
    <li
      key={i}
      className="border-2 text-xl bg-tertiaire text-white px-4 py-2 rounded-lg"
    >
      <Link href={'/forum/' + post.slug}>
        <div className="flex  justify-between">
          <span>{post.sujet}</span>
          {/* <span> Likebtn</span> */}
        </div>
      </Link>
    </li>
  ));

  return (
    <div className="container">
      <Head>
        <title>Forum de la résidence Gambetta</title>
      </Head>

      <div className="text-xl text-tertiaire mb-3">
        <Link className="hover:font-semibold" href="/forum">
          Forum
        </Link>
      </div>

      <div className="flex mx-auto justify-between flex-wrap items-center">
        <h1 className="text-3xl font-semibold mb-3">
          Catégorie : {props.type}
        </h1>
        {props.user && (
          <Link
            href={'/forum/ajouter/' + props.type}
            className="bg-quartary px-2 py-1 rounded-lg text-black hover:bg-tertiaire hover:text-white"
          >
            Nouveau Sujet
          </Link>
        )}
      </div>

      <ul className="mt-3"> {postShow}</ul>
    </div>
  );
};

export default Forum;

export async function getServerSideProps(context) {
  let posts;
  let { params } = context;
  let user = null;
  const session = await getSession({ req: context.req });
  if (session) {
    user = session.user;
  }

  try {
    // Connextion a MongoDB
    const client = await connectToDatabase();
    const db = client.db();
    console.log('test');
    // recuperer les 6 derniers articles
    posts = await db.collection('Forum').find({ type: params.type }).toArray();
    console.log('Post : ' + posts);
  } catch (error) {
    posts = [];
  }

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      type: params.type,
      user: user,
    },
  };
}
