import "./App.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import { useState } from "react";

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

          // eslint-disable-next-line no-undef
          // ref.innerHtml = MathJax.mathml2chtml(data);

          console.log({ data });
        }}
        onBlur={(event, editor) => {
          // eslint-disable-next-line no-undef
          console.log("Blur.", { editor, MathJax });
          // eslint-disable-next-line no-undef
          MathJax.typeset();
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
      <p>
        This is dynamic content from Editor, blur the editor to render from
        MathML to HTML
      </p>
      <div dangerouslySetInnerHTML={{ __html: ckData }}></div>
      <p>This is STATIC</p>
      <p>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mroot>
            <mn>2</mn>
            <mn>1</mn>
          </mroot>
        </math>
      </p>
    </div>
  );
}

export default App;
