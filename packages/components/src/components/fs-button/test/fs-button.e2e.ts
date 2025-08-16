import { newE2EPage } from '@stencil/core/testing';

describe('fs-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fs-button></fs-button>');

    const element = await page.find('fs-button');
    expect(element).toHaveClass('hydrated');
  });
});
