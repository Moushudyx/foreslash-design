import { newE2EPage } from '@stencil/core/testing';

describe('fs-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fs-input></fs-input>');

    const element = await page.find('fs-input');
    expect(element).toHaveClass('hydrated');
  });
});
