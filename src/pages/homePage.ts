import {Page, Locator} from "@playwright/test";

export class HomePage {
    private readonly signUpLoginLink: Locator;
    private readonly homeLink: Locator;
    public readonly logoAltText: Locator;
    private readonly usernameDisplay: Locator;
    private readonly deleteAccount: Locator;
    private readonly logoutButton: Locator;
    private readonly contactUsButton: Locator;
    private readonly testCasesButton: Locator;
    private readonly products: Locator;

    constructor(public readonly page: Page) {
        this.signUpLoginLink = page.getByRole("link", {name: " Signup / Login"});
        this.homeLink = page.getByRole("link", {name: " Home"});
        this.logoAltText = page.getByAltText("Website for automation practice");
        this.usernameDisplay = page.getByText(/Logged in as/i);
        this.deleteAccount = page.getByRole("link", {name: " Delete Account"});
        this.logoutButton = page.getByRole("link", {name: " Logout"});
        this.contactUsButton = page.getByRole("link", {name: " Contact us"});
        this.testCasesButton = page.getByRole("link", {name: " Test Cases"}).first();
        this.products = page.getByRole("link", {name: " Products"});
    }

    public async gotoHome(): Promise<void>  {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    public async gotoProducts(): Promise<void> {
        await this.products.click();
    }

    public get loginStatus(): Locator {
        return this.usernameDisplay;
    }
    public async gotoSignupLogin(): Promise<void> {
        await this.signUpLoginLink.click();
    }

    public async clickDeleteAccount(): Promise<void> {
        await this.deleteAccount.click();
    }

    public async clickLogout(): Promise<void> {
        await this.logoutButton.click();
    }

    public async clickContactUs(): Promise<void> {
        await this.contactUsButton.click();
    }

    public async clickTestCases(): Promise<void> {
        await this.testCasesButton.click();
    }


}