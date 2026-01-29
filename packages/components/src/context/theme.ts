import { ContextType, createContext } from '@foreslash-ui/utils';

export type ThemeColor = {
  /** 文本颜色 */
  textColor: string;
  /** 次文本颜色 */
  subTextColor: string;
  /** 背景颜色 */
  backgroundColor: string;
  /** 次背景颜色 */
  subBackgroundColor: string;
  /** 部分组件的背景颜色, 如果不写, 则直接使用 `backgroundColor` */
  extraBackgroundColor?: string;
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
export type Theme = {
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
/**
 * 获取默认主题
 */
export function getDefaultTheme(): Theme {
  const defaultTheme: Theme = {
    theme: 'light',
    lightColor: handleThemeColor(getDefaultLightThemeColor()),
    darkColor: handleThemeColor(getDefaultDarkThemeColor()),
    borderRadius: 4,
    buttonRadius: 4,
    inputRadius: 4,
  };
  if (typeof window === 'undefined') {
    return defaultTheme;
  }
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDark) defaultTheme.theme = 'dark';
  return defaultTheme;
}
function getDefaultDarkThemeColor(): ThemeColor {
  return {
    textColor: '#f3f9ff',
    subTextColor: '#d9edff',
    backgroundColor: '#001d36',
    subBackgroundColor: '#00315d',
    extraBackgroundColor: '#001d36',
    primaryColor: '#0077e1',
    primaryColorLight: '#0f8eff',
    primaryColorDark: '#005fb3',
    primaryButtonTextColor: '#f3f9ff',
  };
}
function getDefaultLightThemeColor(): ThemeColor {
  return {
    textColor: '#001d36',
    subTextColor: '#00315d',
    backgroundColor: '#d9edff',
    subBackgroundColor: '#b9deff',
    extraBackgroundColor: '#ffffff',
    primaryColor: '#005fb3',
    primaryColorLight: '#0077e1',
    primaryColorDark: '#004787',
    primaryButtonTextColor: '#f3f9ff',
  };
}
/**
 * 处理主题颜色, 确保所有颜色都有值
 * @param color 主题颜色
 * @returns 处理后的主题颜色
 */
export function handleThemeColor(color: ThemeColor): Required<ThemeColor> {
  return {
    ...color,
    extraBackgroundColor: color.extraBackgroundColor ?? color.backgroundColor,
    primaryColorLight: color.primaryColorLight ?? color.primaryColor,
    primaryColorDark: color.primaryColorDark ?? color.primaryColor,
    primaryColorText: color.primaryColorText ?? color.primaryColor,
    primaryButtonTextColor: color.primaryButtonTextColor ?? color.textColor,
  };
}
/**
 * 主题上下文
 */
export const themeContext = createContext<Theme>('themeContext', getDefaultTheme());
/**
 * 主题上下文类型
 */
export type ThemeContext = ContextType<typeof themeContext>;
