import { newSpecPage } from '@stencil/core/testing';
import { FsToast } from '../fs-toast';

describe('fs-toast', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FsToast],
      html: `<fs-toast></fs-toast>`,
    });
    expect(page.root).toEqualHtml(`
      <fs-toast>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fs-toast>
    `);
  });
});
