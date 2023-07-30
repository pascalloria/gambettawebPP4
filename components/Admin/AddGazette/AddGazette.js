import DocumentUploadForm from "../../DocumentUpload/DocumentUploadForm";

const AddGazette = () => {
    return ( <div className="pb-1 border-quartary">
    <DocumentUploadForm
      folder="Ressources/Gazette"
      type="une gazette"
      placeholder="GA N-X MMM YY"
    />
  </div> );
}
 
export default AddGazette;