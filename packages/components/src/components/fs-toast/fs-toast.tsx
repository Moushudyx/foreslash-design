import { Component, Event, EventEmitter, Host, Method, Prop, Watch, h } from '@stencil/core';

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

@Component({
  tag: 'fs-toast',
  styleUrl: 'fs-toast.scss',
  shadow: true,
})
export class FsToast {
  /**
   * 是否显示
   */
  @Prop({ mutable: true, reflect: true })
  open = false;

  /**
   * 提示内容（默认渲染为 slot 的回退内容）
   */
  @Prop()
  message = '';

  /**
   * 提示类型
   */
  @Prop()
  type: ToastType = 'info';

  /**
   * 自动关闭时间（毫秒），0 表示不自动关闭
   */
  @Prop()
  duration = 2500;

  /**
   * 是否展示关闭按钮
   */
  @Prop()
  closable = false;

  /**
   * 关闭事件（包含关闭原因）
   */
  @Event({ eventName: 'fs-toast-close' })
  toastClose: EventEmitter<{ reason: 'timeout' | 'manual' }>;

  private timer?: number;

  componentDidLoad() {
    if (this.open) this.startTimer();
  }

  disconnectedCallback() {
    this.clearTimer();
  }

  @Watch('open')
  handleOpenChange(next: boolean) {
    if (next) this.startTimer();
    else this.clearTimer();
  }

  @Watch('duration')
  handleDurationChange() {
    if (this.open) this.startTimer();
  }

  /**
   * 启动自动关闭计时
   */
  private startTimer() {
    this.clearTimer();
    if (this.duration > 0 && typeof window !== 'undefined') {
      this.timer = window.setTimeout(() => this.close('timeout'), this.duration);
    }
  }

  /**
   * 清理计时器
   */
  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  /**
   * 关闭 toast 并派发事件
   */
  private close(reason: 'timeout' | 'manual') {
    if (!this.open) return;
    this.open = false;
    this.toastClose.emit({ reason });
  }

  /**
   * 点击关闭
   */
  private handleCloseClick = () => this.close('manual');

  /**
   * 命令式关闭
   */
  @Method()
  async dismiss() {
    this.close('manual');
  }

  render() {
    return (
      <Host
        class={{
          'fs-toast': true,
          'fs-toast--info': this.type === 'info',
          'fs-toast--success': this.type === 'success',
          'fs-toast--warning': this.type === 'warning',
          'fs-toast--error': this.type === 'error',
          'fs-toast--default': this.type === 'default',
        }}
        role="status"
        aria-live="polite"
        aria-hidden={this.open ? 'false' : 'true'}
      >
        <div class="fs-toast__body">
          <span class="fs-toast__dot" aria-hidden="true"></span>
          <div class="fs-toast__message">
            <slot>{this.message}</slot>
          </div>
          {this.closable ? (
            <button class="fs-toast__close" type="button" onClick={this.handleCloseClick} aria-label="关闭">
              ×
            </button>
          ) : null}
        </div>
      </Host>
    );
  }
}
