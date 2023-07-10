import Link from 'next/link';
import Image from 'next/image';
import { Parser } from 'html-to-react';

const ArticleCard = (props) => {
  let dateCreate = new Date(props.article.dateCreate).toLocaleDateString('fr');
  const htmlParser = new Parser()
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
          <div className="font-bold text-xl mb-2 border-b-2 border-quartary pb-2 ">{props.article.title}</div>
          

          <p className="text-gray-700 text-base mt-2">{htmlParser.parse(props.article.resume)}</p>
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center	">
          <div className="block text-sm font-semibold text-gray-700">
            {props.article.author}
          </div>
          <div className="block text-xs  text-gray-700 ms-5 italic ">
            Ecrit le {dateCreate}
          </div>
          <div className=" inline-block ml-auto bg-primary py-2 px-3 rounded-lg hover:bg-tertiaire hover:text-white  text-center text-xs md:text-base">
            <Link href={'/article/' + props.article.slug}>Lire l'article</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
