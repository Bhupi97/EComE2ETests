import { test, expect } from "../fixtures/baseTest";
import testData from "../data/registerUser.json";

test("TC1: Register User and Clean up Account", async ({ 
    homePage, 
    signUpLoginPage, 
    signupPage, 
    accountProcessingPage 
}) => {
    const user = testData.validUser;
    const uniqueEmail = `test_${Date.now()}@example.com`;
    
    await test.step("Navigate to Landing Page", async () => {
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible(); 
    });

    await test.step("Navigate to Authentication and Initiate Signup", async () => {
        await homePage.gotoSignupLogin();
        await expect(signUpLoginPage.signupFormHeading).toHaveText("New User Signup!");
        await signUpLoginPage.fillName(user.name);
        await signUpLoginPage.fillSignUpEmail(uniqueEmail); 
        await signUpLoginPage.clickSignup();
    });

    await test.step("Fill Detailed Account Profile using Business Workflow", async () => {
        await expect(signupPage.accountInfoHeader).toHaveText("Enter Account Information");
        await expect(signupPage.nameField).toHaveValue(user.name);
        
        await expect(signupPage.emailField).toHaveValue(uniqueEmail); 
        await signupPage.completeRegistrationProfile(user, uniqueEmail);
    });

    await test.step("Verify Successful Account Creation and Login State", async () => {
        await expect(accountProcessingPage.accountCHeading).toHaveText("Account Created!");
        await accountProcessingPage.clickContinueBtn();
        await expect(homePage.loginStatus).toHaveText(` Logged in as ${user.name}`);
    });

    await test.step("Cleanup: Delete Created User Account", async () => {
        await homePage.clickDeleteAccount();
        await expect(accountProcessingPage.accountDHeading).toHaveText("Account Deleted!");
        await accountProcessingPage.clickContinueBtn();
    });
});