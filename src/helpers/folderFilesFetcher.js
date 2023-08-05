import useSWR from 'swr';

//  Hook pour recuperer les chemins des documents d'un dossier dans public
const folderFilesFetcher = (url) => fetch(url).then((res) => res.json());
export const BuildDataSWR = (folderName) => {
  return useSWR(['/api/readfiles/' + folderName], folderFilesFetcher);
};
