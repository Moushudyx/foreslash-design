# dialog

用于展示对话框，支持命令式调用与组件形式。

## 命令式调用

::: coder
```tsx
import { $dialog } from 'foreslash-ui/utils';

export default function () {
  const showDialog = async () => {
    const ok = await $dialog.confirm({
      title: '确认',
      content: '是否继续？',
    })

    $dialog.show({
      title: '提示',
      content: ok ? '这是一段提示信息' : '操作已取消',
      onConfirm: () => console.log('confirm'),
      onCancel: () => console.log('cancel'),
    })
  }

  return (
    <fs-button type="primary" onClick={showDialog}>显示弹窗</fs-button>
  )
}
```
:::

## 组件用法

::: coder
```tsx
import { reactive } from 'vue'

export default function () {
  const state = reactive({ open: false })
  return <>
    <fs-button onClick={() => { state.open = true }}>打开弹框</fs-button>
    <fs-dialog
      open={state.open}
      title="标题"
      content="这是弹窗内容"
      confirmText="确定"
      cancelText="取消"
      showCancel
      maskClosable
      closeOnEsc
      closable
    />
  </>
}
```
:::

## 参数

- `open`：是否显示。
- `title`：标题。
- `content`：内容（也可通过默认插槽传入）。
- `confirmText`：确认按钮文字。
- `cancelText`：取消按钮文字。
- `showCancel`：是否显示取消按钮。
- `maskClosable`：点击遮罩是否关闭。
- `closeOnEsc`：按 ESC 是否关闭。
- `closable`：是否显示右上角关闭按钮。

## 事件

- `confirm`：点击确认。
- `cancel`：点击取消。
- `close`：关闭事件，包含 `reason`（`confirm | cancel | close | mask | esc`）。
