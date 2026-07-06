import {Page, Locator} from "@playwright/test";

export class HomePage {
    private readonly signUpLoginLink: Locator;
    private readonly homeLink: Locator;
    public readonly logoAltText: Locator;
    private readonly usernameDisplay: Locator;
    private readonly deleteAccount: Locator;

    constructor(public readonly page: Page) {
        this.signUpLoginLink = page.getByRole("link", {name: " Signup / Login"});
        this.homeLink = page.getByRole("link", {name: " Home"});
        this.logoAltText = page.getByAltText("Website for automation practice");
        this.usernameDisplay = page.getByText(/Logged in as/i);
        this.deleteAccount = page.getByRole("link", {name: " Delete Account"});
    }

    public async gotoHome() {
        await this.page.goto('/');
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


}