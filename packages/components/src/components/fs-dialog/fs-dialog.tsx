import { Component, Event, EventEmitter, Host, Listen, Method, Prop, h } from '@stencil/core';

@Component({
  tag: 'fs-dialog',
  styleUrl: 'fs-dialog.scss',
  shadow: true,
})
export class FsDialog {
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

  /**
   * 统一关闭入口
   */
  private close(reason: 'confirm' | 'cancel' | 'close' | 'mask' | 'esc') {
    if (!this.open) return;
    this.open = false;
    this.dialogClose.emit({ reason });
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
    if (!this.open || !this.closeOnEsc) return;
    if (ev.key === 'Escape') this.close('esc');
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
      <Host class={{ 'fs-dialog': true }} aria-hidden={this.open ? 'false' : 'true'}>
        <div class="fs-dialog__mask" onClick={this.handleMaskClick}></div>
        <div class="fs-dialog__panel" role="dialog" aria-modal="true">
          <div class="fs-dialog__header">
            <div class="fs-dialog__title">
              {/* TODO 这里也加个插槽 */}
              {this.title}
            </div>
            {this.closable ? (
              <button class="fs-dialog__close" type="button" onClick={this.handleCloseClick} aria-label="关闭">
                ×
              </button>
            ) : null}
          </div>
          <div class="fs-dialog__body">
            <slot>{this.content}</slot>
          </div>
          <div class="fs-dialog__footer">
            {/* TODO 这里也加个插槽 */}
            {this.showCancel ? (
              <button class="fs-dialog__btn fs-dialog__btn--cancel" type="button" onClick={this.handleCancel}>
                {this.cancelText}
              </button>
            ) : null}
            <button class="fs-dialog__btn fs-dialog__btn--confirm" type="button" onClick={this.handleConfirm}>
              {this.confirmText}
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
