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

    async navigateTo(url: string) {
        logger.info(`Navigating to URL: ${url}`);
        await this.page.goto(url);
    }

    async assertUrlContains(path: string) {
        logger.verify(`URL contains: ${path}`);
        await expect(this.page).toHaveURL(new RegExp(path));
    }
}