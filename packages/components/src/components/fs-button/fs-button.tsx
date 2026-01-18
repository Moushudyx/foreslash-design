import { Component, Host, Prop, h, Element, State } from '@stencil/core';
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
  size: ButtonSize = 'middle';
  @Prop()
  disabled: boolean;
  @Prop()
  loading: boolean;
  @Element() el: HTMLElement;
  @State() private hasIconSlot = false;
  private iconSlotEl?: HTMLSlotElement;

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled || this.loading) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    const key = ev.key;
    if (key === 'Enter' || key === ' ') {
      ev.preventDefault();
      if (this.disabled || this.loading) return;
      // 触发一次点击以保持事件一致性
      this.el.click();
    }
  };

  componentDidLoad() {
    this.updateIconSlot();
  }

  private handleIconSlotChange = () => {
    this.updateIconSlot();
  };

  private updateIconSlot() {
    const nodes = this.iconSlotEl?.assignedNodes({ flatten: true }) || [];
    this.hasIconSlot = nodes.some(
      node => node.nodeType === 1 || (node.nodeType === 3 && !!node.textContent?.trim())
    );
  }
  render() {
    const showSpinner = this.loading;
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
          'fs-button-loading': !!this.loading,
          'fs-button-with-icon': this.hasIconSlot || this.loading,
        }}
        role="button"
        aria-disabled={String(!!(this.disabled || this.loading))}
        tabIndex={this.disabled || this.loading ? -1 : 0}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <div class="fs-button__bg" part="bg"></div>
        <div class="fs-button__icon" part="icon">
          {showSpinner ? (
            <span class="fs-button__spinner" part="spinner"></span>
          ) : (
            <slot
              name="icon"
              ref={el => (this.iconSlotEl = el as HTMLSlotElement)}
              onSlotchange={this.handleIconSlotChange}
            ></slot>
          )}
        </div>
        <div class="fs-button__content" part="content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
