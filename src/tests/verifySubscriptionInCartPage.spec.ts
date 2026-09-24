import { test, expect } from "../fixtures/baseTest";
import userData from "../data/registerUser.json"


test("TC11: Verify Subscription in cart page", async ({homePage, footer}) => {
    const user = userData.validUser;

    await test.step("Navigate to Landing Page", async () => {
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible(); 
    });

    await test.step("Click cart and Scroll down to subscription and verify", async ()=> {
        await homePage.clickCartBtn();
        await footer.subscriptionHeading.scrollIntoViewIfNeeded();
        await expect(footer.subscriptionHeading).toHaveText("Subscription");
        await footer.fillEmail(user.email);
        await footer.clickSubscribe();
        await expect(footer.subscribeAlert).toHaveText("You have been successfully subscribed!");
    })

})