import { newE2EPage } from '@stencil/core/testing';

describe('fs-dialog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fs-dialog></fs-dialog>');

    const element = await page.find('fs-dialog');
    expect(element).toHaveClass('hydrated');
  });
});
