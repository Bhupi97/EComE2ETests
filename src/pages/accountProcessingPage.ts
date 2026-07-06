import { Page, Locator } from "@playwright/test";

export class AccountProcessingPage {
    private readonly accountCreatedHeading: Locator;
    private readonly continueBtn: Locator;
    private readonly accountDeletedHeading: Locator;


    constructor(public readonly page: Page) {
        this.accountCreatedHeading = page.getByTestId("account-created");
        this.accountDeletedHeading = page.getByTestId("account-deleted");
        this.continueBtn = page.getByTestId("continue-button");

    }

    public get accountCHeading(): Locator {
        return this.accountCreatedHeading;
    }

    public async clickContinueBtn(): Promise<void> {
        await this.continueBtn.click();
    }

    public get accountDHeading(): Locator {
        return this.accountDeletedHeading;
    }
}