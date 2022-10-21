import React from 'react';

export default function CommentEditor() {
  const boldButton = () => {
    quillInstance.format('bold', true);
  };
  const italicButton = () => {
    quillInstance.format('italic', true);
  };
  return (
    <div
      ref={editor}
      id="reply-input"
      className="block w-full h-full max-w-lg text-slate-500 p-0 text-sm tracking-sm border-0 placeholder:text-slate-500 focus:outline-none focus:ring-0"
    />
  );
}
