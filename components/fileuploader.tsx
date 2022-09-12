import Files from "react-butterfiles";
import { useState } from "react";
export default function FileUplaoder() {
  const [files, setFiles] = useState<any>([]);
  console.log("files=", files);
  return (
    <>
      <Files
        multiple={true}
        maxSize="2mb"
        convertToBase64={true}
        multipleMaxSize="10mb"
        multipleMaxCount={3}
        accept={["application/pdf", "image/jpg", "image/jpeg"]}
        onSuccess={(file: any) => {
          let arr = [...files, ...file];

          setFiles(arr);
          console.log("files=", files);
        }}
        onError={(errors: any) => setFiles({ errors })}
      >
        {({ browseFiles, getDropZoneProps, getLabelProps }: any) => (
          <>
            <label {...getLabelProps()}>Your files</label>
            <div {...getDropZoneProps({ className: "myDropZone" })} />
            <button onClick={browseFiles}>Select files...</button>
            {files?.map((file: any) => {
              return <div>{file?.name}</div>;
            })}
          </>
        )}
      </Files>
    </>
  );
}
