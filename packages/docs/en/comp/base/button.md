# Button

::: coder
```tsx
export default function () {
	return (
		<>
			<style>
				{`.previewer .fs-button + fs-button { margin-left: 8px }`}
			</style>
			<p>
				<fs-button type="primary">Primary</fs-button>
				<fs-button type="primary" disabled>Disabled</fs-button>
				<fs-button type="primary" loading>Loading</fs-button>
			</p>
			<p>
				<fs-button>Default</fs-button>
				<fs-button disabled>Default</fs-button>
				<fs-button loading>Default</fs-button>
			</p>
			<p>
				<fs-button type="flat">Flat</fs-button>
				<fs-button type="flat" disabled>Flat</fs-button>
				<fs-button type="flat" loading>Flat</fs-button>
			</p>
			<p>
				<fs-button type="link">Link</fs-button>
				<fs-button type="link" disabled>Link</fs-button>
				<fs-button type="link" loading>Link</fs-button>
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
				<fs-button size="small" type="primary">Small</fs-button>
				<fs-button size="small">Small</fs-button>
				<fs-button size="small" type="flat">Small</fs-button>
				<fs-button size="small" type="link">Small</fs-button>
			</p>
			<p>
				<fs-button type="primary">Medium</fs-button>
				<fs-button>Medium</fs-button>
				<fs-button type="flat">Medium</fs-button>
				<fs-button type="link">Medium</fs-button>
			</p>
			<p>
				<fs-button size="large" type="primary">Large</fs-button>
				<fs-button size="large">Large</fs-button>
				<fs-button size="large" type="flat">Large</fs-button>
				<fs-button size="large" type="link">Large</fs-button>
			</p>
		</>
	)
}
```
:::

## Icon buttons

::: coder
```tsx
export default function () {
	return (
		<>
			<style>
				{`.previewer .fs-button + fs-button { margin-left: 8px }`}
			</style>
			<p>
				<fs-button type="primary">
					<span slot="icon">&#9733;</span>
					Icon button
				</fs-button>
				<fs-button type="primary" loading>
					<span slot="icon">&#9733;</span>
					Loading
				</fs-button>
				<fs-button type="link">
					<span slot="icon">&#10140;</span>
					Link button
				</fs-button>
			</p>
		</>
	)
}
```
:::
