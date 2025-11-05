import { GeneralPage } from '../../pages/layouts/GeneralPage';

export class HomePage extends GeneralPage {
  private readonly searchInput = this.page.locator('input[name="q"]');
  private readonly searchButton = this.page.locator('button[type="submit"]');
  private readonly header = this.page.locator('h1');

  public async search(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  public async getHeaderText(): Promise<string> {
    return (await this.header.textContent()) ?? '';
  }
}
