import { Component, Event, EventEmitter, Host, Listen, Method, Prop, State, Watch, h, Element } from '@stencil/core';

@Component({
  tag: 'fs-dialog',
  styleUrl: 'fs-dialog.scss',
  shadow: true,
})
export class FsDialog {
  @Element() el: HTMLElement;
  /**
   * 是否显示
   */
  @Prop({ mutable: true, reflect: true })
  open = false;

  /**
   * 标题
   */
  @Prop()
  title = '';

  /**
   * 内容（默认渲染为 slot 的回退内容）
   */
  @Prop()
  content = '';

  /**
   * 确认按钮文字
   */
  @Prop()
  confirmText = '确认';

  /**
   * 取消按钮文字
   */
  @Prop()
  cancelText = '取消';

  /**
   * 是否显示取消按钮
   */
  @Prop()
  showCancel = true;

  /**
   * 点击遮罩是否关闭
   */
  @Prop()
  maskClosable = true;

  /**
   * ESC 是否可关闭
   */
  @Prop()
  closeOnEsc = true;

  /**
   * 是否显示右上角关闭按钮
   */
  @Prop()
  closable = true;

  /**
   * 确认事件
   */
  @Event({ eventName: 'fs-dialog-confirm' })
  dialogConfirm: EventEmitter<void>;

  /**
   * 取消事件
   */
  @Event({ eventName: 'fs-dialog-cancel' })
  dialogCancel: EventEmitter<void>;

  /**
   * 关闭事件（包含关闭原因）
   */
  @Event({ eventName: 'fs-dialog-close' })
  dialogClose: EventEmitter<{ reason: 'confirm' | 'cancel' | 'close' | 'mask' | 'esc' }>;

  private closeTimer?: number;
  private readonly motionDuration = 200;
  @State() private closing = false;
  private lastActiveEl?: HTMLElement | null;
  private panelEl?: HTMLDivElement;

  disconnectedCallback() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = undefined;
    }
  }

  /**
   * 统一关闭入口
   */
  private close(reason: 'confirm' | 'cancel' | 'close' | 'mask' | 'esc') {
    if (this.closing || !this.open) return;
    this.closing = true;
    this.open = false;
    if (typeof window === 'undefined') {
      this.dialogClose.emit({ reason });
      this.restoreFocus();
      this.closing = false;
      return;
    }
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = undefined;
    }
    this.closeTimer = window.setTimeout(() => {
      this.dialogClose.emit({ reason });
      this.restoreFocus();
      this.closing = false;
      this.closeTimer = undefined;
    }, this.motionDuration);
  }

  /**
   * 点击遮罩
   */
  private handleMaskClick = () => {
    if (!this.maskClosable) return;
    this.close('mask');
  };

  /**
   * 点击确认
   */
  private handleConfirm = () => {
    this.dialogConfirm.emit();
    this.close('confirm');
  };

  /**
   * 点击取消
   */
  private handleCancel = () => {
    this.dialogCancel.emit();
    this.close('cancel');
  };

  /**
   * 点击右上角关闭
   */
  private handleCloseClick = () => this.close('close');

  @Listen('keydown', { target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (!this.open || this.closing || !this.closeOnEsc) return;
    if (ev.key === 'Escape') this.close('esc');
  }

  @Watch('open')
  handleOpenChange(next: boolean) {
    if (next) {
      this.lastActiveEl = (typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null) || null;
      requestAnimationFrame(() => this.focusFirst());
    }
  }

  private focusFirst() {
    const root = this.el?.shadowRoot;
    if (!root) return;
    const target = root.querySelector<HTMLElement>(
      '.fs-dialog__close, .fs-dialog__btn--confirm, .fs-dialog__btn--cancel, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (target) target.focus();
    else this.panelEl?.focus();
  }

  private restoreFocus() {
    if (this.lastActiveEl && typeof this.lastActiveEl.focus === 'function') {
      this.lastActiveEl.focus();
    }
    this.lastActiveEl = null;
  }

  /**
   * 命令式关闭
   */
  @Method()
  async dismiss() {
    this.close('close');
  }

  render() {
    return (
      <Host class={{ 'fs-dialog': true, 'fs-dialog--closing': this.closing }} aria-hidden={this.open ? 'false' : 'true'}>
        <div class="fs-dialog__mask" onClick={this.handleMaskClick}></div>
        <div class="fs-dialog__panel" role="dialog" aria-modal="true" tabIndex={-1} ref={el => (this.panelEl = el as HTMLDivElement)}>
          <div class="fs-dialog__header">
            <div class="fs-dialog__title">
              {/* TODO 这里也加个插槽 */}
              {this.title}
            </div>
            {this.closable ? (
              <fs-button class="fs-dialog__close" type="flat" onClick={this.handleCloseClick} aria-label="关闭">
                ×
              </fs-button>
            ) : null}
          </div>
          <div class="fs-dialog__body">
            <slot>{this.content}</slot>
          </div>
          <div class="fs-dialog__footer">
            {/* TODO 这里也加个插槽 */}
            {this.showCancel ? (
              <fs-button class="fs-dialog__btn fs-dialog__btn--cancel" onClick={this.handleCancel}>
                {this.cancelText}
              </fs-button>
            ) : null}
            <fs-button class="fs-dialog__btn fs-dialog__btn--confirm" type="primary" onClick={this.handleConfirm}>
              {this.confirmText}
            </fs-button>
          </div>
        </div>
      </Host>
    );
  }
}
