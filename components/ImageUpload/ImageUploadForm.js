import Image from 'next/image';

const ImageUploadFrom = (props) => {
  return (
    <div className="max-w-4xl mx-auto p-5 space-y-6">
      <label>
        <input type="file" hidden onChange={props.onChange} />
        <div className="w-60 mx-auto aspect-video rounded  flex items-center justify-center border-4 cursor-pointer">
          {props.selectedImage ? (
            <Image
              src={props.selectedImage}
              alt=""
              width={400}
              height={400}
            ></Image>
          ) : (
            <span> Selectionner une image</span>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageUploadFrom;
