import { newSpecPage } from '@stencil/core/testing';
import { FButton } from '../f-button';

describe('f-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FButton],
      html: `<f-button></f-button>`,
    });
    expect(page.root).toEqualHtml(`
      <f-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </f-button>
    `);
  });
});
