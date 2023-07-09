import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [collapse, setCollapse]=useState(false)
  
  const handleCollapse = ()=> {
    setCollapse(!collapse)
    console.log(collapse)
  }

  let show = collapse ? " hidden" : ""

  return (
    <nav className="bg-quartary sticky top-0 p-3 z-40">
      <div className="container">
      <div className='flex justify-between items-start'>
         <ul className={'flex flex-col justify-start gap-2 text-secondary text-xl font-semibold	pb-1 sm:flex-row  md:text-2xl md:gap-3 lg:text-3xl' + show}>
          <li className=' hover:text-primary'>
            <Link href="/">Acceuil</Link>
          </li>
          <li className=' hover:text-primary'>
            <Link href="/gazette">La gazette</Link>
          </li>
          <li className=' hover:text-primary'>
            <Link href="/conseil">Le Conseil au travail</Link>
          </li>
          <li className=' hover:text-primary'>
            <Link href="/photo">Photos</Link>
          </li>
          <li className=' hover:text-primary'>
            <Link href="/contact">Contact</Link>
          </li>
          
        </ul>
        <button className="ml-auto rounded p-4 bg-tertiaire sm:hidden" onClick={handleCollapse}></button>

      </div>
       
      </div>

    </nav>
  );
};

export default Navbar;
