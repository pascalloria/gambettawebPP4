const Gazette = () => {
    return ( 
        <div class="container">
        <div className="grid grid-cols-12 lg:gap-10">
        {/* Presentation de la Gazette */}
            <div class="col-span-12 mt-3 text-lg lg:col-span-9">
                <article class="mt-3">
                    <h2 class=" text-3xl font-semibold mt-3 mb-2"> Présentation</h2>
                    <p>
                        La gazette GAMBETT'Actu est une publication bimestruel (tous les 2 mois)
                        réalisée par la commission COMMUNICATION du CS pour vous tenir
                        au courant des actualités de la résidence.
                        <br /><br />
                        Elle comportera toujours au moins un <strong>compte rendu</strong> des réunions du  <strong>Conseil
                        Sydincal.</strong>                                     
                    </p>
                </article >
               {/* Dernier Numéro */}
                <article className="">
                    <h3 className="border-t-2 pt-4 border-quartary text-2xl font-semibold mt-5 mb-3">Le Nouveau numéro du <i>GAMBETT'Actu</i>  !!! </h3>    
                                 
                    <object id="gazettePdf" data="/Ressources/Gazette/GA N-3 MAI 23.pdf#toolbar=0" type="application/pdf" width="100%"  height="600">
                        <embed src="/Ressources/Gazette/GA N-3 MAI 23.pdf#toolbar=0" type="application/pdf" />
                    </object>
                     <p>Pour télécharger la gazette <a className="underline text-blue-700" href="/Ressources/Gazette/GA N-3 MAI 23.pdf"
                        download="GAMBETT'Actu__Mai_2023">Cliquer ici </a></p>
                </article>
            </div>
            {/* Encard ancien numéro */}
            <div id="gazette" className="col-span-12 my-3 lg:col-span-3 min-w-fit	 ">
                <div className="sticky top-20 border-soldid border-2 border-black shadow-xl  shadow-black	 rounded-lg p-3 flex flex-col justify-center text-xl">
                    <h2 className="text-3xl font-semibold">Anciens Numéros</h2>
                    <ul className="list-disc list-inside ml-2"> 
                        <li>
                            <a href="/Ressources/Gazette/GA N-1 OCT 22.pdf"
                            download="GAMBETT'Actu__Octobre_2022">Octobre_2022</a>                            
                        </li>  
                        <li>
                            <a href="/Ressources/Gazette/GA N-2 JAN 23.pdf"
                            download="GAMBETT'Actu__Janvier_2023">Janvier_2023</a>                            
                        </li>   
                        <li>
                            <a href="/Ressources/Gazette/GA N-3 MAI 23.pdf"
                            download="GAMBETT'Actu__Mai_2023">Mai_2023</a>                            
                        </li>                           

                    </ul>  
                </div>
            </div>
        </div>                
    </div>
     );
}
 
export default Gazette;

