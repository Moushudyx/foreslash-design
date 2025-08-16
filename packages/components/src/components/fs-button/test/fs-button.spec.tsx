import { newSpecPage } from '@stencil/core/testing';
import { FsButton } from '../fs-button';

describe('fs-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FsButton],
      html: `<fs-button></fs-button>`,
    });
    expect(page.root).toEqualHtml(`
      <fs-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fs-button>
    `);
  });
});
