import { newE2EPage } from '@stencil/core/testing';

describe('fs-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fs-toast></fs-toast>');

    const element = await page.find('fs-toast');
    expect(element).toHaveClass('hydrated');
  });
});
