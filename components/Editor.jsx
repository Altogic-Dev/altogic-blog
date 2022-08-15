import dynamic from 'next/dynamic';
import React, { useState, useRef } from 'react';

// import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

export function Editor() {
  const [value, setValue] = useState();
  const quillRef = useRef();

  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Tell your story..."
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default Editor;
