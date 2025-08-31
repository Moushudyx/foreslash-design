import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { getDefaultTheme, handleThemeColor, Theme, ThemeColor } from '../../context/theme';
import { deepMerge, fastClone } from 'foreslash';

@Component({
  tag: 'fs-theme-provider',
  styleUrl: 'fs-theme-provider.scss',
  shadow: false,
})
export class FsThemeProvider {
  @Prop()
  theme: Partial<Theme & { lightColor?: Partial<Theme['lightColor']>; darkColor?: Partial<Theme['darkColor']> }>;
  @State()
  private themeContext: Theme = getDefaultTheme();
  @State()
  private currentColorTheme: Required<ThemeColor>;
  private defaultTheme: Theme = getDefaultTheme();
  connectedCallback() {
    this.handleThemeChange();
  }
  @Watch('theme')
  handleThemeChange() {
    const tempTheme = fastClone(this.theme) || {};
    if (tempTheme.lightColor && tempTheme.lightColor.primaryColor) {
      tempTheme.lightColor = handleThemeColor(tempTheme.lightColor);
    }
    if (tempTheme.darkColor && tempTheme.darkColor.primaryColor) {
      tempTheme.darkColor = handleThemeColor(tempTheme.darkColor);
    }
    this.themeContext = deepMerge(this.defaultTheme, tempTheme);
    this.currentColorTheme = this.themeContext.theme === 'dark' ? this.themeContext.darkColor : this.themeContext.lightColor;
  }
  render() {
    return (
      <Host
        class={{
          'fs-theme-provider': true,
        }}
        style={{
          '--fs-color-primary': this.currentColorTheme.primaryColor,
          '--fs-color-primary-text': this.currentColorTheme.primaryButtonTextColor,
          '--fs-color-primary-hover': this.currentColorTheme.primaryColorLight,
          '--fs-color-primary-active': this.currentColorTheme.primaryColorDark,
          '--fs-color-bg': this.currentColorTheme.backgroundColor,
          '--fs-color-bg-sub': this.currentColorTheme.subBackgroundColor,
          '--fs-color-text': this.currentColorTheme.textColor,
          '--fs-color-text-sub': this.currentColorTheme.subTextColor,
          '--fs-radius': this.themeContext.borderRadius + 'px',
          '--fs-button-radius': this.themeContext.buttonRadius + 'px',
          '--fs-input-radius': this.themeContext.inputRadius + 'px',
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}
