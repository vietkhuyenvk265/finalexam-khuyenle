import { Page, expect } from '@playwright/test';
import { logger } from '../../helpers/logger-helper';

export abstract class AbstractPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openAUT() {
        logger.info('Opening the AUT');
        await this.page.goto("/");
    }

    async assertUrlContains(query: string) {
        await expect(this.page).toHaveURL(new RegExp(`${query}(?:[&?][^#]*)?$`));
        logger.verify(`URL contains: ${query}`);
    }
}