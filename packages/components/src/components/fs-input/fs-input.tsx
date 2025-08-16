import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'fs-input',
  styleUrl: 'fs-input.css',
  shadow: true,
})
export class FsInput {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
