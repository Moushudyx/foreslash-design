/**
 * 覆盖层类型
 * - toast: 顶部提示
 * - dialog: 弹窗
 */
export type OverlayType = 'toast' | 'dialog';

/**
 * 容器 -> 覆盖层根节点映射
 * 使用 WeakMap 避免容器被销毁后残留引用
 */
const overlayRoots: WeakMap<HTMLElement, Map<OverlayType, HTMLElement>> = new WeakMap();

/**
 * 解析挂载容器
 * - 支持传入 HTMLElement 或选择器
 * - SSR 环境返回 null
 */
export function resolveContainer(container?: HTMLElement | string): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  if (!container) return document.body;
  if (typeof container === 'string') {
    return document.querySelector(container) as HTMLElement | null;
  }
  return container;
}

/**
 * 确保非 body 容器具备定位上下文
 */
function ensureContainerPosition(containerEl: HTMLElement) {
  if (typeof window === 'undefined' || containerEl === document.body) return;
  const style = window.getComputedStyle(containerEl);
  if (style.position === 'static') {
    containerEl.style.position = 'relative';
  }
}

/**
 * 获取（或创建）覆盖层根节点
 * - toast 与 dialog 使用不同 root，避免样式和布局互相影响
 */
export function getOverlayRoot(type: OverlayType, container?: HTMLElement | string): HTMLElement | null {
  const containerEl = resolveContainer(container);
  if (!containerEl) return null;

  if (!overlayRoots.has(containerEl)) {
    overlayRoots.set(containerEl, new Map());
  }
  const map = overlayRoots.get(containerEl)!;
  if (map.has(type)) return map.get(type)!;

  ensureContainerPosition(containerEl);

  const root = document.createElement('div');
  root.className = `fs-overlay-root fs-overlay-root-${type}`;
  root.setAttribute('data-fs-overlay', type);

  root.style.position = containerEl === document.body ? 'fixed' : 'absolute';
  root.style.inset = '0';
  root.style.zIndex = type === 'dialog' ? '1000' : '1001';
  root.style.pointerEvents = 'none';

  if (type === 'toast') {
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.alignItems = 'center';
    root.style.gap = '8px';
    root.style.paddingTop = '16px';
  }

  if (type === 'dialog') {
    root.style.display = 'flex';
    root.style.alignItems = 'center';
    root.style.justifyContent = 'center';
  }

  containerEl.appendChild(root);
  map.set(type, root);
  return root;
}
