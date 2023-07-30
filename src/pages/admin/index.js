import { getSession } from 'next-auth/react';
import { buildDataSWR } from '@/helpers/folderFilesFetcher';

import AddGazette from '../../../components/Admin/AddGazette/AddGazette';
import AddCR from '../../../components/Admin/AddCR/AddCR';
import AddPhoto from '../../../components/Admin/AddPhoto/AddPhoto';
import Link from 'next/link';

const Admin = (props) => {
  return (
    <div className="container">
      <h1 className="text-3xl font-semibold text-center">
        Page d'administration
      </h1>

      {props.user && props.user.roles.includes('Modo') ? (
        <>
          <div className="flex justify-center items-center mt-5 gap-6">
            <div className="rounded basis-2/5 border-4 px-2 py-32 text-center border-quartary">
              <Link rel="stylesheet" href="/ajouter">
                <h2 className="inline-block px-8 rounded text-2xl py-4 font-semibold  bg-quartary hover:bg-primary hover:text-secondary">
                  Ajouter un article
                </h2>{' '}
              </Link>
            </div>

            <div className="rounded basis-2/5 border-4 px-2 py-1 border-quartary">
              <h2 className="text-2xl p-2 mx-auto font-semibold text-center">
                Ajouter une Photo
              </h2>
              <AddPhoto />
            </div>
          </div>

          <div className="flex justify-center items-center mt-5 gap-6">
            {/*  Ajout d'un compte Rendu */}
            <div className="rounded basis-2/5 border-4 px-2 py-1 border-quartary">
              <AddCR />
            </div>
            {/*  Ajout d'une Gazette Rendu */}
            <div className=" rounded basis-2/5 border-4 px-2 py-1 border-quartary">
              <AddGazette />
            </div>
          </div>
        </>
      ) : (
        <h2 className="text-5xl text-primary text-center mt-20">
          {' '}
          Accés refusé
        </h2>
      )}
    </div>
  );
};

export default Admin;

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
