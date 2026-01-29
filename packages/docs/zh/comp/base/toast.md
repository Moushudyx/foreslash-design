# toast

用于展示全局消息提示，支持命令式调用与组件形式。

## 命令式调用

::: coder
```tsx
export default function () {
  const showToast = () => {
    // 字符串简写
    $msg.info('这是一条提示');
    // 详细配置
    $msg.success({
      message: '操作成功',
      duration: 3000,
      closable: true,
    });
  };

  return (
    <fs-button type="primary" onClick={showToast}>显示消息</fs-button>
  )
}
```
:::

## 组件用法

::: coder
```tsx
export default function () {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <fs-toast open type="info" message="信息提示" duration={0} />
      <fs-toast open type="success" message="成功提示" duration={0} />
      <fs-toast open type="warning" message="警告提示" duration={0} />
      <fs-toast open type="error" message="错误提示" duration={0} closable />
    </div>
  )
}
```
:::

## 参数

- `message`：提示内容（也可通过默认插槽传入）。
- `type`：提示类型，可选 `info | success | warning | error | default`。
- `duration`：自动关闭时间（毫秒），`0` 表示不自动关闭。
- `closable`：是否显示关闭按钮。
- `open`：是否显示。

## 事件

- `fs-toast-close`：关闭事件，包含 `reason`（`timeout | manual`）。
