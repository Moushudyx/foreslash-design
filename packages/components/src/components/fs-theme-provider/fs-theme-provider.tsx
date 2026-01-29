import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { generateCssVars, getDefaultTheme, handleThemeColor, Theme, themeContext } from '../../context/theme';
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
  @Element() el: HTMLElement;

  connectedCallback() {
    this.handleThemeChange();
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
    this.updateContext();
  }
  render() {
    return (
      <Host
        class={{
          'fs-theme-provider': true,
        }}
        style={generateCssVars(this.themeContext)}
      >
        <slot></slot>
      </Host>
    );
  }
}
