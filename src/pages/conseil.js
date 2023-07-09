const Conseil = () => {
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

  let commissionShow = commissions.map((commission) => (
    <div class="col-span-12 lg:col-span-4 md:col-span-6 text-center mt-3 ">
      <h4 className="text-xl mb-2 ">{commission[0]}</h4>
      <ul class=" rounded-md overflow-hidden bg-white">
        <li class="bg-blue-300 text-white ">{commission[1]}</li>
        {commission[2].map((conseiller) => (
          <li class="list-group-item">{conseiller} </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <div className="container">
      <div class="grid grid-cols-12 lg:gap-10">
        {/*  Organisation du conseil */}
        <div class="col-span-12 lg:col-span-8 ">
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
        <div id="CR" class="col-span-12 lg:col-span-4 text-center mt-3 min-w-fit">
          <div class="sticky top-20 border-soldid border-2 border-black shadow-xl  shadow-black	 rounded-lg p-3 flex flex-col justify-center text-xl">
            <h2 className="font-bold text-2xl mb-1">Compte Rendu</h2>
            <ul className="list-disc list-inside ml-2">
              <li>
                <a
                  href="/Ressources/CR/CR reunion du 24 mars 2023.pdf"
                  download="24/03/22 Réunion CS"
                >
                  24/03/22 Réunion CS
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/CR reunion du 15 mars 2023.pdf"
                  download="15/03/22 Réunion CS"
                >
                  15/03/22 Réunion CS
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/CR reunion du 9 fevrier 2023.pdf"
                  download="09/02/22 Réunion CS"
                >
                  09/02/22 Réunion CS
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/CR reunion du 27 janvier 2023.pdf"
                  download="27/01/22 Réunion CS"
                >
                  27/01/22 Réunion CS
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/CR reunion du 11 janvier 2023.pdf"
                  download="11/01/22 Réunion CS"
                >
                  11/01/22 Réunion CS
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/011122 Commission Finances et compta.pdf"
                  download="01/11/22 Commission Finances et compta"
                >
                  01/11/22 Finances et compta
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/151122 ESPACES VERTS.pdf"
                  download="15/11/22 ESPACES VERTS"
                >
                  15/11/22 ESPACES VERTS
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/151122 Ménage.pdf"
                  download="15/11/22 Ménage"
                >
                  15/11/22 Ménage
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/201022 Préparation AGE 2510.pdf"
                  download="20/10/22 Préparation AGE 2510.pdf"
                >
                  20/10/22 Préparation AGE
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/031122 Chauffage - ARC.pdf"
                  download="03/11/22 Chauffage - ARC.pdf"
                >
                  03/11/22 Chauffage - ARC
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/211022 Chauffage.pdf"
                  download="21/10/22 Chauffage.pdf"
                >
                  21/10/22 Chauffage
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/251122 Réunion extraordinaire gaz chauffage.pdf"
                  download="25/11/22 Réunion extraordinaire gaz chauffage.pdf"
                >
                  25/11/22 chauffage
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/271022 Réunion CS.pdf"
                  download="27/10/22 Réunion CS.pdf"
                >
                  27/10/22 Réunion CS
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/281222 réunion CS.pdf"
                  download="28/12/22 réunion CS.pdf"
                >
                  28/12/22 réunion CS
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/101122 réunion CS.pdf"
                  download="10/11/22 réunion CS"
                >
                  10/11/22 réunion CS
                </a>
              </li>
              <li>
                <a
                  href="/Ressources/CR/141022 Réunion CS.pdf"
                  download="14/10/22 Réunion CS"
                >
                  14/10/22 Réunion CS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conseil;
