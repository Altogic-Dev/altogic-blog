/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Button from './basic/button';
import 'react-quill/dist/quill.snow.css';
// import { Quill } from "react-quill";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
function CustomUndo() {
  return (
    <svg viewBox="0 0 18 18">
      <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
      <path
        className="ql-stroke"
        d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
      />
    </svg>
  );
}

// Redo button icon component for Quill editor
function CustomRedo() {
  return (
    <svg viewBox="0 0 18 18">
      <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
      <path
        className="ql-stroke"
        d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
      />
    </svg>
  );
}

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];

// Quill Toolbar component
export function QuillToolbar() {
  return (
    <div id="toolbar" className="border-none mb-2">
      <span className="ql-formats">
        <Button className="ql-bold" />
        <Button className="ql-italic" />
        <Button className="ql-underline" />
        <Button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <Button className="ql-list" value="ordered" />
        <Button className="ql-list" value="bullet" />
        <Button className="ql-indent" value="-1" />
        <Button className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <Button className="ql-link" />
      </span>
      <span className="ql-formats">
        <Button className="ql-undo">
          <CustomUndo />
        </Button>
        <Button className="ql-redo">
          <CustomRedo />
        </Button>
      </span>
    </div>
  );
}

export default QuillToolbar;
