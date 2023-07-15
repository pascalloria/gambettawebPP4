import { useState } from 'react';
import { buildDataSWR } from '@/helpers/folderFilesFetcher';

const Photo = () => {
  const [cat, setCat] = useState('residence');

  const afficherImg = (category) => {
    setCat(category);
  };

  const { data } = buildDataSWR('Photos/' + cat);

  let gridPhoto;
  if (data) {
    gridPhoto = data.map((photo) => (
      <div>
        <a href={photo.path}>
          <figure className="overflow-hidden max-h-80">
            <img src={photo.path} alt={photo.name} />
            <figcaption>{photo.name}</figcaption>
          </figure>
        </a>
      </div>
    ));
  }

  return (
    <div className="container">
      <h2 className="text-3xl font-semibold text-center"> Photos </h2>
      <div className="">
        <button
          className={[
            'bg-primary py-2 px-4 rounded-md ml-3  hover:bg-tertiaire',
            cat == 'residence' ? 'bg-tertiaire' : '',
          ].join(' ')}
          id="residence"
          onClick={() => afficherImg('residence')}
        >
          {' '}
          Résidence{' '}
        </button>
        <button
          className={[
            'bg-primary py-2 px-4 rounded-md ml-3  hover:bg-tertiaire',
            cat == 'noel' ? 'bg-tertiaire' : '',
          ].join(' ')}
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
