# Foreslash UI 组件库

该组件库提供基于 Web Components 的通用 UI 组件与命令式工具函数。

## 使用方式

### 方式一：直接引入构建产物（懒加载）

```html
<script type="module" src="https://unpkg.com/foreslash-ui"></script>
```

### 方式二：在工程中按需引入

```tsx
import 'foreslash-ui'; // 全量引入
import { defineCustomElements } from 'foreslash-ui/loader'; // 在需要的位置运行此方法也相当于全量引入
```

### 命令式工具函数

```tsx
import { $msg, $dialog } from 'foreslash-ui/utils';

$msg.info('这是一条提示');

$dialog.show({
  title: '提示',
  content: '这是弹窗内容',
});
```