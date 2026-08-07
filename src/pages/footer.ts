import { Locator, Page } from "@playwright/test";


export class Footer {
    private readonly subscriptionHead: Locator;
    private readonly subscriptionEmail: Locator;
    private readonly subscribeBtn: Locator;
    private readonly subscribeSuccessAlert: Locator;

    constructor(page: Page) {
        this.subscriptionHead = page.locator(".single-widget h2");
        this.subscriptionEmail = page.getByPlaceholder("Your email address");
        this.subscribeBtn = page.locator("#subscribe");
        this.subscribeSuccessAlert = page.locator(".alert.alert-success");
    }

    public get subscriptionHeading(): Locator {
        return this.subscriptionHead;
    }

    public async fillEmail(email: string): Promise<void> {
        await this.subscriptionEmail.fill(email);
    }

    public async clickSubscribe(): Promise<void> {
        await this.subscribeBtn.click()
    }

    public get subscribeAlert(): Locator {
        return this.subscribeSuccessAlert;
    }
}