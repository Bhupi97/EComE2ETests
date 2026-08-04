import { Locator, Page } from "@playwright/test";


export class TestCases {
    private readonly testCasesHeading: Locator;
    private readonly testCasesAll: Locator;

    constructor(public readonly page: Page) {
        this.testCasesHeading = page.locator('#form').getByRole("heading", {level: 2});
        this.testCasesAll = page.locator('.panel-title');
    }

    public get tcHeading(): Locator {
        return this.testCasesHeading;
    }
    public get tcAll(): Locator {
        return this.testCasesAll;
    }
}