import Image from 'next/image';

const Header = () => {
  return (
    <div className=" bg-primary p-2">
      <div className="container">
        <div className="flex  flex-wrap justify-between items-center	">
        <div className="flex-auto w-64 ">

     
          <h1 className='font-bold	text-base md:text-3xl'>
            {' '}
            La Résidence GAMBETTA{' '}
          </h1>   </div>
          <div className="flex-auto w-32 relative">
            <Image src="/header.jpg" alt="Residence Gambetta" fill={true}></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
