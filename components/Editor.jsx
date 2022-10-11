/* eslint-disable no-param-reassign */
import React, { useState, useRef, useEffect } from 'react';
// import dynamic from 'next/dynamic';
import FileService from '@/services/file';
import _ from 'lodash';
import {
  TextBold,
  TextItalic,
  LinkOne,
  Quote,
  Code,
  Camera,
  Play,
} from '@icon-park/react';
import { PlusCircle, MinusCircle, Hash } from 'react-feather';
import {
  BoldBlot,
  ItalicBlot,
  VideoBlot,
  ImageBlot,
  DividerBlot,
  CustomCodeBlot,
  LinkBlot,
  BlockquoteBlot,
  HeaderBlot,
  TweetBlot,
} from '@/utils/QuillBlots';
import hljs from 'highlight.js';
import { Block } from '@/utils/QuillBlots/Blots';
import Quill from 'quill';

export default function Editor({ onChange, setImages, value }) {
  const uploadImage = async (file) => {
    const { data } = await FileService.uploadFile(file, file.name);
    return data.publicPath;
  };
  // const [value, setValue] = useState();
  const [quillInstance, setQuillInstance] = useState();

  const tooltip = useRef();
  const sidebar = useRef();
  const editor = useRef();
  const input = useRef();
  const tooltipInput = useRef();
  const tooltipButtons = useRef();

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
    Quill.register(CustomCodeBlot, true);

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
          // eslint-disable-next-line array-callback-return, consistent-return
          quill.getContents().map((item) => {
            if (item.insert && item.insert.image && item.insert.image.url) {
              return item.insert.image.url;
            }
          })
        );
      }, 5000)();

      tooltip.current.style.display = 'none';
      sidebar.current.style.display = 'none';
      sidebar.current.classList.remove('active');
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
  const addLink = (e) => {
    e.stopPropagation();
    tooltipInput.current.style.display = 'block';
    tooltip.current.style.display = 'block';
    tooltipButtons.current.style.display = 'none';
  };
  const formatCode = () => {
    quillInstance.format('code-block', 2);
    const syntax = document.getElementsByClassName('ql-syntax');
    if (syntax.length > 0) {
      Array.from(syntax).forEach((item) => {
        if (!item.dataset.isHighlighted) {
          item.innerHTML = hljs.highlightAuto(item.innerText).value;
          item.dataset.isHighlighted = true;
        }
      });
    }
  };
  const addDivider = () => {
    const range = quillInstance.getSelection(true);
    quillInstance.insertEmbed(range.index, 'divider', true, Quill.sources.USER);
    quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
    sidebar.current.style.display = 'none';
  };
  const addImage = () => {
    const range = quillInstance.getSelection(true);
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      const position = range ? range.index : 0;
      quillInstance.insertText(position, 'Uploading Image. Please wait...', {
        size: '2rem',
      });
      const res = await uploadImage(file, quillInstance);

      quillInstance.insertEmbed(
        range.index,
        'image',
        {
          alt: 'Quill Cloud',
          url: res,
        },
        Quill.sources.USER
      );
      quillInstance.deleteText(position + 1, 31);
      quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
    };
    sidebar.current.style.display = 'none';
  };
  const addVideo = (e) => {
    e.stopPropagation();
    const range = quillInstance.getSelection(true);
    const lineBounds = quillInstance.getBounds(range);
    input.current.style.display = 'block';
    input.current.style.left = `${lineBounds.left - 15}px`;
    input.current.style.top = `${lineBounds.top - 3}px`;
    sidebar.current.style.display = 'none';
  };
  const addTweet = (e) => {
    e.stopPropagation();
    const range = quillInstance.getSelection(true);
    const lineBounds = quillInstance.getBounds(range);
    input.current.style.display = 'block';
    input.current.style.left = `${lineBounds.left - 15}px`;
    input.current.style.top = `${lineBounds.top - 3}px`;
    sidebar.current.style.display = 'none';
    e.target.value = '';
  };
  const handleShowControl = () => {
    sidebar.current.classList.toggle('active');
    quillInstance.focus();
  };
  const handleFormat = (type, param) => {
    quillInstance.format(type, param);
  };
  return (
    <div className="text-editor">
      <div ref={tooltip} id="tooltip-controls">
        <div className="hidden" ref={tooltipButtons}>
          <button
            type="button"
            id="bold-button"
            onClick={() => handleFormat('bold', true)}
          >
            <TextBold className="transform -translate-y-[2px]" />
          </button>
          <button
            type="button"
            id="italic-button"
            onClick={() => handleFormat('italic', true)}
          >
            <TextItalic />
          </button>
          <button type="button" id="link-button" onClick={addLink}>
            <LinkOne />
          </button>
          <button
            type="button"
            id="blockquote-button"
            onClick={() => handleFormat('blockquote', true)}
          >
            <Quote />
          </button>
          <button
            type="button"
            id="header-1-button"
            onClick={() => handleFormat('header', 1)}
          >
            <div className="text-start align-top font-light transform -translate-y-[2px]">
              H<sub className="ml-[2px]">1</sub>
            </div>
          </button>
          <button
            type="button"
            id="header-2-button"
            onClick={() => handleFormat('header', 2)}
          >
            <div className=" text-start align-top font-light transform -translate-y-[2px]">
              H<sub className="ml-[2px]">2</sub>
            </div>
          </button>
          <button type="button" id="divider-button" onClick={formatCode}>
            <Code />
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
        <button type="button" id="show-controls" onClick={handleShowControl}>
          <PlusCircle />
        </button>
        <span className="controls">
          <button type="button" id="image-button" onClick={addImage}>
            <Camera size={24} />
          </button>
          <button type="button" id="video-button" onClick={addVideo}>
            <Play size={24} />
          </button>
          <button type="button" id="tweet-button" onClick={addTweet}>
            <Hash />
          </button>
          <button type="button" id="divider-button" onClick={addDivider}>
            <MinusCircle />
          </button>
        </span>
      </div>
      <div ref={editor} id="editor-container" className="relative" />
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
