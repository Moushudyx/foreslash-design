
<Coder code='export default function () {
  const theme1 = { // 紫罗兰/极客配色
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
      textColor: "#fbf3ff",
      subTextColor: "#f4d9ff",
      backgroundColor: "#270036",
      subBackgroundColor: "#42005d",
      primaryColor: "#a000e1",
      primaryColorLight: "#b90fff",
      primaryColorDark: "#7f00b3",
      primaryButtonTextColor: "#fbf3ff",
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
      textColor: "#f3fffb",
      subTextColor: "#d9fff3",
      backgroundColor: "#003625",
      subBackgroundColor: "#005d3f",
      primaryColor: "#00b37a",
      primaryColorLight: "#00e199",
      primaryColorDark: "#00875c",
      primaryButtonTextColor: "#f3fffb",
    }
  }
  return (
    <fs-theme-provider theme={theme1}>
      <style>
        {`.fs-button + fs-button { margin-left: 8px }`}
      </style>
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
}' />
