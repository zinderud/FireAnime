import { FireAnimePage } from './app.po';

describe('fire-anime App', () => {
  let page: FireAnimePage;

  beforeEach(() => {
    page = new FireAnimePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
