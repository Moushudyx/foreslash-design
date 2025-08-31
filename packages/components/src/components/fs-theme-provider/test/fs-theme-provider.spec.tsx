import { newSpecPage } from '@stencil/core/testing';
import { FsThemeProvider } from '../fs-theme-provider';

describe('fs-theme-provider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FsThemeProvider],
      html: `<fs-theme-provider></fs-theme-provider>`,
    });
    expect(page.root).toEqualHtml(`
      <fs-theme-provider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fs-theme-provider>
    `);
  });
});
