import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { getDefaultTheme, handleThemeColor, Theme, ThemeColor, themeContext } from '../../context/theme';
import { deepMerge, fastClone, noop } from 'foreslash';
import { Element } from '@stencil/core';
import { provide } from '@foreslash-ui/utils';

@Component({
  tag: 'fs-theme-provider',
  styleUrl: 'fs-theme-provider.scss',
  shadow: false,
})
export class FsThemeProvider {
  @Prop()
  theme: Partial<Theme & { lightColor?: Partial<Theme['lightColor']>; darkColor?: Partial<Theme['darkColor']> }>;
  @State()
  private parentTheme: Theme | null = null;
  @State()
  private themeContext: Theme = getDefaultTheme();
  @State()
  private currentColorTheme: Required<ThemeColor> = {} as any;
  @Element() el: HTMLElement;

  connectedCallback() {
    this.handleThemeChange();
    this.setCurrentColorTheme();
    const { updateContext, unmountContext } = provide({
      content: this,
      context: themeContext,
      getContextValue: () => this.themeContext,
      asConsumeCallback: parentTheme => {
        this.parentTheme = parentTheme;
      },
    });
    this.updateContext = updateContext;
    this.unmountContext = unmountContext;
  }
  disconnectedCallback() {
    this.unmountContext();
  }
  updateContext: (newContextValue?: Theme) => void = noop;
  unmountContext: () => void = noop;
  @Watch('theme')
  @Watch('parentTheme')
  handleThemeChange() {
    const tempTheme = fastClone(this.theme) || {};
    if (tempTheme.lightColor && tempTheme.lightColor.primaryColor) {
      tempTheme.lightColor = handleThemeColor(tempTheme.lightColor);
    }
    this.themeContext = deepMerge(this.parentTheme || getDefaultTheme(), tempTheme);
    this.setCurrentColorTheme();
    this.updateContext();
  }
  setCurrentColorTheme() {
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
