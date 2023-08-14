import DocumentUploadForm from '../../DocumentUpload/DocumentUploadForm';

const AddCR = (props) => {
  let onClickHandle = () => {
    props.onDocAdd();
  };

  return (
    <div className=" pb-1  border-quartary">
      <DocumentUploadForm
        folder="Ressources/CR"
        type="un compte rendu"
        placeholder="AA_MM_JJ TITRE"
        onDocAdd={onClickHandle}
      />{' '}
    </div>
  );
};

export default AddCR;
