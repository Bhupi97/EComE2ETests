
import { Page, Locator } from "@playwright/test";

export class SignUpLoginPage {
    private readonly loginEmail: Locator;
    private readonly loginPassword: Locator;
    private readonly signupName: Locator;
    private readonly signupEmail: Locator;
    private readonly signupButton: Locator;
    private readonly signupHeading: Locator;


    constructor(public readonly page: Page) {
        this.signupName = page.getByRole("textbox", {name: "name"});
        this.signupEmail = page.getByTestId("signup-email");
        this.signupButton = page.getByRole("button", {name: "Signup"});
        this.loginEmail = page.getByTestId("login-email");
        this.signupHeading = page.locator('.signup-form').getByRole('heading', { level: 2 });
    }

    public get signupFormHeading(): Locator {
        return this.signupHeading;
    }
    public async fillSignUpEmail(email: string) { 
        await this.signupEmail.fill(email);
    }

    public async fillName(name: string) {
        await this.signupName.fill(name);
    }

    public async clickSignup() {
        await this.signupButton.click();
    }
}