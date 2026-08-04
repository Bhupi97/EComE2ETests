import { Page, Locator } from "@playwright/test";

export class ContactUs {
    private readonly getInTouchHeader: Locator;
    private readonly name: Locator;
    private readonly email: Locator;
    private readonly subject: Locator;
    private readonly message: Locator;
    private readonly inputFile: Locator;
    private readonly submitBtn: Locator;
    private readonly successMsg: Locator;

    constructor(public readonly page: Page) {
        this.getInTouchHeader = page.locator(".contact-form").getByRole("heading", {level: 2});
        this.name = page.getByTestId("name");
        this.email = page.getByTestId("email");
        this.subject = page.getByTestId("subject");
        this.message = page.getByTestId("message");
        this.inputFile = page.locator('input[name="upload_file"]');
        this.submitBtn = page.getByTestId("submit-button");
        this.successMsg = page.locator('.status.alert-success');
    }

    public get getInTouchHeading(): Locator {
        return this.getInTouchHeader;
    }

    public get getSuccessMsg(): Locator {
        return this.successMsg.first();
    }

    public async fillName(name: string) {
        await this.name.fill(name);
    }

    public async fillEmail(email: string) {
        await this.email.fill(email);
    }

    public async fillSubject(subject: string) {
        await this.subject.fill(subject);
    }

    public async fillMessage(message: string) {
        await this.message.fill(message);
    }

    public async uploadFile(file: string) {
        await this.inputFile.setInputFiles(file);
    }

    public async clickSubmit() {
        await this.submitBtn.click();
    }

}