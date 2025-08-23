# button

<fs-button>默认按钮</fs-button>

<!-- <Previewer code="export default function () {
  return (
    <>
      <fs-button>默认按钮1</fs-button>
      <fs-button>默认按钮2</fs-button>
    </>
  )
}" /> -->

<!-- ::: coder
```tsx
export default function () {
  return (
    <>
      <fs-button>默认按钮1</fs-button>
      <fs-button>默认按钮2</fs-button>
    </>
  )
}
```
::: -->
<Coder code='export default function () {
  return (
    <>
      <p>
        <fs-button type="primary">默认按钮</fs-button>
        <fs-button type="primary" disabled>默认按钮</fs-button>
        <fs-button type="primary" loading>默认按钮</fs-button>
      </p>
      <p>
        <fs-button>默认按钮</fs-button>
        <fs-button disabled>默认按钮</fs-button>
        <fs-button loading>默认按钮</fs-button>
      </p>
      <p>
        <fs-button type="flat">默认按钮</fs-button>
        <fs-button type="flat" disabled>默认按钮</fs-button>
        <fs-button type="flat" loading>默认按钮</fs-button>
      </p>
      <p>
        <fs-button type="link">默认按钮</fs-button>
        <fs-button type="link" disabled>默认按钮</fs-button>
        <fs-button type="link" loading>默认按钮</fs-button>
      </p>
    </>
  )
}' />
<Coder code='export default function () {
  return (
    <>
      <p>
        <fs-button size="small" type="primary">默认按钮</fs-button>
        <fs-button size="small">默认按钮</fs-button>
        <fs-button size="small" type="flat">默认按钮</fs-button>
        <fs-button size="small" type="link">默认按钮</fs-button>
      </p>
      <p>
        <fs-button type="primary">默认按钮</fs-button>
        <fs-button>默认按钮</fs-button>
        <fs-button type="flat">默认按钮</fs-button>
        <fs-button type="link">默认按钮</fs-button>
      </p>
      <p>
        <fs-button size="large" type="primary">默认按钮</fs-button>
        <fs-button size="large">默认按钮</fs-button>
        <fs-button size="large" type="flat">默认按钮</fs-button>
        <fs-button size="large" type="link">默认按钮</fs-button>
      </p>
    </>
  )
}' />
