import Link from "next/link";
import Head from "next/head";



const Error404 = () => {
    return ( 
        <div style={{textAlign:"center"}}>  
            <Head>
                 <title> Erreur 404 Page non trouvé</title>
            </Head>

            <h1 style={{fontSize:"5rem",marginTop:"150px"}}>OUPS !! aucune page trouvé ! </h1>
            <Link style={{fontSize:"2rem"}} href={"/"}>Retourner a l'acceuil</Link>
        </div>       
      );
}
 
export default Error404;