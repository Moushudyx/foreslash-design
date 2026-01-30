import { isNil } from 'foreslash'
import {
  _createContext,
  Context,
  ContextCallback,
  ContextRequestEvent,
  ContextType,
  ContextUnsubscribeEvent,
  UnknownContext,
} from './context';

export * from './context';
/**
 * 这个订阅中心不是单例模式, 每种上下文都有一个订阅中心\
 * 思路
 * 1. 设置一个订阅发布中心，子组件（Consumer）按需订阅
 * 2. 子组件挂载时/订阅中心触发“获取父组件”事件时，找到最近的父组件（Provider），获取其上下文，并订阅“更改上下文”的事件（相当于绑定最近的父组件）
 * 3. 父组件挂载/卸载时触发“获取父组件”事件，让子组件重新寻找自己的父组件（解绑和重新绑定），如果发现父组件有变更则重新获取上下文（在组件很多的页面上可能导致性能问题）
 * 4. 父组件订阅更上一级的“更改上下文”的事件，事件发生时更改自己的上下文同时发布“更改上下文”事件（向更下一级传递）
 * 5. 父组件订阅“提交上下文”事件，此事件由子组件发布（比如单选组下面可能有多个单选框，单选框在用户点击时会向单选组发布更新），事件发生时更改父组件的上下文同时发布“更改上下文”事件
 * 实现
 * 1. 子组件挂载时触发 context-request 事件, 在冒泡阶段由父组件捕获并阻止继续冒泡
 *     1. 子组件卸载时触发 context-unsubscribe 事件, 取消订阅, 在冒泡阶段由父组件捕获, 为防止可能的内存泄漏, 不阻止继续冒泡
 * 2. 对于父组件可能卸载/中间插入一个新的父组件的情况, 子组件需要重新订阅
 *     1. 父组件卸载的情况: 根据记录的子组件列表, 取消订阅, 每个子组件重新触发 context-request 事件
 *     2. 中间插入一个新的父组件的情况: 新的父组件触发 context-request 事件, 获取更上一级的父组件, 获取其原有的子组件列表, 取消订阅, 每个子组件重新触发 context-request 事件
 * 3. 对于一开始没有父组件的情况, 在 body 上监听 context-request 事件, 防止子组件没有绑定任何父组件
 */
export class ContextSubscriptionCenter<T extends UnknownContext> {
  private context: T;
  public defaultValue: ContextType<T>;
  constructor(context: T, defaultValue: ContextType<T>) {
    this.context = context;
    this.defaultValue = defaultValue;
    if (!isNil(globalThis.document) && document.body) {
      // 对于一开始没有父组件的情况, 在 body 上监听 context-request 事件, 防止子组件没有绑定任何父组件
      document.body.addEventListener('context-request', (event) => {
        if (event.context === this.context) {
          if (event.subscribe) this.handleContextRequestEvent(event as ContextRequestEvent<T>, document.body);
          // 中间插入一个新的父组件的情况
          if (event.provider && !event.resubscribe) {
            this.handleContextProviderUnmountEvent(document.body);
          }
          (event as ContextRequestEvent<typeof context>).callback(defaultValue, () => {
            this.handleContextUnsubscribeEvent(
              (event as ContextRequestEvent<typeof context>).targetElement,
              document.body
            );
          });
        }
      });
      document.body.addEventListener('context-unsubscribe', (event) => {
        if (event.context === this.context) {
          this.handleContextUnsubscribeEvent((event as ContextUnsubscribeEvent<T>).targetElement, document.body);
        }
      });
    }
    // provide({ content: { el: document.body }, context: this.context, getContextValue: () => this.defaultValue });
  }
  /** 记录父组件 - 子组件的对应关系 */
  private contextSubscribeMap: WeakMap<
    HTMLElement,
    Array<{ targetElement: HTMLElement; callback: ContextCallback<ContextType<T>>, provider: boolean }>
  > = new WeakMap();
  /** 父组件捕获 `context-request` 事件 */
  public handleContextRequestEvent(event: ContextRequestEvent<T>, providerElement: HTMLElement) {
    const { targetElement, callback, subscribe } = event;
    if (!this.contextSubscribeMap.has(providerElement)) {
      this.contextSubscribeMap.set(providerElement, []);
    }
    if (subscribe) {
      const subscribeList = this.contextSubscribeMap.get(providerElement)!;
      // 防止重复添加, 如果已有则更新
      const index = subscribeList.findIndex((item) => item.targetElement === targetElement);
      if (index === -1) subscribeList.push({ targetElement, callback, provider: !!(event.provider) });
      else {
        subscribeList[index].callback = callback;
      }
    }
  }
  /** 父组件触发上下文更新事件 */
  public handleContextUpdateEvent(context: ContextType<T>, providerElement: HTMLElement) {
    const subscribeList = this.contextSubscribeMap.get(providerElement);
    if (subscribeList) {
      subscribeList.forEach((item) =>
        item.callback(context, () => {
          this.handleContextUnsubscribeEvent(item.targetElement, providerElement);
        })
      );
    }
  }
  /** 子组件取消订阅事件 */
  public handleContextUnsubscribeEvent(targetElement: HTMLElement, providerElement: HTMLElement) {
    const subscribeList = this.contextSubscribeMap.get(providerElement);
    if (subscribeList) {
      this.contextSubscribeMap.set(
        providerElement,
        subscribeList.filter((item) => item.targetElement !== targetElement)
      );
    }
  }
  /** 父组件卸载/中间插入一个新的父组件时调用 */
  public handleContextProviderUnmountEvent(providerElement: HTMLElement) {
    const subscribeList = this.contextSubscribeMap.get(providerElement);
    // this.contextSubscribeMap.delete(providerElement);
    this.contextSubscribeMap.set(providerElement, []);
    if (subscribeList) {
      subscribeList.forEach((item) => this.handleContextResubscribeEvent(item.targetElement, item.callback, item.provider));
    }
  }
  /** 子组件重新订阅事件, 重新触发 context-request 事件 */
  public handleContextResubscribeEvent(targetElement: HTMLElement, callback: ContextCallback<ContextType<T>>, provider: boolean) {
    const event = new ContextRequestEvent(this.context, targetElement, callback, true, provider, true);
    targetElement.dispatchEvent(event);
  }
}
const contextCenter: Map<UnknownContext, ContextSubscriptionCenter<UnknownContext>> = new Map();
/**
 * 创建一个上下文
 * @param contextKey 上下文键
 * @param defaultValue 默认值
 * @returns 上下文
 */
