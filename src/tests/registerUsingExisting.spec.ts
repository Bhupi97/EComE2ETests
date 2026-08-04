import { test, expect } from "../fixtures/baseTest";
import userData from "../data/registerUser.json"


test("TC5: Register User with existing email", async ({homePage, signUpLoginPage, signupPage, accountProcessingPage})=> {

    const user = userData.validUser;
    const uniqueEmail = `test_${Date.now()}@email.com`;

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

    await test.step("Registering user with existing email", async ()=>{
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible(); 
        await homePage.gotoSignupLogin();
        await expect(signUpLoginPage.signupFormHeading).toHaveText("New User Signup!");
        await signUpLoginPage.fillName(user.name);
        await signUpLoginPage.fillSignUpEmail(uniqueEmail); 
        await signUpLoginPage.clickSignup();
        await expect(signUpLoginPage.errorMessage).toHaveText("Email Address already exist!");
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