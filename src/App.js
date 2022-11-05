import "./App.css";
// import MathType from "@wiris/mathtype-ckeditor5";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import { useState } from "react";
import "polyfill-math";
import MathJax from "react-mathjax-preview";

function App() {
  const [ckData, setCkData] = useState("");
  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        data={ckData}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();

          setCkData(data);
          console.log({ data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
        config={
          {
            // toolbar: ["MathType"],
          }
        }
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <MathJax math={ckData}></MathJax>
    </div>
  );
}

export default App;
