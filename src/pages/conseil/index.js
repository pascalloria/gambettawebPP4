import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import AddCR from '../../../components/Admin/AddCR/AddCR';
import { listFile } from '@/helpers/utility';

const Conseil = (props) => {
  let commissions = [
    [
      'TRAVAUX',
      'Maribel Navaro',
      [
        'Christophe DS',
        'Taras Borynsky',
        'Philippe Pilverdier',
        'Pascal DRIGOU',
        'Brigitte RICHARD',
        'Jean-Pierre ADNOT',
      ],
    ],
    [
      'CHAUFFAGE',
      'Pascal DRIGOU',
      ['Melanie Nectoux', 'Bruno BARGE', 'Taras BORYNSKYY'],
    ],
    ['FINANCES', 'Camille LEMPEREUR', ['Pascaline FAVARD']],
    [
      'ESPACES VERTS',
      'Jean-Pierre ADNOT',
      [
        'Danielle ZINI',
        'Brigitte RICHARD',
        'Christophe D. S.',
        'Karine GUERRIN',
      ],
    ],
    ['COMMUNICATION', 'Karine GUERRIN', ['Pascaline FAVARD', 'Pascal LORIA']],
    [
      'GESTION DU PERSONNEL',
      'Mélanie NECTOUX',
      [
        'Jean-Pierre ADNOT',
        'Maribel NAVARRO',
        'Philippe PILVERDIER',
        'Camille LEMPEREUR',
      ],
    ],
    [
      'MENAGE',
      'Bruno BARGE',
      ['Jean-Pierre ADNOT', 'Karine GUERRIN', 'Danielle ZINI', 'Angéla PINNA'],
    ],
  ];

  let commissionShow = commissions.map((commission, i) => (
    <div
      key={i}
      class="col-span-12 lg:col-span-4 md:col-span-6 text-center mt-3 "
    >
      <h4 className="text-xl mb-2 ">{commission[0]}</h4>
      <ul class=" rounded-md overflow-hidden bg-white">
        <li class="bg-blue-300 text-white ">{commission[1]}</li>
        {commission[2].map((conseiller, j) => (
          <li key={j} class="list-group-item">
            {conseiller}{' '}
          </li>
        ))}
      </ul>
    </div>
  ));

  // Definir un tableau pour stocker nos objets
  const [dataArray, setDataArray] = useState([]);
  const [docs, setDocs] = useState();

  useEffect(() => {
    // fonction en async afin de mettre ajour seulement une fois les donnés récuperer
    const fetchData = async () => {
      try {
        const { datas, newDocs } = await listFile('Ressources/CR');
        setDataArray(datas);
        setDocs(newDocs);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-12 lg:gap-10">
        {/*  Organisation du conseil */}
        <div className="col-span-12 lg:col-span-8 ">
          <article>
            <h2 className="text-3xl font-bold mb-2"> Présentation</h2>
            <div className="text-xl ">
              <div className="mb-5">Les membres du CS sont : </div>
              <ul className="list-disc list-inside">
                <li> Pascal DRIGOU: Président</li>
                <li> Mélanie NECTOUX : vice-présidente</li>
                <li className="">
                  {' '}
                  Membres : Jean-Pierre ADNOT, Bruno BARGE, Taras BORYNSKYY,
                  Christophe D. S., Camille LEMPEREUR, Pascaline FAVARD, Angéla
                  PINNA, Maribel NAVARRO, Danielle ZINI, Brigitte RICHARD,
                  Philippe PILVERDIER, Pascal LORIA, Emma GERMAIN
                </li>
              </ul>
              <div className="mt-3">
                Une nouvelle adresse de contact a été créée :{' '}
              </div>
              <a
                className="underline text-blue-700"
                href="mailto:cs.gambetta.yerres@gmail.com?subject=Contact via le site"
              >
                cs.gambetta.yerres@gmail.com
              </a>
            </div>
          </article>

          {/* commission */}
          <h2 className="text-3xl font-bold mb-2 mt-3">Les commissions</h2>
          <div className="grid grid-cols-12 p-4 gap-6">{commissionShow}</div>
        </div>

        {/*  Compte rendu  */}
        <div
          id="CR"
          className="col-span-12 lg:col-span-4 text-center mt-3 min-w-fit"
        >
          <div className="sticky top-20">
            {props.user && props.user.roles.includes('Modo') && <AddCR />}

            <div className=" border-soldid border-2 border-black shadow-xl  shadow-black	 rounded-lg p-3 flex flex-col justify-center text-xl">
              <h2 className="font-bold text-2xl mb-1">Compte Rendu</h2>
              <ul className="list-disc list-inside ml-2">
                {!dataArray[0] && 'Loading...'}
                {dataArray[0] && docs}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conseil;

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
