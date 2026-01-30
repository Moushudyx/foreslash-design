# fs-toast



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description            | Type                                                       | Default  |
| ---------- | ---------- | ---------------------- | ---------------------------------------------------------- | -------- |
| `closable` | `closable` | 是否展示关闭按钮               | `boolean`                                                  | `false`  |
| `duration` | `duration` | 自动关闭时间（毫秒），0 表示不自动关闭   | `number`                                                   | `2500`   |
| `message`  | `message`  | 提示内容（默认渲染为 slot 的回退内容） | `string`                                                   | `''`     |
| `open`     | `open`     | 是否显示                   | `boolean`                                                  | `false`  |
| `type`     | `type`     | 提示类型                   | `"default" \| "error" \| "info" \| "success" \| "warning"` | `'info'` |


## Events

| Event   | Description  | Type                                              |
| ------- | ------------ | ------------------------------------------------- |
| `close` | 关闭事件（包含关闭原因） | `CustomEvent<{ reason: "timeout" \| "manual"; }>` |


## Methods

### `dismiss() => Promise<void>`

命令式关闭

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
