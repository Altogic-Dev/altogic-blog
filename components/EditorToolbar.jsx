/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

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
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block',
];

// Quill Toolbar component
export function QuillToolbar() {
  return (
    <div id="toolbar" className="bg-slate-50 mb-2">
      <span className="ql-formats">
        <button className="ql-bold" type="button" />
        <button className="ql-italic" type="button" />
        <button className="ql-underline" type="button" />
        <button className="ql-strike" type="button" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" type="button" />
        <button className="ql-list" value="bullet" type="button" />
        <button className="ql-indent" value="-1" type="button" />
        <button className="ql-indent" value="+1" type="button" />
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="super" type="button" />
        <button className="ql-script" value="sub" type="button" />
        <button className="ql-blockquote" type="button" />
        <button className="ql-direction" type="button" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" type="button" />
        <select className="ql-color" type="button" />
        <select className="ql-background" type="button" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" type="button" />
        <button className="ql-image" type="button" />
        <button className="ql-video" type="button" />
      </span>
      <span className="ql-formats">
        <button className="ql-formula" type="button" />
        <button className="ql-code-block" type="button" />
        <button className="ql-clean" type="button" />
      </span>
      <span className="ql-formats">
        <button className="ql-undo" type="button">
          <CustomUndo />
        </button>
        <button className="ql-redo" type="button">
          <CustomRedo />
        </button>
      </span>
    </div>
  );
}

export default QuillToolbar;
