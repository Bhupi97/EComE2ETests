import { test, expect } from "../fixtures/baseTest";
import testData from "../data/registerUser.json"

test("Test Case 3: Login User with incorrect email and password", async ({homePage, signUpLoginPage})=>{

    const invalidUser = testData.invalidUser;

    
    await test.step("Navigate to Landing Page", async () => {
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible(); 
    });

    await test.step("Go to Login Page and enter incorrect credentials", async () => {
        await homePage.gotoSignupLogin();
        await expect(signUpLoginPage.signInFormHeading).toHaveText("Login to your account");
        await signUpLoginPage.fillLoginEmail(invalidUser.email);
        await signUpLoginPage.fillLoginPassword(invalidUser.password);
        await signUpLoginPage.clickLogin();
    })

    await test.step("Verify the error message", async ()=>{
        await expect(signUpLoginPage.errorMessage).toHaveText("Your email or password is incorrect!");
    })
})