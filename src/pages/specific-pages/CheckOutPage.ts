import { GeneralPage } from '../layouts/GeneralPage';
import { logger } from '../../helpers/logger-helper';
import { Locator } from '@playwright/test';
import * as fs from 'fs';

export class CheckOutPage extends GeneralPage {
    private readonly billingForm = {
        firstName: this.page.getByRole('textbox', { name: 'First Name *' }),
        lastName: this.page.getByRole('textbox', { name: 'Last Name *' }),
        companyName: this.page.getByRole('textbox', { name: 'Company Name' }),
        emailAddress: this.page.getByRole('textbox', { name: 'Email Address *' }),
        phoneNumber: this.page.getByRole('textbox', { name: 'Phone *' }),
        /*this does not work with selectOption - Wordaround applied
        countryCbb: this.page.locator('//select[@name="billing_country"]'), */
        countryField: this.page.locator('//div[@id="s2id_billing_country"]'),
        streetAddress: this.page.getByRole('textbox', { name: 'Address *', exact: true }),
        postCode: this.page.getByRole('textbox', { name: 'Postcode / ZIP' }),
        city: this.page.getByRole('textbox', { name: 'Town / City *' }),
    }
    private paymentSelection = (payment: string) => this.page.locator(`//input[@type="radio"]/following-sibling::label[normalize-space(text())="${payment}"]`);
    private readonly placeOrderButton = this.page.getByRole('button', { name: 'Place order' });
    private readonly countrySearchInput = this.page.locator('//label[.="Country *"]/following-sibling::input[contains(@id,"search")]');
    private billingDate = this.page.locator('//li[@class="date"]');

    public async fillBillingDetails(jsonPath: string) {
        logger.info(`Reading billing info from JSON: ${jsonPath}`);
        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        const data = JSON.parse(rawData);

        const fieldMap: Record<string, Locator> = {
            firstName: this.billingForm.firstName,
            lastName: this.billingForm.lastName,
            companyName: this.billingForm.companyName,
            emailAddress: this.billingForm.emailAddress,
            phoneNumber: this.billingForm.phoneNumber,
            country: this.billingForm.countryField,
            streetAddress: this.billingForm.streetAddress,
            postCode: this.billingForm.postCode,
            city: this.billingForm.city,
        };

        for (const [key, field] of Object.entries(fieldMap)) {
            const value = data[key];
            if (!value) continue;

            if (key === 'country') {
                await field.click();
                await this.countrySearchInput.fill(value);
                await this.countrySearchInput.press('Enter');

            } else {
                await field.fill(value);
            }
        }

        logger.info('Billing details filled successfully.');
    }

    public async selectPaymentMethod(method: string) {
        await this.paymentSelection(method).check();
        logger.info(`Payment method selected: ${method}`);
    }

    public async clickPlaceOrder() {
        await this.placeOrderButton.click();
        logger.info('Clicked Place Order button.');
    }

    public async placeAnOrder(dataPath: string, paymentMethod: string) {
        await this.fillBillingDetails(dataPath);
        await this.selectPaymentMethod(paymentMethod);
        await this.clickPlaceOrder();
    }

    public async getOrderDate(): Promise<string> {
        return await this.billingDate.textContent() ?? '';
    }

}