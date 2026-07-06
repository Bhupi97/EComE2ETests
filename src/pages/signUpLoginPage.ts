
import { Page, Locator } from "@playwright/test";

export class SignUpLoginPage {
    private readonly loginEmail: Locator;
    private readonly loginPassword: Locator;
    private readonly signupName: Locator;
    private readonly signupEmail: Locator;
    private readonly signupButton: Locator;
    private readonly signupHeading: Locator;
    private readonly loginHeading: Locator;
    private readonly loginButton: Locator;
    private readonly errorMsg: Locator;

    constructor(public readonly page: Page) {
        this.signupName = page.getByRole("textbox", {name: "name"});
        this.signupEmail = page.getByTestId("signup-email");
        this.signupButton = page.getByRole("button", {name: "Signup"});
        this.loginEmail = page.getByTestId("login-email");
        this.signupHeading = page.locator('.signup-form').getByRole('heading', { level: 2 });
        this.loginHeading = page.locator('.login-form').getByRole('heading', { level: 2 });
        this.loginEmail = page.getByTestId("login-email");
        this.loginPassword = page.getByTestId("login-password");
        this.loginButton = page.getByTestId("login-button");
        this.errorMsg = page.locator('//*[@id="form"]//p');
    }

    public get errorMessage(): Locator {
        return this.errorMsg;
    }

    public get signupFormHeading(): Locator {
        return this.signupHeading;
    }
    public async fillSignUpEmail(email: string) { 
        await this.signupEmail.fill(email);
    }
    public async fillLoginEmail(email: string) {
        await this.loginEmail.fill(email);
    }
    public async fillLoginPassword(password: string) {
        await this.loginPassword.fill(password);
    }
    public get signInFormHeading(): Locator {
        return this.loginHeading;
    }
    public async fillName(name: string) {
        await this.signupName.fill(name);
    }
    public async clickSignup() {
        await this.signupButton.click();
    }
    public async clickLogin() {
        await this.loginButton.click();
    }
}