// import addFileIcon from "/images/avatar/camera.png";
// import React, { useRef, useState } from "react";
// // import "./dragDrap.css";
// import Error from "@/core/utility/Error";
// import { useDropzone } from "react-dropzone";
// import { ref } from "yup";
// export default function DragDropImg({ imgUpload, setImgUpload }) {
//   // const [files, setFiles] = useState([]);
//   // Error.jsx
//   const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
//     useDropzone({
//       maxFiles: 100,
//       accept: {
//         "image/png": [".png", ".jpg", ".jpeg"],
//       },
//       // name: "files",
//       onDrop: (acceptedFiles) => {
//         setImgUpload(
//           acceptedFiles.map((file) =>
//             Object.assign(file, { preview: URL.createObjectURL(file) })
//           )
//           // acceptedFiles.forEach(file=>{
//           //   const reader=new FileReader()
//           //   reader.onload=() =>{setFiles(prevState=>[...prevState,reader.result])}
//           //   reader.
//           // })
//         );
//       },
//     });

//     console.log("getRootProps : ",getRootProps(),"\n","getInputProps : ",getInputProps());

// const handleRemoveFile = (index) => {
//   const updatedFiles = [...selectedFiles];
//   updatedFiles.splice(index, 1);
//   setSelectedFiles(updatedFiles);
//   console.log("updatedFiles: " + updatedFiles);
// };

//   return (
//     <>
//       <section className="my-5 w-full border-2  border-dashed border-[#d5d5e1] bg-[#dfe3f259] text-center">
//         <div
//           {...getRootProps({ className: "text-center cursor-pointer w-full" })}
//         >
//           <input name="imgUpload" multiple {...getInputProps()} />
//           <img className=" mx-auto h-40 " src={addFileIcon} alt="addfile" />
//           <p className="text-xl font-semibold">
//             {" "}
//             تصویر را در اینجا بکشید و رها کنید{" "}
//           </p>
//         </div>

//         <div className="flex flex-wrap justify-center ">
//           {imgUpload.map((file) => (
//             <div className="image-preview m-2 h-40 w-40 p-4 " key={file.name}>
//               <img
//                 src={file.preview}
//                 alt="img preview"
//                 className="h-full w-auto rounded-md object-cover"
//                 onLoad={() => {
//                   URL.revokeObjectURL(file.preview);
//                 }}
//               />
//             </div>
//           ))}
//         </div>

//         {/* <div className="filesAccepted">
//           {acceptedFiles[0] ? (
//             <p className="text-2xl text-green-500">🙂 فایل پذیرفته شد</p>
//           ) : (
//             ""
//           )}
//         </div>

//         <div className="fileNotAccepted">
//           {fileRejections[0] ? (
//             <Error errorM={fileRejections[0].errors[0]} />
//           ) : (
//             ""
//           )}
//         </div> */}
//       </section>
//     </>
//   );
// }

// ------------------------------------------------------------------------------

// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// // import addFileIcon from "/images/avatar/camera.png";

// const DragDropImg = ({ formData }) => {

//   const onDrop = useCallback((acceptedFiles) => {
//     // const formData = new FormData();

// //  zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz         );
//     acceptedFiles.forEach((file) => {
//       Object.assign(file, { preview: URL.createObjectURL(file) })
//       formData.append("files[]", file);
//       console.log("file : ",file);
//     });
//     console.log("acceptedFiles : ",acceptedFiles);
//     console.log("formData : ",formData);

//     // fetch('/api/upload', {
//     //   method: 'POST',
//     //   body: formData,
//     // })
//     //   .then(response => response.json())
//     //   .then(data => {
//     //     console.log(data); // You can handle the response here
//     //   })
//     //   .catch(error => {
//     //     console.log('Error uploading files:', error);
//     //   });
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     multiple: true,
//   });

