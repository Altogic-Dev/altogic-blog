import hljs from 'highlight.js';
import { BlockEmbed } from './Blots';

export default class CustomCode extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    if (value) {
      const { lang, content } = value;
      const code = document.createElement('code');
      code.setAttribute('class', lang);
      code.innerHTML = hljs.highlightAuto(content).value;
      node.appendChild(code);
    }
    return node;
  }

  static value(node) {
    return {
      lang: node.getAttribute('class'),
      content: node.innerText,
    };
  }
}

CustomCode.blotName = 'code-custom';
CustomCode.tagName = 'pre';
CustomCode.className = 'ql-syntax';
