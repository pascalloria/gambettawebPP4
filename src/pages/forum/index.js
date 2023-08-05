import Link from 'next/link';
import Head from 'next/head';

const Forum = (props) => {
  return (
    <>
      <Head>
        <title>Forum de la résidence Gambetta</title>
      </Head>
      <div className="container">
        <h1 className="text-3xl text-center font-semibold">Forum</h1>

        <ul className="mt-10 flex-col justify-between items-center gap-y-8 flex text-black w-2/3 mx-auto  text-center">
          <li className="bg-quartary hover:bg-tertiaire hover:text-white rounded-lg text-4xl w-full">
            <Link
              className="p-4 w-full inline-block"
              href={'/forum/type/travaux'}
            >
              Travaux
            </Link>
          </li>
          <li className="bg-quartary hover:bg-tertiaire hover:text-white  rounded-lg text-4xl w-full">
            <Link
              className="p-4 w-full inline-block"
              href={'/forum/type/loisir'}
            >
              Loisir
            </Link>
          </li>
          <li className="bg-quartary hover:bg-tertiaire hover:text-white  rounded-lg text-4xl w-full">
            <Link
              className="p-4 w-full inline-block"
              href={'/forum/type/autres'}
            >
              Autres
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Forum;
