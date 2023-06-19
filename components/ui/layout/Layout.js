import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const Layout = (props) => {
    return (  
        <div style={{display:"flex",height:"100vh",flexDirection:"column"}}>
            <Header />
            <div style={{flexGrow:1}}>
                <div className="container">{props.children}</div>
            </div>
            <Footer />
        </div>
    );
}
 
export default Layout;