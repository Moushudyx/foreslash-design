`fs-theme-provider` 组件利用 Context API 传递状态, 同时使用 CSS 变量来给子组件提供样式配置

基于 Context API 可以实现多层嵌套, 页面上的每个部分都可以根据自己的需求来配置主题

接收一个参数 `theme`, 类型为 `object`, 用于配置主题, 多层嵌套时, 子组件用深度合并来覆盖父组件的配置

`theme` 参数的类型定义如下:

```ts
type Theme = {
  theme: 'dark' | 'light';
  /** 亮色主题颜色 */
  lightColor: Required<ThemeColor>;
  /** 暗色主题颜色 */
  darkColor: Required<ThemeColor>;
  /** 圆角 */
  borderRadius: number;
  /** 按钮圆角 */
  buttonRadius: number;
  /** 输入框圆角 */
  inputRadius: number;
};
type ThemeColor = {
  /** 文本颜色 */
  textColor: string;
  /** 次文本颜色 */
  subTextColor: string;
  /** 背景颜色 */
  backgroundColor: string;
  /** 次背景颜色 */
  subBackgroundColor: string;
  /** 主要颜色 */
  primaryColor: string;
  /** 主要颜色浅色, 如果不写, 则直接使用 `primaryColor` */
  primaryColorLight?: string;
  /** 主要颜色深色, 如果不写, 则直接使用 `primaryColor` */
  primaryColorDark?: string;
  /** 主要颜色文本颜色, 如果不写, 则直接使用 `primaryColor` */
  primaryColorText?: string;
  /** 主要按钮文本颜色, 如果不写, 则直接使用 `textColor` */
  primaryButtonTextColor?: string;
};
```


::: coder
```tsx
export default function () {
  const theme1 = { // 紫罗兰/极客配色
    // theme: "dark", // 去掉注释, 它会覆盖从全局 fs-theme-provider 传下来的主题配置
    buttonRadius: 2,
    lightColor: {
      textColor: "#270036",
      subTextColor: "#42005d",
      backgroundColor: "#f4d9ff",
      subBackgroundColor: "#b9deff",
      primaryColor: "#7f00b3",
      primaryColorLight: "#a000e1",
      primaryColorDark: "#600087",
      primaryButtonTextColor: "#fbf3ff",
    },
    darkColor: {
      textColor: "#f3f5ff",
      subTextColor: "#d9dfff",
      backgroundColor: "#000836",
      subBackgroundColor: "#000e5d",
      primaryColor: "#0022e1",
      primaryColorLight: "#0f33ff",
      primaryColorDark: "#001bb3",
      primaryButtonTextColor: "#f3f5ff",
    }
  }
  const theme2 = { // 翡翠/青柠配色
    buttonRadius: 24,
    lightColor: {
      textColor: "#003625",
      subTextColor: "#005d3f",
      backgroundColor: "#f4d9ff",
      subBackgroundColor: "#b9deff",
      primaryColor: "#00b37a",
      primaryColorLight: "#00e199",
      primaryColorDark: "#00875c",
      primaryButtonTextColor: "#f3fffb",
    },
    darkColor: {
      textColor: "#fbfff2",
      subTextColor: "#f1ffd8",
      backgroundColor: "#1d2d00",
      subBackgroundColor: "#334f00",
      primaryColor: "#69a200",
      primaryColorLight: "#87d000",
      primaryColorDark: "#4d7700",
      primaryButtonTextColor: "#fbfff2",
    }
  }
  return (
    <fs-theme-provider theme={theme1}>
      <style>
        {`.fs-button + fs-button { margin-left: 8px }`}
      </style>
      <p>
        点击右上角的切换明暗主题按钮可以看到效果
      </p>
      <p>
        <fs-button type="primary">主要按钮</fs-button>
        <fs-button>默认按钮</fs-button>
        <fs-button type="flat">平面按钮</fs-button>
        <fs-button type="link">链接按钮</fs-button>
      </p>
      <fs-theme-provider theme={theme2}>
        <p>
          里层的 fs-theme-provider 会覆盖外层的
        </p>
        <p>
          <fs-button type="primary">主要按钮</fs-button>
          <fs-button>默认按钮</fs-button>
          <fs-button type="flat">平面按钮</fs-button>
          <fs-button type="link">链接按钮</fs-button>
        </p>
      </fs-theme-provider>
    </fs-theme-provider>
  )
}
```
:::
