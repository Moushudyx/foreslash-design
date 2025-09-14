# button

<fs-button>默认按钮</fs-button>

::: coder
```tsx
export default function () {
  return (
    <>
      <style>
        {`.previewer .fs-button + fs-button { margin-left: 8px }`}
      </style>
      <p>
        <fs-button type="primary">主要按钮</fs-button>
        <fs-button type="primary" disabled>主要按钮</fs-button>
        <fs-button type="primary" loading>主要按钮</fs-button>
      </p>
      <p>
        <fs-button>默认按钮</fs-button>
        <fs-button disabled>默认按钮</fs-button>
        <fs-button loading>默认按钮</fs-button>
      </p>
      <p>
        <fs-button type="flat">平面按钮</fs-button>
        <fs-button type="flat" disabled>平面按钮</fs-button>
        <fs-button type="flat" loading>平面按钮</fs-button>
      </p>
      <p>
        <fs-button type="link">链接按钮</fs-button>
        <fs-button type="link" disabled>链接按钮</fs-button>
        <fs-button type="link" loading>链接按钮</fs-button>
      </p>
    </>
  )
}
```
:::
::: coder
```tsx
export default function () {
  return (
    <>
      <style>
        {`.previewer .fs-button + fs-button { margin-left: 8px }`}
      </style>
      <p>
        <fs-button size="small" type="primary">小型按钮</fs-button>
        <fs-button size="small">小型按钮</fs-button>
        <fs-button size="small" type="flat">小型按钮</fs-button>
        <fs-button size="small" type="link">小型按钮</fs-button>
      </p>
      <p>
        <fs-button type="primary">默认按钮</fs-button>
        <fs-button>默认按钮</fs-button>
        <fs-button type="flat">默认按钮</fs-button>
        <fs-button type="link">默认按钮</fs-button>
      </p>
      <p>
        <fs-button size="large" type="primary">大型按钮</fs-button>
        <fs-button size="large">大型按钮</fs-button>
        <fs-button size="large" type="flat">大型按钮</fs-button>
        <fs-button size="large" type="link">大型按钮</fs-button>
      </p>
    </>
  )
}
```
:::
