import React from "react";
import { useState, useEffect } from "react";
import { marked } from "marked";

const renderer = new marked.Renderer();
function MD() {
  const [editor, setEditor] = useState(
    "# Welcome to my React Markdown Previewer! \n ## This is a sub-heading...\n [link]('https://google.com') \n\n `<div></div>`\n\n \n ### List Items: \n - Item 1 \n\n I am **bold** \n\n ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg) \n\n > Block Quotes! \n ```    \n// this is multi-line code:    \nfunction anotherExample(firstLine, lastLine) { \nif (firstLine == '```' && lastLine == '```') { \nreturn multiLineCode; \n}    \n}    \n```"
  );
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const rawMarkup = marked(editor, { sanitize: true });
    setMarkdown(
      <>
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked(rawMarkup, { renderer: renderer }),
          }}
        />
      </>
    );
  }, [editor]);

  const handleChange = (e) => {
    setEditor(e.target.value);

    const rawMarkup = marked(e.target.value, { sanitize: true });

    setMarkdown(
      <>
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked(rawMarkup, { renderer: renderer }),
          }}
        />
      </>
    );
  };

  return (
    <>
      <div className="editor">
        <h3 >Editor</h3>
        <textarea value={editor} id="editor" onChange={handleChange}></textarea>
      </div>
      <div className="previewer">
        <h3 id="heading">Previewer</h3>
        {markdown}
      </div>
    </>
  );
}

export default MD;
