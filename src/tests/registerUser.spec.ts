import {test, expect} from "../fixtures/baseTest";
// import { HomePage } from "../pages/homepage";
// import { SignUpLoginPage } from "../pages/signUpLoginPage";
// import { SignupPage } from "../pages/signupPage";
// import { AccountProcessingPage } from "../pages/accountProcessingPage";
import testData from "../data/registerUser.json";

test("TC1: Register User", async ({homePage, signUpLoginPage, signupPage, accountProcessingPage, page })=> {


    const user = testData.validUser;
    await homePage.gotoHome();
    await expect(homePage.logoAltText).toBeVisible(); 
    await homePage.gotoSignupLogin();

    await expect(signUpLoginPage.signupFormHeading).toHaveText("New User Signup!");
    await signUpLoginPage.fillName(user.name)
    await signUpLoginPage.fillSignUpEmail(user.email)
    
    await signUpLoginPage.clickSignup();

    await expect(signupPage.accountInfoHeader).toHaveText("Enter Account Information");

    await expect(signupPage.nameField).toHaveValue(user.name);
    await expect(signupPage.emailField).toHaveValue(user.email);
    await signupPage.selectTitle(user.title);

    await signupPage.setPassword(user.password);
    await signupPage.setDob(new Date(user.dob));

    await signupPage.signupNewsletter(user.newsletter);
    await signupPage.receiveSplOffers(user.specialOffers);

    await signupPage.setFirstName(user.firstName);
    await signupPage.setLastName(user.lastName)
    await signupPage.setCompany(user.company)
    await signupPage.setAddress(user.address)
    await signupPage.selectCountry(user.country)
    await signupPage.setState(user.state)
    await signupPage.setCity(user.city)
    await signupPage.setZipCode(user.zipcode)
    await signupPage.setMobileNo(user.mobileNumber)

    // Click on create account button;
    await signupPage.clickCreateAccountBtn();
    
    await expect(accountProcessingPage.accountCHeading).toHaveText("Account Created!");

    await accountProcessingPage.clickContinueBtn();
    await expect(homePage.loginStatus).toHaveText(` Logged in as ${user.name}`);
    await homePage.clickDeleteAccount();

    await expect(accountProcessingPage.accountDHeading).toHaveText("Account Deleted!");
    await accountProcessingPage.clickContinueBtn();


})