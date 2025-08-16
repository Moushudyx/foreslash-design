import { newSpecPage } from '@stencil/core/testing';
import { FsInput } from '../fs-input';

describe('fs-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FsInput],
      html: `<fs-input></fs-input>`,
    });
    expect(page.root).toEqualHtml(`
      <fs-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fs-input>
    `);
  });
});
