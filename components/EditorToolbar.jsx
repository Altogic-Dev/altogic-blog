/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef } from 'react';
import Button from './Button';

export function QuillToolbar() {
  const bold = useRef();
  const italic = useRef();
  return (
    <>
      <div id="tooltip-controls">
        <Button ref={bold} id="bold-button">
          <i className="fa fa-bold" />
        </Button>
        <Button ref={italic} id="italic-button">
          <i className="fa fa-italic" />
        </Button>
        <Button id="link-button">
          <i className="fa fa-link" />
        </Button>
        <Button id="blockquote-button">
          <i className="fa fa-quote-right" />
        </Button>
        <Button id="header-1-button">
          <i className="fa fa-header">
            <sub>1</sub>
          </i>
        </Button>
        <Button id="header-2-button">
          <i className="fa fa-header">
            <sub>2</sub>
          </i>
        </Button>
      </div>
      <div id="sidebar-controls">
        <Button id="image-button">
          <i className="fa fa-camera" />
        </Button>
        <Button id="video-button">
          <i className="fa fa-play" />
        </Button>
        <Button id="tweet-button">
          <i className="fa fa-twitter" />
        </Button>
        <Button id="divider-button">
          <i className="fa fa-minus" />
        </Button>
      </div>
    </>
  );
}

export default QuillToolbar;
