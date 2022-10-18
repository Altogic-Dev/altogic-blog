import { CodeBlock } from './Blots';

export default class CustomCode extends CodeBlock {
  static create() {
    const node = super.create();

    return node;
  }
}

CustomCode.blotName = 'code-custom';
CustomCode.tagName = 'DIV';
CustomCode.className = 'ql-syntax';
