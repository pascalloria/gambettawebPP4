import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import UserMenu from '../UserMenu/UserMenu';

const Navbar = (props) => {
  // State
  const [collapse, setCollapse] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const router = useRouter();

  console.log(props.user);
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

  const onLogoutClicHandler = () => {
    signOut();
    router.push('/');
  };

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
              <Link href="/">Acceuil</Link>
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
              <Link href="/ajouter">Ajouter</Link>
            </li>
          </ul>


          {/* Menu Utilisateur  */}
          <UserMenu user={props.user} />



          <div className="hover:text-primary  text-secondary text-3xl font-semibold	pb-1">
            {props.user && <span>{props.user.name}</span>}
          </div>
          <div className="hover:text-primary  text-secondary text-3xl font-semibold	pb-1">
            {props.user ? (
              <button
                className=" hover:text-primary"
                onClick={onLogoutClicHandler}
              >
                Déconnection
              </button>
            ) : (
              <Link href="/connection">Connection</Link>
            )}
          </div>

          <button
            className="ml-auto rounded p-4 bg-tertiaire sm:hidden"
            onClick={handleCollapse}
          ></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
