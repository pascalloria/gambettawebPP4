import Link from 'next/link';
import { useState, useEffect } from 'react';

import UserMenu from '../UserMenu/UserMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa0, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  // State
  const [collapse, setCollapse] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  // Permet de definir collapse a true si width > 640
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    if (640 < windowSize.width) {
      setCollapse(false);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);

  // Function

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  let show = collapse ? ' hidden' : '';

  return (
    <nav className="bg-quartary sticky top-0 p-3 z-40">
      <div className="container">
        <div className="flex justify-between items-start">
          <ul
            className={
              'flex flex-col justify-start gap-2 lg:d text-secondary text-xl font-semibold	pb-1 sm:flex-row  md:text-2xl md:gap-3 lg:text-3xl' +
              show
            }
          >
            <li className=" hover:text-primary">
              <Link href="/">Accueil</Link>
            </li>
            <li className=" hover:text-primary">
              <Link href="/gazette">La gazette</Link>
            </li>
            <li className=" hover:text-primary">
              <Link href="/conseil">Le Conseil</Link>
            </li>
            <li className=" hover:text-primary">
              <Link href="/photo">Photos</Link>
            </li>
            <li className=" hover:text-primary">
              <Link href="/contact">Contact</Link>
            </li>           
            <li className=" hover:text-primary">
              <Link href="/forum">Forum</Link>
            </li>
          
            
          </ul>

          {/* Menu Utilisateur  */}
          <div className={collapse ? "ms-0":"ms-10"+ ' lg:ms-0'}>
             <UserMenu user={props.user} />
          </div>
         

          <button
            className="ml-auto rounded  sm:hidden"
            onClick={handleCollapse}
          ><FontAwesomeIcon icon={faBars}/></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
