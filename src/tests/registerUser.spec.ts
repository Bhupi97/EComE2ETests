import { test, expect } from "../fixtures/baseTest";
import testData from "../data/registerUser.json";

test("TC1: Register User and Clean up Account", async ({ 
    homePage, 
    signUpLoginPage, 
    signupPage, 
    accountProcessingPage 
}) => {
    const user = testData.validUser;
    
    // Enterprise Tip: Dynamically appending a timestamp to the email 
    // ensures the test remains repeatable without manual database resets.
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

    await test.step("Verify Form Identity and Fill Detailed Account Profile", async () => {
        await expect(signupPage.accountInfoHeader).toHaveText("Enter Account Information");
        await expect(signupPage.nameField).toHaveValue(user.name);
        
        // Use uniqueEmail here to match what was entered in the step above
        await expect(signupPage.emailField).toHaveValue(uniqueEmail); 
        
        await signupPage.selectTitle(user.title);
        await signupPage.setPassword(user.password);
        await signupPage.setDob(new Date(user.dob));

        await signupPage.signupNewsletter(user.newsletter);
        await signupPage.receiveSplOffers(user.specialOffers);

        await signupPage.setFirstName(user.firstName);
        await signupPage.setLastName(user.lastName);
        await signupPage.setCompany(user.company);
        await signupPage.setAddress(user.address);
        await signupPage.selectCountry(user.country);
        await signupPage.setState(user.state);
        await signupPage.setCity(user.city);
        await signupPage.setZipCode(user.zipcode);
        await signupPage.setMobileNo(user.mobileNumber);
        
        await signupPage.clickCreateAccountBtn();
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