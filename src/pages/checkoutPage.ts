import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
    private readonly deliveryAddressBlock: Locator;
    private readonly billingAddressBlock: Locator;
    private readonly orderCommentInput: Locator;
    private readonly placeOrderBtn: Locator;
    private readonly totalAmount: Locator;

    constructor(public readonly page: Page) {
        this.deliveryAddressBlock = page.locator('#address_delivery');
        this.billingAddressBlock = page.locator('#address_invoice');
        this.orderCommentInput = page.locator('textarea[name="message"]');
        this.placeOrderBtn = page.getByRole('link', { name: 'Place Order' });
        this.totalAmount = page.locator('.cart_total_price').last();
    }

    public get getDeliveryAddressLocator(): Locator {
        return this.deliveryAddressBlock;
    }

    public get getBillingAddressLocator(): Locator {
        return this.billingAddressBlock;
    }

    public get getTotalAmountLocator(): Locator {
        return this.totalAmount;
    }

    public async enterOrderComment(comment: string): Promise<void> {
        await this.orderCommentInput.fill(comment);
    }

    public async clickPlaceOrder(): Promise<void> {
        await this.placeOrderBtn.click();
    }
}