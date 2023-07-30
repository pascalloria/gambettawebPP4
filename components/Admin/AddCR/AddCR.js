import DocumentUploadForm from "../../DocumentUpload/DocumentUploadForm";

const AddCR = () => {
  return (
    <div className=" pb-1  border-quartary">
      <DocumentUploadForm
        folder="Ressources/CR"
        type="un compte rendu"
        placeholder="AA_MM_JJ TITRE"
      />{' '}
    </div>
  );
};

export default AddCR;
