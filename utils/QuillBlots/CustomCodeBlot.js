import hljs from 'highlight.js';
import { BlockEmbed } from './Blots';

export default class CustomCode extends BlockEmbed {
  static create(value) {
    const { lang, content } = value;
    const node = super.create(value);
    const code = document.createElement('code');
    code.setAttribute('class', lang);
    code.innerHTML = hljs.highlightAuto(content).value;
    node.appendChild(code);
    return node;
  }

  static value(node) {
    return {
      lang: node.firstChild.getAttribute('class'),
      content: node.firstChild.innerText,
    };
  }
}

CustomCode.blotName = 'code-custom';
CustomCode.tagName = 'pre';
