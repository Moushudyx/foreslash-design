
<Coder code='export default function () {
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
}' />
