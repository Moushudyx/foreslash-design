import { getOverlayRoot } from './overlay';

/**
 * Dialog 配置
 */
export type DialogOptions = {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  maskClosable?: boolean;
  closeOnEsc?: boolean;
  container?: HTMLElement | string;
  /** 点击确认 */
  onConfirm?: () => void;
  /** 点击取消 */
  onCancel?: () => void;
  /** 关闭（遮罩、关闭按钮、ESC 等） */
  onClose?: () => void;
};

/**
 * Dialog 句柄
 */
export type DialogHandle = {
  close: () => void;
  el?: HTMLElement;
};

/**
 * 创建并挂载 Dialog 组件
 */
function createDialog(options: DialogOptions): DialogHandle {
  if (typeof document === 'undefined') return { close: () => void 0 };
  const root = getOverlayRoot('dialog', options.container);
  if (!root) return { close: () => void 0 };

  const el = document.createElement('fs-dialog') as any;
  el.title = options.title ?? '';
  el.content = options.content ?? '';
  el.confirmText = options.confirmText ?? '确认';
  el.cancelText = options.cancelText ?? '取消';
  el.showCancel = options.showCancel ?? true;
  el.maskClosable = options.maskClosable ?? true;
  el.closeOnEsc = options.closeOnEsc ?? true;
  el.open = true;

  let closed = false;
  /**
   * 清理 DOM 与事件监听
   */
  const cleanup = () => {
    if (closed) return;
    closed = true;
    el.removeEventListener('fs-dialog-confirm', onConfirm as EventListener);
    el.removeEventListener('fs-dialog-cancel', onCancel as EventListener);
    el.removeEventListener('fs-dialog-close', onClose as EventListener);
    if (el.parentElement) el.parentElement.removeChild(el);
  };

  const onConfirm = () => {
    options.onConfirm?.();
  };
  const onCancel = () => {
    options.onCancel?.();
  };
  const onClose = (ev: Event) => {
    const detail = (ev as CustomEvent<{ reason?: 'confirm' | 'cancel' | 'close' | 'mask' | 'esc' }>).detail;
    if (detail?.reason === 'close' || detail?.reason === 'mask' || detail?.reason === 'esc') {
      options.onClose?.();
    }
    cleanup();
  };

  el.addEventListener('fs-dialog-confirm', onConfirm as EventListener);
  el.addEventListener('fs-dialog-cancel', onCancel as EventListener);
  el.addEventListener('fs-dialog-close', onClose as EventListener);

  root.appendChild(el);

  return {
    el,
    close: () => {
      if (typeof el.dismiss === 'function') el.dismiss();
      else cleanup();
    },
  };
}

/**
 * 命令式弹窗入口
 */
export const $dialog = {
  show: (options: DialogOptions) => createDialog(options),
  confirm: (options: DialogOptions) =>
    new Promise<boolean>(resolve => {
      createDialog({
        ...options,
        showCancel: options.showCancel ?? true,
        onConfirm: () => {
          options.onConfirm?.();
          resolve(true);
        },
        onCancel: () => {
          options.onCancel?.();
          resolve(false);
        },
        onClose: () => {
          options.onClose?.();
          resolve(false);
        },
      });
    }),
};
