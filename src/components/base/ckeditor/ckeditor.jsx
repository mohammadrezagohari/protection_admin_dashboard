import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

const CKEditorText = ({ id, context, setContext }) => {

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={context}
        id={id}
        onReady={(editor) => {
          console.log("CKEditor React Component is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContext(data);
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
};

export default CKEditorText;
