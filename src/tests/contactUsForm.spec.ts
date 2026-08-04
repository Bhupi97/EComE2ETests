import path from "path";
import { test, expect } from "../fixtures/baseTest";
import contact from "../data/contactUsDemo.json";


test("TC6: Contact Us Form", async ({homePage, contactUsPage, page})=> {

    await test.step("Navigate to Landing Page", async () => {
            await homePage.gotoHome();
            await expect(homePage.logoAltText).toBeVisible(); 
        });

    await test.step("Click contact us and submit form", async () => {
        await homePage.clickContactUs();
        await expect(contactUsPage.getInTouchHeading).toHaveText("Get In Touch");
        await contactUsPage.fillName(contact.name);
        await contactUsPage.fillEmail(contact.email);
        await contactUsPage.fillSubject(contact.subject);
        await contactUsPage.fillMessage(contact.message);
        const filePath = path.join(__dirname, "../data/spidey.webp");
        await contactUsPage.uploadFile(filePath);
    });

    await test.step("Submit contact us form and handle dialog", async () => {
        page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
        await contactUsPage.clickSubmit();
        await expect(contactUsPage.getSuccessMsg).toBeVisible();
    });
})