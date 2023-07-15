import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/Navbar';

const Layout = (props) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Navbar />
      <section className="bg-secondary flex-1 p-3 ">{props.children}</section>
      <Footer />
    </div>
  );
};

export default Layout;
