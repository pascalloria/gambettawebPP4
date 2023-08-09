import { connectToDatabase } from '@/helpers/mongoBD';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Parser } from 'html-to-react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';

const Slug = (props) => {
  const { title, content, author, imgPath, dateCreate, slug, resume } =
    props.article;
  const htmlParser = new Parser();
  let dateCreateFormated = new Date(dateCreate).toLocaleDateString('fr');

  const router = useRouter();

  const handleDeleteArticle = async () => {
    const response = await fetch('/api/article?id=' + props.article._id, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
      router.replace('/');
    } else {
      console.log(data.message);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col justify-center  ">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <Image
          className="mt-5 mx-auto"
          src={'/' + imgPath}
          alt="alt"
          width={800}
          height={600}
        />
        <div className="mt-5 break-words">{htmlParser.parse(content)}</div>
        <div className="flex items-center mt-4 pt-2 border-t-2 border-quartary">
          {' '}
          <span className="italic text-sm">
            <span className="hidden lg:inline-block">Ecrit le </span>{' '}
            {dateCreateFormated}{' '}
            <span className="hidden lg:inline-block">par</span>{' '}
          </span>{' '}
          <span className="ms-5 font-bold">{author}</span>
          {props.user && props.user.roles.includes('Modo') && (
            <div className=" ml-auto">
              <div className=" inline-block ml-auto me-3 bg-quartary px-2 py-1 rounded-lg hover:bg-tertiaire hover:text-white  text-center text-xs md:text-base">
                <Link href={'/editer/' + slug}>
                  <FontAwesomeIcon icon={faEdit} />
                  <span className=" ms-2 hidden lg:inline-block">Editer</span>
                </Link>
              </div>
              <button
                className="inline-block ml-auto bg-quartary px-2 py-1 rounded-lg hover:bg-tertiaire hover:text-white  text-center text-xs md:text-base"
                onClick={handleDeleteArticle}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                <span className=" ms-2 hidden lg:inline-block">
                  {' '}
                  Supprimer
                </span>{' '}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slug;

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
    const client = await connectToDatabase();
    const db = client.db();

    // recuperer l'article a partir de son slug
    articles = await db
      .collection('Articles')
      .find({ slug: params.slug })
      .toArray();
  } catch (error) {
    articles = [];

    console.log(error);
  }

  return {
    props: {
      article: JSON.parse(JSON.stringify(articles[0])),
      user: user,
    },
  };
}
