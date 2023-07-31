import Link from 'next/link';
import Image from 'next/image';
import { Parser } from 'html-to-react';

const ArticleCard = (props) => {
  const dateCreate = new Date(props.article.dateCreate).toLocaleDateString(
    'fr'
  );
  const htmlParser = new Parser();

  // function
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
  return (
    <>
      <div className="max-w-2xl  rounded-lg  shadow-lg mx-auto mt-4 bg-white overflow-hidden">
        <div className="max-h-98 ">
          <Image
            className="w-full max-h-[36rem]  "
            src={'/' + props.article.imgPath}
            alt="Residence au soleil"
            width={800}
            height={600}
          />
        </div>

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 border-b-2 border-quartary pb-2 ">
            {props.article.title}
          </div>

          <div className="text-gray-700 text-base mt-2">
            {htmlParser.parse(props.article.resume)}
          </div>
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center	">
          <div className="block text-sm font-semibold text-gray-700">
            {props.article.author}
          </div>
          <div className="block text-xs  text-gray-700 ms-5 italic ">
            Ecrit le {dateCreate}
          </div>
          {props.user && props.user.roles.includes('Modo') && (
            <button
              className=" inline-block ml-auto bg-primary py-2 px-3 rounded-lg hover:bg-tertiaire hover:text-white  text-center text-xs md:text-base"
              onClick={handleDeleteArticle}
            >
              Supprimer
            </button>
          )}

          <div className=" inline-block ml-auto bg-primary py-2 px-3 rounded-lg hover:bg-tertiaire hover:text-white  text-center text-xs md:text-base">
            <Link href={'/article/' + props.article.slug}>Lire l'article</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