export function createContext<ValueType>(
  contextKey: unknown,
  defaultValue: ValueType
): Context<typeof contextKey, ValueType> {
  const context = _createContext<ValueType>(contextKey) as Context<typeof contextKey, ValueType>;
  if (!contextCenter.has(context)) {
    const center = new ContextSubscriptionCenter(context, defaultValue);
    contextCenter.set(context, center);
  }
  return context;
}
/**
 * 提供一个上下文
 * - 需要在组件中添加 `@Element() el: HTMLElement;
 * @param context 上下文
 * @param getContextValue 获取上下文值的函数
 * @param asConsumeCallback 如果传入该参数, 则在挂载时会自动向上寻找父组件并订阅, 用于实现嵌套上下文
 */
export function provide<KeyType, ValueType>(options: {
  content: { el: HTMLElement };
  context: Context<KeyType, ValueType>;
  getContextValue: () => ValueType;
  asConsumeCallback?: (value: ValueType) => any;
}): {
  /** 更新上下文 */
  updateContext(newContextValue?: ValueType): void;
  /** 卸载上下文 */
  unmountContext(): void;
} {
  const { content, context, getContextValue, asConsumeCallback } = options;
  const center = contextCenter.get(context) as ContextSubscriptionCenter<typeof context>;
  if (!center) throw new Error('上下文不存在');
  const { el } = content;
  // 监听 context-request 事件
  const onContextRequest = (event: ContextRequestEvent<any>) => {
    if (event.context === context && event.target !== el) {
      event.stopPropagation();
      if (event.subscribe) center.handleContextRequestEvent(event as ContextRequestEvent<typeof context>, el);
      // 中间插入一个新的父组件的情况
      if (event.provider && !event.resubscribe) {
        center.handleContextProviderUnmountEvent(el);
      }
      (event as ContextRequestEvent<typeof context>).callback(getContextValue() as ContextType<typeof context>, () => {
        center.handleContextUnsubscribeEvent((event as ContextRequestEvent<typeof context>).targetElement, el);
      });
    }
  };
  el.addEventListener('context-request', onContextRequest, { capture: false });
  // 监听 context-unsubscribe 事件
  const onContextUnsubscribe = (event: ContextUnsubscribeEvent<any>) => {
    if (event.context === context) {
      center.handleContextUnsubscribeEvent((event as ContextUnsubscribeEvent<typeof context>).targetElement, el);
    }
  };
  el.addEventListener('context-unsubscribe', onContextUnsubscribe, { capture: false });
  // 向上寻找父组件并订阅, 用于实现嵌套上下文
  if (asConsumeCallback) {
    el.dispatchEvent(new ContextRequestEvent(context, el, asConsumeCallback, true, true));
  }
  return {
    updateContext(newContextValue?: ValueType) {
      center.handleContextUpdateEvent((newContextValue ?? getContextValue()) as ContextType<typeof context>, el);
    },
    unmountContext() {
      el.removeEventListener('context-request', onContextRequest);
      el.removeEventListener('context-unsubscribe', onContextUnsubscribe);
      center.handleContextProviderUnmountEvent(el); // 父组件卸载时, 取消订阅
      if (asConsumeCallback) {
        el.dispatchEvent(new ContextUnsubscribeEvent(context, el));
      }
    },
  };
}
/**
 * 使用一个上下文, 并返回取消订阅函数
 * - 需要在组件中添加 `@Element() el: HTMLElement;
 * @param context 上下文
 * @param callback 回调函数
 * @param subscribe 是否订阅上下文更新事件
 * @returns 取消订阅函数
 */
export function consume<KeyType, ValueType>(options: {
  content: { el: HTMLElement };
  context: Context<KeyType, ValueType>;
  callback: (value: ValueType) => void;
  subscribe?: boolean;
}) {
  const { content, context, callback, subscribe } = options;
  const center = contextCenter.get(context) as ContextSubscriptionCenter<typeof context>;
  if (!center) throw new Error('上下文不存在');
  const { el } = content;
  el.dispatchEvent(new ContextRequestEvent(context, el, callback, subscribe, false));
  return () => {
    el.dispatchEvent(new ContextUnsubscribeEvent(context, el));
  };
}
