/* eslint-disable no-undef */
import "./App.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import { useState } from "react";
import { useEffect } from "react";

async function httpGet(url) {
  return await fetch(url).then(async res => await res.text());
}

function parseXml(text) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");
  console.log("xml", {
    xx: xmlDoc.getElementsByTagName("Worksheet")[3].childNodes[2],
  });
  return xmlDoc.getElementsByTagName("Worksheet")[3].childNodes[2];
  // xmlDoc.getElementsByTagName("Worksheet")[3];
}

function App() {
  const [ckData, setCkData] = useState("");
  const [tex, setTex] = useState("");
  const [mml, setMml] = useState("");

  useEffect(() => {
    async function fetchTex() {
      const tex = await httpGet("/tex-combined.txt");

      setTex(tex);
    }
    async function fetchMML() {
      const mml = await httpGet("/mml.xml");

      setMml(mml);

      parseXml(mml);
    }

    fetchTex();
    fetchMML();

    setTimeout(() => {
      MathJax.typeset();
    }, 5000);
  }, []);

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

          console.log("data", { data });
          setCkData(data);
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
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>
        This is dynamic content from Editor, blur the editor to render from
        MathML to HTML. This content combination of HTML and MML
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: ckData }}
        style={{ minHeight: 200 }}
      ></div>

      <p>This content is TEX to HTML</p>
      <div
        dangerouslySetInnerHTML={{
          __html: tex,
        }}
        style={{ minHeight: 200 }}
      ></div>
      <p>This content is MML+XML to HTML</p>
      <div
        dangerouslySetInnerHTML={{
          __html: mml,
        }}
        style={{ minHeight: 200, display: "none" }}
      ></div>
    </div>
  );
}

export default App;
