import { useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Layout;