//   return (
//     <section className="my-5 w-full border-2  border-dashed border-[#d5d5e1] bg-[#dfe3f259] text-center">
//       <div className="file-upload">
//         <div
//           {...getRootProps()}
//           className={`dropzone ${isDragActive ? "active" : ""}`}
//         >
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p className="text-xl font-semibold">
//               {" "}
//               تصویر را در اینجا بکشید و رها کنید{" "}
//             </p>
//           ) : (
//             <p className="text-xl font-semibold">
//               {" "}
//               تصویر را در اینجا بکشید و رها کنید یا برای انتخاب کیلیک نمایید
//             </p>
//           )}
//           <img className=" mx-auto h-40 " src={addFileIcon} alt="addfile" />
//         </div>
//       </div>
//       {/* <div className="flex flex-wrap justify-center ">
//         {acceptedFiles.map((file) => (
//              <div className="image-preview m-2 h-40 w-40 p-4 " key={file.name}>
//                <img
//                  src={file.preview}
//                  alt="img preview"
//                  className="h-full w-auto rounded-md object-cover"
//                  onLoad={() => {
//                    URL.revokeObjectURL(file.preview);
//                  }}
//                />
//              </div>
//            ))}
//       </div> */}
//     </section>
//   );
// };

// export default DragDropImg;

// ---------------------------------------------------------------------------

// import React, { useState } from 'react';
// import axios from 'axios';

// function DragDropImg({selectedFiles, setSelectedFiles}) {
//   // const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleFileChange = (event) => {
//     setSelectedFiles([...selectedFiles, ...event.target.files]);
//   };
//   console.log("handleFileChange : " + handleFileChange);

//   const handleRemoveFile = (index) => {
//     const updatedFiles = [...selectedFiles];
//     updatedFiles.splice(index, 1);
//     setSelectedFiles(updatedFiles);
//     console.log("updatedFiles: " + updatedFiles);
//   };
//   console.log("selectedFiles: " + selectedFiles);

//   // const handleUpload = () => {
//   //   const formData = new FormData();
//   //   for (let i = 0; i < selectedFiles.length; i++) {
//   //     formData.append('files[]', selectedFiles[i]);
//   //   }

//   //   axios.post('/api/upload', formData)
//   //     .then(response => {
//   //       console.log('Files uploaded successfully');
//   //     })
//   //     .catch(error => {
//   //       console.log('Error uploading files', error);
//   //     });
//   // };

//   return (
//     <section className="my-5 w-full border-2  border-dashed border-[#d5d5e1] bg-[#dfe3f259] text-center">
//       <input  type="file" multiple onChange={handleFileChange} />
//       <div className="flex flex-wrap justify-center ">
//         {selectedFiles.map((file, index) => (
//           <div className=" m-2 h-40 w-40 p-4 relative "  key={index}>
//             <img className="h-full w-auto rounded-md object-cover" src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
//             <span>{file.name}</span>
//             <button className="text-white bg-red-500 rounded w-5 h-5 absolute top-0 left-0 " onClick={() => handleRemoveFile(index)}>X</button>
//           </div>
//         ))}
//       </div>
//       {/* <button onClick={handleUpload}>Upload</button> */}
//     </section>
//   );
// }

// export default DragDropImg;

// ------------------------------------------------------------------------------------

import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const DragDropImg = ({ formData }) => {
  const onDrop = async (acceptedFiles) => {
    // const formData = new FormData();
    // formData.append('file', acceptedFiles[0]);
    formData = acceptedFiles[0];
    console.log(formData);
    // acceptedFiles.forEach((file) => {
    //   Object.assign(file, { preview: URL.createObjectURL(file) })
    //   formData.append("files[]", file);
    //   console.log("file : ",file);
    // });
    // console.log("formData : ", formData);
    // console.log("acceptedFiles : ", acceptedFiles);

    // try {
    //   const response = await axios.post('/api/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log('Upload successful:', response.data);
    // } catch (error) {
    //   console.log('Error uploading file:', error);
    // }
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop a file here, or click to select a file</p>
        </div>
      )}
      {/* {acceptedFiles.map((file) => (
             <div className="image-preview m-2 h-40 w-40 p-4 " key={file.name}>
               <img
                 src={file.preview}
                 alt="img preview"
                 className="h-full w-auto rounded-md object-cover"
                 onLoad={() => {
                   URL.revokeObjectURL(file.preview);
                 }}
               />
             </div>
           ))} */}
    </Dropzone>
  );
};

export default DragDropImg;
