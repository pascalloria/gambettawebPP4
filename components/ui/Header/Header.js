import Image from 'next/image';

const Header = () => {
  return (
    <div className="bg-primary p-2">
      <div className="container">
        <div className="flex  flex-wrap justify-between items-center	">
          <div className="flex-auto text-center md:text-left ">
            <h1 className="font-bold	text-2xl md:text-5xl">
              {' '}
              La Résidence GAMBETTA{' '}
            </h1>{' '}
          </div>
          <div className="w-80 mt-2 mx-auto md:mt-0 ">
            <Image
              className="ml-auto"
              src="/header.jpg"
              alt="Residence Gambetta"
              width={417}
              height={213}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
