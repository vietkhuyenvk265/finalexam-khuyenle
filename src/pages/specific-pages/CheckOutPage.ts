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
        countryCbb: this.page.locator('//select[@id="billing_country"]'),
        streetAddress: this.page.getByRole('textbox', { name: 'Address *', exact: true }),
        postCode: this.page.getByRole('textbox', { name: 'Postcode / ZIP' }),
        city: this.page.getByRole('textbox', { name: 'Town / City *' }),
    }
    private paymentSelection = (payment: string) => this.page.locator(`//input[@type="radio"]/following-sibling::label[normalize-space(text())="${payment}"]`);
    private readonly placeOrderButton = this.page.getByRole('button', { name: 'Place order' });

    public async fillBillingDetails(jsonPath: string) {
        logger.info(`Reading billing info from JSON: ${jsonPath}`);
        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        const data = JSON.parse(rawData);

        const fieldMap: Record<string, Locator> = {
            firstName: this.billingForm.firstName,
            lastName: this.billingForm.lastName,
            company: this.billingForm.companyName,
            email: this.billingForm.emailAddress,
            phone: this.billingForm.phoneNumber,
            country: this.billingForm.countryCbb,
            address: this.billingForm.streetAddress,
            zipcode: this.billingForm.postCode,
            city: this.billingForm.city,
        };

        // for (const [key, field] of Object.entries(fieldMap)) {
        //     const value = data[key];
        //     if (!value) continue;

        //     if (key === 'country') {
        //         await field.click();
        //         await field.selectOption(value);
        //     } else {
        //         await field.fill(value);
        //     }
        // }
        if (data.firstName) await this.billingForm.firstName.fill(data.firstName);
        if (data.lastName) await this.billingForm.lastName.fill(data.lastName);
        if (data.company) await this.billingForm.companyName.fill(data.company);
        if (data.email) await this.billingForm.emailAddress.fill(data.email);
        if (data.phone) await this.billingForm.phoneNumber.fill(data.phone);
        // if (data.country) await this.billingForm.countryCbb.selectOption(data.country);
        if (data.address) await this.billingForm.streetAddress.fill(data.address);
        if (data.zipcode) await this.billingForm.postCode.fill(data.zipcode);
        if (data.city) await this.billingForm.city.fill(data.city);

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



}