import { CodeBlock } from './Blots';

export default class CustomCode extends CodeBlock {
  static create() {
    const node = super.create();
    node.setAttribute('spellcheck', 'false');
    return node;
  }
}

CustomCode.blotName = 'code-block';
CustomCode.tagName = 'pre';
