import { useState } from 'react';

const Photo = () => {
  const [cat, setCat] = useState('all');

  const afficherImg = (category) => {
    if (cat === category) {
      setCat('all');
    } else {
      setCat(category);
    }

    console.log(cat);
  };

  let photos = [
    ['residence/Photo2.jpg', 'Petit bois sous la neige', 'residence'],
    ['residence/Photo3.jpg', 'Soleil tapant sur une facade', 'residence'],
    ['residence/Photo4.jpeg', 'Résidence en Automne', 'residence'],
    ['residence/Photo5.jpeg', 'Résidence en Automne', 'residence'],
    ['residence/Photo6.jpeg', 'Résidence en Automne', 'residence'],
    ['residence/Photo7.jpeg', 'Résidence en Automne', 'residence'],
    ['residence/Photo8.jpeg', 'Résidence en Automne', 'residence'],
    ['residence/Photo9.jpeg', 'Résidence en Automne', 'residence'],
    ['noel/image1.webp', 'Sapin et enfants', 'noel'],
    ['noel/image2.jpg', 'Dessins des enfants', 'noel'],
    ['noel/image3.jpg', 'Table des délices', 'noel'],
    ['noel/image4.jpg', 'Sapin et cadeaux', 'noel'],
  ];

  let gridPhoto = photos.map((photo) =>
    cat === 'all' ? (
      <div>
        <a href={'/' + photo[0]}>
          <figure className="overflow-hidden max-h-80">
            <img src={'/' + photo[0]} alt={photo[1]} />
            <figcaption>{photo[1]}</figcaption>
          </figure>
        </a>
      </div>
    ) : (
      photo[2] === cat && (
        <div>
          <a href={'/' + photo[0]}>
            <figure className="overflow-hidden max-h-80">
              <img src={'/' + photo[0]} alt={photo[1]} />
              <figcaption>{photo[1]}</figcaption>
            </figure>
          </a>
        </div>
      )
    )
  );

  return (
    <div className="container">
      <h2 className="text-3xl font-semibold text-center"> Photos </h2>
      <div className="">
        <button
          className={[
            'bg-primary py-2 px-4 rounded-md ml-3  hover:bg-tertiaire'   ,
            (cat=="residence" ? "bg-tertiaire" :"")       
          ].join(" ")}
          id="residence"
          onClick={() => afficherImg('residence')}
        >
          {' '}
          Résidence{' '}
        </button>
        <button
          className={[
            'bg-primary py-2 px-4 rounded-md ml-3  hover:bg-tertiaire'   ,
            (cat=="noel" ? "bg-tertiaire" :"")       
          ].join(" ")}
          id="noel"
          onClick={() => afficherImg('noel')}
        >
          {' '}
          Concours Noël
        </button>
      </div>
      <div
        id="gridPhoto"
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5"
      >
        {gridPhoto}
      </div>
    </div>
  );
};

export default Photo;
