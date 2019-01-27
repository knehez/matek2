import { Matek2Page } from './app.po';

describe('matek2 App', () => {
  let page: Matek2Page;

  beforeEach(() => {
    page = new Matek2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
