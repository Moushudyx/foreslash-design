import { Component, Host, Prop, h } from '@stencil/core';
// import { getDefaultTheme, Theme, ThemeColor } from '../../context/theme';
// import { randomString } from 'foreslash';

export type ButtonType = 'primary' | 'secondary' | 'flat' | 'link' | 'default';
export type ButtonSize = 'small' | 'large' | 'middle' | 'default';

@Component({
  tag: 'fs-button',
  styleUrl: 'fs-button.scss',
  shadow: true,
})
export class FsButton {
  @Prop()
  type: ButtonType = 'secondary';
  @Prop()
  size: ButtonSize;
  @Prop()
  disabled: boolean;
  @Prop()
  loading: boolean;
  render() {
    return (
      <Host
        class={{
          'fs-button': true,
          'fs-button-primary': this.type === 'primary',
          'fs-button-default': ['secondary', '', 'default', undefined, null].includes(this.type),
          'fs-button-flat': this.type === 'flat',
          'fs-button-link': this.type === 'link',
          'fs-button-small': this.size === 'small',
          'fs-button-large': this.size === 'large',
          'fs-button-disabled': this.disabled || this.loading,
        }}
      >
        <div class="fs-button__bg"></div>
        <div class="fs-button__icon"></div>
        <div class="fs-button__content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
