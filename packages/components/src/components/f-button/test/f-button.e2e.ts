import { newE2EPage } from '@stencil/core/testing';

describe('f-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<f-button></f-button>');

    const element = await page.find('f-button');
    expect(element).toHaveClass('hydrated');
  });
});
