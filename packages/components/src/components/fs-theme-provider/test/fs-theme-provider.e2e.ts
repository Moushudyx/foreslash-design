import { newE2EPage } from '@stencil/core/testing';

describe('fs-theme-provider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fs-theme-provider></fs-theme-provider>');

    const element = await page.find('fs-theme-provider');
    expect(element).toHaveClass('hydrated');
  });
});
