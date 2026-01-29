# fs-dialog



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description          | Type      | Default |
| -------------- | --------------- | -------------------- | --------- | ------- |
| `cancelText`   | `cancel-text`   | 取消按钮文字               | `string`  | `'取消'`  |
| `closable`     | `closable`      | 是否显示右上角关闭按钮          | `boolean` | `true`  |
| `closeOnEsc`   | `close-on-esc`  | ESC 是否可关闭            | `boolean` | `true`  |
| `confirmText`  | `confirm-text`  | 确认按钮文字               | `string`  | `'确认'`  |
| `content`      | `content`       | 内容（默认渲染为 slot 的回退内容） | `string`  | `''`    |
| `maskClosable` | `mask-closable` | 点击遮罩是否关闭             | `boolean` | `true`  |
| `open`         | `open`          | 是否显示                 | `boolean` | `false` |
| `showCancel`   | `show-cancel`   | 是否显示取消按钮             | `boolean` | `true`  |
| `title`        | `title`         | 标题                   | `string`  | `''`    |


## Events

| Event               | Description  | Type                                                                            |
| ------------------- | ------------ | ------------------------------------------------------------------------------- |
| `fs-dialog-cancel`  | 取消事件         | `CustomEvent<void>`                                                             |
| `fs-dialog-close`   | 关闭事件（包含关闭原因） | `CustomEvent<{ reason: "mask" \| "close" \| "confirm" \| "cancel" \| "esc"; }>` |
| `fs-dialog-confirm` | 确认事件         | `CustomEvent<void>`                                                             |


## Methods

### `dismiss() => Promise<void>`

命令式关闭

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
