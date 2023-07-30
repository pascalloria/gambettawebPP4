import { connectToDatabase } from '@/helpers/mongoBD';
import { Parser } from 'html-to-react';

import Image from 'next/image';
import Link from 'next/link';

const Slug = (props) => {
  const { title, content, author, imgPath, dateCreate, slug, resume } =
    props.article;
  const htmlParser = new Parser();
  let dateCreateFormated = new Date(dateCreate).toLocaleDateString('fr');

  const handleDeleteArticle = async () => {
    const response = await fetch('/api/article?id=' + props.article._id, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
      props.onArticleDeleted();
    } else {
      console.log(data.message);
    }
  };

  const handleEditArticle = async ()=> {
    const response = await fetch("/api/article?id="+ props.article)
  }
  
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
        <div className="mt-5">{htmlParser.parse(content)}</div>
        <div className="flex items-center mt-4 pt-2 border-t-2 border-quartary">
          {' '}
          <span className="italic text-sm">
            Ecrit le {dateCreateFormated} par{' '}
          </span>{' '}
          <span className="ms-5 font-bold">{author}</span>
          <div className=' ml-auto'>
            <Link className='bg-quartary hover:text-secondary px-2 py-1 rounded hover:bg-primary'  href={"/editer/"+ slug }> Editer </Link>
            <button className='bg-quartary  hover:text-secondary px-2 py-1 rounded hover:bg-primary' onClick={handleDeleteArticle}> Supprimer</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Slug;

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
    articles = [];

    console.log(error);
  }

  return {
    props: {
      article: JSON.parse(JSON.stringify(articles[0])),
    },
  };
}
