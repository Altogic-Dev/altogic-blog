/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable max-classes-per-file */
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import hljs from 'highlight.js';
import {
  faBold,
  faItalic,
  faLink,
  faQuoteRight,
  faHeader,
  faCamera,
  faPlay,
  faPlusCircle,
  faMinusCircle,
  faHashtag,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import FileService from '@/services/file';
import _ from 'lodash';

const Quill = require('@/utils/quill');

const TwitterWidgetsLoader = dynamic(import('twitter-widgets'), {
  ssr: false,
});

export default function Editor({ onChange, setImages, value }) {
  const uploadImage = async (file) => {
    const { data } = await FileService.uploadFile(file, file.name);
    return data.publicPath;
  };
  // const [value, setValue] = useState();
  const [quillInstance, setQuillInstance] = useState();
  const bold = useRef();
  const italic = useRef();
  const link = useRef();
  const quote = useRef();
  const header1 = useRef();
  const header2 = useRef();
  const image = useRef();
  const video = useRef();
  const tweet = useRef();
  const divider = useRef();
  const tooltip = useRef();
  const sidebar = useRef();
  const showControls = useRef();
  const code = useRef();
  const editor = useRef();
  const input = useRef();
  const tooltipInput = useRef();
  const tooltipButtons = useRef();

  const Inline = Quill.import('blots/inline');
  const Block = Quill.import('blots/block');
  const BlockEmbed = Quill.import('blots/block/embed');
  const CodeBlock = Quill.import('formats/code-block');
  const Parchment = Quill.import('parchment');

  const highlightCode = (text) => hljs.highlightAuto(text).value;

  class BoldBlot extends Inline {}
  BoldBlot.blotName = 'bold';
  BoldBlot.tagName = 'strong';

  class ItalicBlot extends Inline {}
  ItalicBlot.blotName = 'italic';
  ItalicBlot.tagName = 'em';
  class LinkBlot extends Inline {
    static create(val) {
      const node = super.create();
      // Sanitize url value if desired
      if (!val.startsWith('http') && !val.startsWith('https')) {
        val = `https://${val}`;
      }

      node.setAttribute('href', val);
      // Okay to set other non-format related attributes
      // These are invisible to Parchment so must be static
      node.setAttribute('target', '_blank');
      return node;
    }

    static formats(node) {
      // We will only be called with a node already
      // determined to be a Link blot, so we do
      // not need to check ourselves
      return node.getAttribute('href');
    }
  }
  LinkBlot.blotName = 'link';
  LinkBlot.tagName = 'a';
  LinkBlot.className = 'link';

  class BlockquoteBlot extends Block {}
  BlockquoteBlot.scope = Parchment.Scope.BLOCK;
  BlockquoteBlot.blotName = 'blockquote';
  BlockquoteBlot.tagName = 'blockquote';

  class CustomCode extends CodeBlock {
    static create(value) {
      const node = super.create(value);
      const _code = document.createElement('code');
      _code.innerHTML = highlightCode(value);
      node.appendChild(code);
      return node;
    }

    static value(node) {
      return node.textContent;
    }
  }

  CustomCode.blotName = 'code-custom';
  CustomCode.tagName = 'pre';
  CustomCode.className = 'syntax';

  class HeaderBlot extends Block {
    static formats(node) {
      return HeaderBlot.tagName.indexOf(node.tagName) + 1;
    }
  }
  HeaderBlot.blotName = 'header';
  // Medium only supports two header sizes, so we will only demonstrate two,
  // but we could easily just add more tags into this array
  HeaderBlot.tagName = ['H1', 'H2'];

  class DividerBlot extends BlockEmbed {}
  DividerBlot.blotName = 'divider';
  DividerBlot.tagName = 'hr';

  class ImageBlot extends BlockEmbed {
    static create(value) {
      const node = super.create();
      node.setAttribute('alt', value.alt);
      node.setAttribute('src', value.url);
      return node;
    }

    static value(node) {
      return {
        alt: node.getAttribute('alt'),
        url: node.getAttribute('src'),
      };
    }
  }
  ImageBlot.blotName = 'image';
  ImageBlot.tagName = 'img';
  ImageBlot.className = 'editor-img';

  class VideoBlot extends BlockEmbed {
    static create(url) {
      const node = super.create();
      node.setAttribute('src', url);
      node.setAttribute('frameborder', '0');
      node.setAttribute('allowfullscreen', true);
      return node;
    }

    static formats(node) {
      const format = {};
      if (node.hasAttribute('height')) {
        format.height = node.getAttribute('height');
      }
      if (node.hasAttribute('width')) {
        format.width = node.getAttribute('width');
      }
      return format;
    }

    static value(node) {
      return node.getAttribute('src');
    }

    format(name, value) {
      if (name === 'height' || name === 'width') {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name, value);
        }
      } else {
        super.format(name, value);
      }
    }
  }
  VideoBlot.blotName = 'video';
  VideoBlot.tagName = 'iframe';
  VideoBlot.className = 'editor-video';

  class TweetBlot extends BlockEmbed {
    static create(id) {
      const node = super.create();
      node.dataset.id = id;
      // Allow twitter library to modify our contents
      TwitterWidgetsLoader.load((err, twttr) => {
        if (err) {
          // do some graceful degradation / fallback
          return;
        }

        twttr.widgets.createTweet(id, node);
      });
      return node;
    }

    static value(domNode) {
      return domNode.dataset.id;
    }
  }
  TweetBlot.blotName = 'tweet';
  TweetBlot.tagName = 'div';
  TweetBlot.className = 'tweet';

  useEffect(() => {
    const quill = new Quill('#editor-container', {
      placeholder: 'Compose an epic...',
    });
    setQuillInstance(quill);
    Quill.register(BoldBlot);
    Quill.register(ItalicBlot);
    Quill.register(LinkBlot);
    Quill.register(BlockquoteBlot);
    Quill.register(HeaderBlot);
    Quill.register(DividerBlot);
    Quill.register(ImageBlot);
    Quill.register(TweetBlot);
    Quill.register(VideoBlot);
    Quill.register(CustomCode, true);

    quill.addContainer(tooltip.current);
    quill.addContainer(sidebar.current);
    quill.addContainer(input.current);

    quill.on(Quill.events.EDITOR_CHANGE, (eventType, range) => {
      if (eventType !== Quill.events.SELECTION_CHANGE) return;
      if (range == null) return;
      if (range.length === 0) {
        tooltip.current.style.display = 'none';
        const [block] = quill.scroll.descendant(Block, range.index);
        if (
          block != null &&
          block.domNode.firstChild instanceof HTMLBRElement
        ) {
          const lineBounds = quill.getBounds(range);
          sidebar.current.classList.remove('active');
          sidebar.current.style.display = 'block';
          sidebar.current.style.left = `${lineBounds.left - 50}px`;
          sidebar.current.style.top = `${lineBounds.top - 2}px`;
        } else {
          tooltip.current.style.display = 'none';
          sidebar.current.style.display = 'none';
          sidebar.current.classList.remove('active');
        }
      } else {
        tooltip.current.style.display = 'none';
        sidebar.current.style.display = 'none';
        sidebar.current.classList.remove('active');
        const rangeBounds = quill.getBounds(range);
        tooltip.current.style.display = 'block';
        tooltipButtons.current.style.display = 'block';
        tooltipInput.current.style.display = 'none';
        tooltip.current.style.left = `${
          rangeBounds.left +
          rangeBounds.width / 2 -
          tooltip.current.offsetWidth / 2
        }px`;
        tooltip.current.style.top = `${rangeBounds.bottom + 10}px`;
      }
    });
    quill.on(Quill.events.TEXT_CHANGE, () => {
      _.debounce(() => {
        onChange(quill.root.innerHTML);
        setImages(
          quill.getContents().map((item) => {
            if (item.insert && item.insert.image) {
              return item.insert.image.url;
            }
          })
        );
      }, 5000)();

      tooltip.current.style.display = 'none';
      sidebar.current.style.display = 'none';
      sidebar.current.classList.remove('active');
    });
    bold.current.addEventListener('click', () => {
      quill.format('bold', true);
    });
    italic.current.addEventListener('click', () => {
      quill.format('italic', true);
    });

    link.current.addEventListener('click', (e) => {
      e.stopPropagation();
      tooltipInput.current.style.display = 'block';
      tooltip.current.style.display = 'block';
      tooltipButtons.current.style.display = 'none';
    });

    quote.current.addEventListener('click', () => {
      quill.format('blockquote', true);
    });

    header1.current.addEventListener('click', () => {
      quill.format('header', 1);
    });

    header2.current.addEventListener('click', () => {
      quill.format('header', 2);
    });

    code.current.addEventListener('click', () => {
      quill.format('code-block', 2);
      const syntax = document.getElementsByClassName('ql-syntax')[0];
      syntax.innerHTML = highlightCode(syntax.innerText);
    });

    divider.current.addEventListener('click', () => {
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, 'divider', true, Quill.sources.USER);
      quill.setSelection(range.index + 1, Quill.sources.SILENT);
      sidebar.current.style.display = 'none';
    });

    image.current.addEventListener('click', () => {
      const range = quill.getSelection(true);
      const fileInput = document.createElement('input');

      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/*');
      fileInput.click();

      fileInput.onchange = async () => {
        const file = fileInput.files[0];
        const position = range ? range.index : 0;
        quill.insertText(position, 'Uploading Image. Please wait...', {
          size: '2rem',
        });
        const res = await uploadImage(file, quill);

        quill.insertEmbed(
          range.index,
          'image',
          {
            alt: 'Quill Cloud',
            url: res,
          },
          Quill.sources.USER
        );
        quill.deleteText(position + 1, 31);
        quill.setSelection(range.index + 1, Quill.sources.SILENT);
      };
      sidebar.current.style.display = 'none';
    });

    video.current.addEventListener('click', (e) => {
      e.stopPropagation();
      const range = quill.getSelection(true);
      const lineBounds = quill.getBounds(range);
      input.current.style.display = 'block';
      input.current.style.left = `${lineBounds.left - 15}px`;
      input.current.style.top = `${lineBounds.top - 3}px`;
      sidebar.current.style.display = 'none';
    });

    tweet.current.addEventListener('click', (e) => {
      e.stopPropagation();
      const range = quill.getSelection(true);
      const lineBounds = quill.getBounds(range);
      input.current.style.display = 'block';
      input.current.style.left = `${lineBounds.left - 15}px`;
      input.current.style.top = `${lineBounds.top - 3}px`;
      sidebar.current.style.display = 'none';
      e.target.value = '';
    });

    showControls.current.addEventListener('click', () => {
      sidebar.current.classList.toggle('active');
      quill.focus();
    });
  }, []);

  useEffect(() => {
    if (value && quillInstance) quillInstance.root.innerHTML = value;
  }, [value, quillInstance]);

  function convertMedia(url) {
    const vimeo = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    const youtube =
      /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

    if (vimeo.test(url)) {
      return url.replace(vimeo, '//player.vimeo.com/video/$1');
    }

    if (youtube.test(url)) {
      return url.replace(youtube, 'http://www.youtube.com/embed/$1');
    }
    if (url.includes('dailymotion')) {
      return url.replace('video', 'embed/video');
    }
    return url;
  }
  const validateURL = (url) => {
    const expression =
      /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return regex.test(url);
  };

  const handleAddVideo = (e) => {
    const { value } = e.target;
    if (e.which === 13) {
      const range = quillInstance.getSelection(true);
      if (validateURL(value)) {
        if (value.includes('twitter')) {
          const tweetUrlArray = value.split('/');
          const tweetId = tweetUrlArray[tweetUrlArray.length - 1];
          quillInstance.insertEmbed(
            range.index,
            'tweet',
            tweetId,
            Quill.sources.USER
          );
          quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
        } else {
          const url = convertMedia(value);
          quillInstance.insertEmbed(
            range.index,
            'video',
            url,
            Quill.sources.USER
          );
          quillInstance.formatText(range.index + 1, 1, {
            height: '480',
            width: '854',
          });
          quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
        }

        input.current.style.display = 'none';
        e.target.value = '';
      } else {
        quillInstance.insertText(range.index, value);
        quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
        input.current.style.display = 'none';
      }
    }
    if (e.which === 27) {
      sidebar.current.style.display = 'block';
      input.current.style.display = 'none';
    }
  };
  const handleAddLink = (e) => {
    const { value } = e.target;
    if (e.which === 13) {
      setTimeout(() => {
        quillInstance.format('link', value);
      }, 0.1);
      e.target.value = '';
    }
    if (e.code === 27) {
      tooltip.current.style.display = 'block';
      input.current.style.display = 'none';
      e.target.value = '';
    }
  };
  return (
    <div className="text-editor">
      <div ref={tooltip} id="tooltip-controls">
        <div className="hidden" ref={tooltipButtons}>
          <button type="button" ref={bold} id="bold-button">
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button type="button" ref={italic} id="italic-button">
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button type="button" ref={link} id="link-button">
            <FontAwesomeIcon icon={faLink} />
          </button>
          <button type="button" ref={quote} id="blockquote-button">
            <FontAwesomeIcon icon={faQuoteRight} />
          </button>
          <button type="button" ref={header1} id="header-1-button">
            <FontAwesomeIcon icon={faHeader}>
              <sub>1</sub>
            </FontAwesomeIcon>
          </button>
          <button type="button" ref={header2} id="header-2-button">
            <FontAwesomeIcon icon={faHeader}>
              <sub>2</sub>
            </FontAwesomeIcon>
          </button>
          <button ref={code} type="button" id="divider-button">
            <FontAwesomeIcon icon={faCode} />
          </button>
        </div>
        <div ref={tooltipInput} className="hidden w-[244px] h-[42px]">
          <input
            className=" w-full h-full focus:border-none focus:outline-none bg-transparent text-white text-xs placeholder:text-xs"
            placeholder="Paste or type a link…"
            onKeyDown={handleAddLink}
          />
        </div>
      </div>
      <div ref={sidebar} id="sidebar-controls">
        <button type="button" ref={showControls} id="show-controls">
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
        <span className="controls">
          <button ref={image} type="button" id="image-button">
            <FontAwesomeIcon icon={faCamera} />
          </button>
          <button ref={video} type="button" id="video-button">
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button ref={tweet} type="button" id="tweet-button">
            <FontAwesomeIcon icon={faHashtag} />
          </button>
          <button ref={divider} type="button" id="divider-button">
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
        </span>
      </div>
      <div ref={editor} id="editor-container" className="relative">
        Tell your story...
      </div>
      <div ref={input} className="hidden absolute w-full">
        <input
          className="w-full focus:border-none focus:outline-none"
          placeholder="Paste a YouTube, Vimeo or tweet url and press Enter"
          onKeyDown={handleAddVideo}
        />
      </div>
    </div>
  );
}
