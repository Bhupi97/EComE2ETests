import {test, expect} from "../fixtures/baseTest";
import testData from "../data/registerUser.json";

test("TC2: Login User with correct email and password", async ({homePage, signUpLoginPage, signupPage, accountProcessingPage})=> {

    const user = testData.validUser;
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

    await test.step("Enter user details and click login", async ()=> {
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible(); 
        await homePage.gotoSignupLogin();
        await expect(signUpLoginPage.signInFormHeading).toHaveText("Login to your account");
        await signUpLoginPage.fillLoginEmail(uniqueEmail);
        await signUpLoginPage.fillLoginPassword(user.password);
        await signUpLoginPage.clickLogin();
        await expect(homePage.loginStatus).toHaveText(` Logged in as ${user.name}`);
        await homePage.clickDeleteAccount();
        await expect(accountProcessingPage.accountDHeading).toHaveText("Account Deleted!");
    })

})