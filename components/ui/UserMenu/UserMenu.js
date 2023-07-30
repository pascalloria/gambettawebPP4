import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const UserMenu = (props) => {
  // variable

  const [extand, setExtand] = useState(false);
  const router = useRouter();

  // function
  // Déconnection
  const onLogoutClicHandler = () => {
    signOut({redirect: false});
    router.push('/');
       
  };
  // Etendre le menu Utilisateur
  const clickUserMenuHandler = () => {
    setExtand(!extand);
  };
  return (
    <div className='relative'>
      <button
        className="text-secondary  text-3xl font-semibold pb-1 inline-flex items-center"
        onClick={clickUserMenuHandler}
      >
        {props.user ? props.user.name : 'Connection'}
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {extand && (
        <ul className=" rounded flex flex-col justify-center items-end gap-1 p-3  absolute right-0 bottom-15 text-secondary  text-2xl bg-tertiaire/75 ">
          {!props.user ? (
            <>
              <li className="hover:text-quartary  ">
                <Link href="/connection">Connection</Link>
              </li>
              
              <li className="hover:text-quartary  ">
                <Link href="/inscription">Inscription</Link>
              </li>              
            </>
          ) : (
            <>
            <li className="hover:text-quartary  ">
                <Link href="/profil">Profil</Link>
            </li>    
            <li className="hover:text-quartary  ">
              <button onClick={onLogoutClicHandler}>Déconnection</button>
            </li>
               
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
