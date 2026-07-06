import {Page, Locator} from "@playwright/test";

export class SignupPage{
    private readonly radioMr: Locator;
    private readonly radioMrs: Locator;
    private readonly name: Locator;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly dayDOB: Locator;
    private readonly monthDOB: Locator;
    private readonly yearDOB: Locator;
    private readonly newsletterCheckbox: Locator;
    private readonly specialOffersCheckbox: Locator;
    //  Address Information
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly company: Locator;
    private readonly address: Locator;
    private readonly address2: Locator;
    private readonly countryDropDown: Locator;
    private readonly state: Locator;
    private readonly city: Locator;
    private readonly zipcode: Locator;
    private readonly mobileNo: Locator;
    private readonly createAccountBtn: Locator;
    private readonly AccountInfoHeading: Locator;

    constructor(public readonly page: Page) {
        // this.radioMr = page.getByRole("radio", {name: 'Mr.'});
        // this.radioMrs = page.getByRole("radio", {name: 'Mrs.'});
        // this.enterAccountInfoHeading = page.getByText("Enter Account Information");
        this.AccountInfoHeading = page.locator('.login-form').getByRole('heading', { level: 2, name: 'Enter Account Information' });
        this.name = page.getByTestId("name");
        this.email = page.getByTestId("email");
        this.password = page.getByRole("textbox", {name: "password"});
        this.dayDOB = page.getByTestId("days");
        this.monthDOB = page.getByTestId("months");
        this.yearDOB = page.getByTestId("years");
        this.newsletterCheckbox = page.getByRole("checkbox", {name: "newsletter"});
        this.specialOffersCheckbox = page.getByLabel("Receive special offers from our partners!");
    
        this.firstName = page.getByRole("textbox", {name: "First name"});
        this.lastName = page.getByRole("textbox", {name: "Last name"});
        this.company = page.getByTestId("company");
        this.address = page.getByTestId("address");
        this.address2 = page.getByTestId("address2");
        this.countryDropDown = page.getByTestId("country");
        this.state = page.getByRole("textbox", {name: "state"});
        this.city = page.getByTestId("city");
        this.zipcode = page.getByTestId("zipcode");
        this.mobileNo = page.getByTestId("mobile_number");
        this.createAccountBtn = page.getByRole("button", {name: "Create Account"});
    }

    public get accountInfoHeader(): Locator {
        return this.AccountInfoHeading;
    }
    public async selectTitle(title: 'Mr.'|'Mrs.'): Promise<void> {
        await this.page.getByRole("radio", {name: title}).check();
    }
    public get nameField(): Locator {
        return this.name;
    }
    public get emailField(): Locator {
        return this.email;
    }

    public async setPassword(pwd: string): Promise<void> {
        await this.password.fill(pwd);
    }

    public async setDob(dob: Date): Promise<void> {
        await this.dayDOB.selectOption(dob.getDate().toString());
        await this.monthDOB.selectOption(dob.toLocaleString("en-US", { month: "long" }));
        await this.yearDOB.selectOption(dob.getFullYear().toString());
    }

    public async signupNewsletter(snl: true|false): Promise<void> {
        if (snl) {
        await this.newsletterCheckbox.check({ force: true });
        }
    }
    public async receiveSplOffers(splOfrs: true|false): Promise<void> {
        if (splOfrs) {
            await this.specialOffersCheckbox.check({ force: true });
        }
    }

    public async setFirstName(fName: string): Promise<void> {
        await this.firstName.fill(fName);
    }

    public async setLastName(lName: string): Promise<void> {
        await this.lastName.fill(lName);
    }

    public async setCompany(cName: string): Promise<void> {
        await this.company.fill(cName);
    }

    public async setAddress(address: string): Promise<void> {
        await this.address.fill(address);
    }

    public async selectCountry(country: "India" | "United States" | "Canada" | "Australia" | "Israel" | "New Zealand" | "Singapore") : Promise<void> {
        await this.countryDropDown.selectOption(country);
    }

    public async setState(state: string): Promise<void> {
        await this.state.fill(state);
    }

    public async setCity(city: string): Promise<void> {
        await this.city.fill(city);
    }

    public async setZipCode(zipcode: string): Promise<void> {
        await this.zipcode.fill(zipcode);
    }

    public async setMobileNo(mobile: string): Promise<void> {
        await this.mobileNo.fill(mobile)
    }

    public async clickCreateAccountBtn() {
        await this.createAccountBtn.click();
    }


}