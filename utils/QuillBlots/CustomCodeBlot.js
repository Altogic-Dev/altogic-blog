import hljs from 'highlight.js';
import { CodeBlock } from './Blots';

const highlightCode = (text) => hljs.highlightAuto(text).value;

export default class CustomCode extends CodeBlock {
  static create(value) {
    const node = super.create(value);
    const _code = document.createElement('code');
    _code.innerHTML = highlightCode(value);
    node.appendChild(_code);
    return node;
  }

  static value(node) {
    return node.textContent;
  }
}

CustomCode.blotName = 'code-custom';
CustomCode.tagName = 'pre';
CustomCode.className = 'syntax';
