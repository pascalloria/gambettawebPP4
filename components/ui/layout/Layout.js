import { useSession } from 'next-auth/react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/Navbar';

const Layout = (props) => {
  // variable

  const { data: session, status } = useSession();
  const loading = status === 'loading';
  let user = null;

  if (session) {
    user = session.user;
    //console.log(user);
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Navbar user={user} />
      <section className="bg-secondary flex-1 p-3 ">{props.children}</section>
      <Footer />
    </div>
  );
};

export default Layout;
