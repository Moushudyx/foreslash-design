import { newSpecPage } from '@stencil/core/testing';
import { FsDialog } from '../fs-dialog';

describe('fs-dialog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FsDialog],
      html: `<fs-dialog></fs-dialog>`,
    });
    expect(page.root).toEqualHtml(`
      <fs-dialog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fs-dialog>
    `);
  });
});
