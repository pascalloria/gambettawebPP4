import DocumentUploadForm from '../../DocumentUpload/DocumentUploadForm';

const AddGazette = (props) => {
  let onClickHandle = () => {
    props.onDocAdd();
  };

  return (
    <div className="pb-1 border-quartary">
      <DocumentUploadForm
        folder="Ressources/Gazette"
        type="une gazette"
        placeholder="GA N_X MMM YY"
        onDocAdd={onClickHandle}
      />
    </div>
  );
};

export default AddGazette;
