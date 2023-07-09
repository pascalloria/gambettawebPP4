import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-quartary sticky top-0 p-3 z-40">
      <div className="container">
        <ul className='flex  flex-wrap items-center justify-start gap-4 text-secondary text-3xl font-semibold	pb-1'>
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
      </div>
    </nav>
  );
};

export default Navbar;
