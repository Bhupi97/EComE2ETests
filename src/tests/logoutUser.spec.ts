import { test, expect } from "../fixtures/baseTest";
import userData from "../data/registerUser.json"

test("Test Case 4: Logout User", async ({homePage, signUpLoginPage, signupPage, accountProcessingPage})=> {
    const user = userData.validUser;
    const uniqueEmail = `test_${Date.now()}@example.com`;

    await test.step("Prerequisite Setup: Sign up a new user account", async ()=> {
        await homePage.gotoHome();
        await homePage.gotoSignupLogin();
        await signUpLoginPage.fillName(user.name);
        await signUpLoginPage.fillSignUpEmail(uniqueEmail); 
        await signUpLoginPage.clickSignup();
        await signupPage.completeRegistrationProfile(user, uniqueEmail);
        await accountProcessingPage.clickContinueBtn();
        await homePage.clickLogout();
    })

    await test.step("Login with correct credentials and logout", async ()=> {
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible(); 
        await homePage.gotoSignupLogin();
        await expect(signUpLoginPage.signInFormHeading).toHaveText("Login to your account");
        await signUpLoginPage.fillLoginEmail(uniqueEmail);
        await signUpLoginPage.fillLoginPassword(user.password);
        await signUpLoginPage.clickLogin();
        await expect(homePage.loginStatus).toHaveText(` Logged in as ${user.name}`);
        await homePage.clickLogout();
        await expect(signUpLoginPage.signInFormHeading).toHaveText("Login to your account");
    })

    await test.step("tearDown: Deleting user account", async ()=> {
        await signUpLoginPage.fillLoginEmail(uniqueEmail);
        await signUpLoginPage.fillLoginPassword(user.password);
        await signUpLoginPage.clickLogin();
        await homePage.clickDeleteAccount();
        await expect(accountProcessingPage.accountDHeading).toHaveText("Account Deleted!");
        await accountProcessingPage.clickContinueBtn();
     })


})