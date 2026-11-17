import { Page, Locator } from "@playwright/test";

export class PaymentPage {
    readonly page: Page;
    readonly nameOnCard: Locator;
    readonly cardNo: Locator;
    readonly cvc: Locator;
    readonly expirationMonth: Locator;
    readonly expirationYear: Locator;
    readonly payBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameOnCard = page.getByTestId('name-on-card');
        this.cardNo = page.getByTestId('card-number');
        this.cvc = page.getByTestId('cvc');
        this.expirationMonth = page.getByTestId('expiry-month');
        this.expirationYear = page.getByTestId('expiry-year');
        this.payBtn = page.getByTestId('pay-button');
    }

    async completePayment(card: { nameOnCard: string; cardNumber: string; cvc: string; expiryMonth: string; expiryYear: string }) {
        await this.nameOnCard.fill(card.nameOnCard);
        await this.cardNo.fill(card.cardNumber);
        await this.cvc.fill(card.cvc);
        await this.expirationMonth.fill(card.expiryMonth);
        await this.expirationYear.fill(card.expiryYear);
        await this.payBtn.click();
    }
}