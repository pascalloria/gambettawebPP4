import { buildDataSWR } from '@/helpers/folderFilesFetcher';
import { getSession } from 'next-auth/react';
import AddGazette from '../../../components/Admin/AddGazette/AddGazette';

const Gazette = (props) => {
  // Recuper les fichier présent dans le dossier CR et construire un tableau avec leur URL
  let docs;
  const { data } = buildDataSWR('Ressources/Gazette');
  if (data) {
    docs = data.map((doc, i) => (
      <li key={i}>
        <a href={doc.path} download={doc.name}>
          {doc.name}
        </a>
      </li>
    ));
  }

  return (
    <div className="container">
      <div className="grid grid-cols-12 lg:gap-10">
        {/* Presentation de la Gazette */}
        <div className="col-span-12 mt-3 text-lg xl:col-span-9 lg:col-span-8">
          <article className="mt-3">
            <h2 className=" text-3xl font-semibold mt-3 mb-2"> Présentation</h2>
            <p>
              La gazette GAMBETT'Actu est une publication bimestruel (tous les 2
              mois) réalisée par la commission COMMUNICATION du CS pour vous
              tenir au courant des actualités de la résidence.
              <br />
              <br />
              Elle comportera toujours au moins un <strong>
                compte rendu
              </strong>{' '}
              des réunions du <strong>Conseil Sydincal.</strong>
            </p>
          </article>
          {/* Dernier Numéro */}
          <article className="">
            <h3 className="border-t-2 pt-4 border-quartary text-2xl font-semibold mt-5 mb-3">
              Le Nouveau numéro du <i>GAMBETT'Actu</i> !!!{' '}
            </h3>

            <object
              id="gazettePdf"
              data={data ? data.slice(-1)[0].path + '#toolbar=0' : 'Loading...'}
              type="application/pdf"
              width="100%"
              height="600"
            >
              <embed
                src={
                  data ? data.slice(-1)[0].path + '#toolbar=0' : 'Loading...'
                }
                type="application/pdf"
              />
            </object>
            <p>
              Pour télécharger la gazette{' '}
              <a
                className="underline text-blue-700"
                href={data && data.slice(-1)[0].path}
                download={data && data.slice(-1)[0].name}
              >
                Cliquer ici{' '}
              </a>
            </p>
          </article>
        </div>
        {/* Encard ancien numéro */}
        <div
          id="gazette"
          className=" col-span-12 my-3 xl:col-span-3  lg:col-span-4 min-w-fit	 "
        >
          <div className="sticky top-20">
            {props.user && props.user.roles.includes('Modo') && <AddGazette />}
            <div className="mt-5 border-soldid border-2 border-black shadow-xl  shadow-black rounded-lg p-3 flex flex-col justify-center text-xl">
              <h2 className="text-2xl font-semibold">Anciens Numéros</h2>

              <ul className="list-disc list-inside ml-2">
                {!data && 'Loading...'}
                {data && docs}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gazette;

export async function getServerSideProps(context) {
  let user = null;
  const session = await getSession({ req: context.req });
  if (session) {
    user = session.user;
  }

  return {
    props: {
      user: user,
    },
  };
}
