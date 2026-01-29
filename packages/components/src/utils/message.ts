import type { ToastType } from '../components/fs-toast/fs-toast';
import { getOverlayRoot } from './overlay';

/**
 * Toast 配置
 */
export type ToastOptions = {
  message: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  container?: HTMLElement | string;
};

/**
 * Toast 句柄
 */
export type ToastHandle = {
  close: () => void;
  el?: HTMLElement;
};

/**
 * 规范化参数
 * - string 简写为 message
 * - 允许传入默认 type
 */
function normalizeOptions(options: ToastOptions | string, type?: ToastType): ToastOptions {
  if (typeof options === 'string') {
    return { message: options, type };
  }
  return { ...options, type: options.type ?? type };
}

/**
 * 创建并挂载 Toast 组件
 */
function createToast(options: ToastOptions): ToastHandle {
  if (typeof document === 'undefined') return { close: () => void 0 };
  const root = getOverlayRoot('toast', options.container);
  if (!root) return { close: () => void 0 };

  const el = document.createElement('fs-toast') as any;
  el.message = options.message;
  el.type = options.type ?? 'info';
  el.duration = options.duration ?? 2500;
  el.closable = options.closable ?? false;
  el.open = true;

  /**
   * 清理 DOM 与事件监听
   */
  const cleanup = () => {
    el.removeEventListener('fs-toast-close', onClose as EventListener);
    if (el.parentElement) el.parentElement.removeChild(el);
  };

  const onClose = () => cleanup();
  el.addEventListener('fs-toast-close', onClose as EventListener);

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
 * 命令式消息入口
 */
export const $msg = {
  show: (options: ToastOptions | string) => createToast(normalizeOptions(options)),
  info: (options: ToastOptions | string) => createToast(normalizeOptions(options, 'info')),
  warn: (options: ToastOptions | string) => createToast(normalizeOptions(options, 'warning')),
  success: (options: ToastOptions | string) => createToast(normalizeOptions(options, 'success')),
  error: (options: ToastOptions | string) => createToast(normalizeOptions(options, 'error')),
};
