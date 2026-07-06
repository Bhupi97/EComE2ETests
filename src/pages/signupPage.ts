import { Page, Locator } from "@playwright/test";

export class SignupPage {
    // Structural Grouping: Group variables cleanly to improve readability
    private readonly accountInfoHeading: Locator;
    private readonly name: Locator;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly dayDOB: Locator;
    private readonly monthDOB: Locator;
    private readonly yearDOB: Locator;
    private readonly newsletterCheckbox: Locator;
    private readonly specialOffersCheckbox: Locator;
    
    // Address Sub-section
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly company: Locator;
    private readonly address: Locator;
    private readonly countryDropDown: Locator;
    private readonly state: Locator;
    private readonly city: Locator;
    private readonly zipcode: Locator;
    private readonly mobileNo: Locator;
    private readonly createAccountBtn: Locator;

    constructor(public readonly page: Page) {
        // Casing Fix: Variable camelCase names should match standard conventions
        this.accountInfoHeading = page.locator('.login-form').getByRole('heading', { level: 2, name: 'Enter Account Information' });
        this.name = page.getByTestId("name");
        this.email = page.getByTestId("email");
        this.password = page.getByRole("textbox", { name: "password" });
        this.dayDOB = page.getByTestId("days");
        this.monthDOB = page.getByTestId("months");
        this.yearDOB = page.getByTestId("years");
        this.newsletterCheckbox = page.getByRole("checkbox", { name: "newsletter" });
        this.specialOffersCheckbox = page.getByLabel("Receive special offers from our partners!");
    
        this.firstName = page.getByRole("textbox", { name: "First name" });
        this.lastName = page.getByRole("textbox", { name: "Last name" });
        this.company = page.getByTestId("company");
        this.address = page.getByTestId("address");
        this.countryDropDown = page.getByTestId("country");
        this.state = page.getByRole("textbox", { name: "state" });
        this.city = page.getByTestId("city");
        this.zipcode = page.getByTestId("zipcode");
        this.mobileNo = page.getByTestId("mobile_number");
        this.createAccountBtn = page.getByRole("button", { name: "Create Account" });
    }

    // Exposing elements for verification states
    public get accountInfoHeader(): Locator { return this.accountInfoHeading; }
    public get nameField(): Locator { return this.name; }
    public get emailField(): Locator { return this.email; }

    // Component Interactions
    public async selectTitle(title: 'Mr.' | 'Mrs.'): Promise<void> {
        await this.page.getByRole("radio", { name: title }).check();
    }

    public async setDob(dob: Date): Promise<void> {
        await this.dayDOB.selectOption(dob.getDate().toString());
        await this.monthDOB.selectOption(dob.toLocaleString("en-US", { month: "long" }));
        await this.yearDOB.selectOption(dob.getFullYear().toString());
    }

    public async toggleCheckboxes(newsletter: boolean, specialOffers: boolean): Promise<void> {
    if (newsletter) {
        const isNewsletterChecked = await this.newsletterCheckbox.isChecked();
        if (!isNewsletterChecked) {
            await this.newsletterCheckbox.click();
        }
    }
    if (specialOffers) {
        const isSpecialOffersChecked = await this.specialOffersCheckbox.isChecked();
        if (!isSpecialOffersChecked) {
            await this.specialOffersCheckbox.click();
        }
    }
}

    // High-Level Composite Business Workflow
    public async completeRegistrationProfile(user: any, email: string): Promise<void> {
        // Step 1: Core Account Credentials
        await this.selectTitle(user.title);
        await this.password.fill(user.password);
        await this.setDob(new Date(user.dob));
        await this.toggleCheckboxes(user.newsletter, user.specialOffers);

        // Step 2: Customer Profile Demographics
        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.company.fill(user.company);
        await this.address.fill(user.address);
        await this.countryDropDown.selectOption(user.country);
        await this.state.fill(user.state);
        await this.city.fill(user.city);  
        await this.zipcode.fill(user.zipcode);
        await this.mobileNo.fill(user.mobileNumber);
        
        // Step 3: Submission Execution Handshake
        await this.createAccountBtn.click();
    }
}