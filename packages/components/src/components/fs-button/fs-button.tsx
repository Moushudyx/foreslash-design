import { Component, Host, Prop, h } from '@stencil/core';
import { randomString} from 'foreslash'

export type ButtonType = 'primary' | 'secondary' | 'flat' | 'link';

@Component({
  tag: 'fs-button',
  styleUrl: 'fs-button.css',
  shadow: true,
})
export class FsButton {
  @Prop()
  type: ButtonType = 'primary';
  render() {
    return (
      <Host>
        <slot></slot>
        {randomString(6)}
      </Host>
    );
  }
}
