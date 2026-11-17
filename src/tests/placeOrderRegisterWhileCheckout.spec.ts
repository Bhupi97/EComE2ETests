import { test, expect } from "../fixtures/baseTest";
import testData from "../data/registerUser.json";
import paymentData from "../data/paymentData.json";


test("TC: 14 Place Order: Register while Checkout", async ({homePage, products, cart, signUpLoginPage, signupPage, accountProcessingPage, payment, checkout, page}) => {

    const user = testData.validUser;
    const uniqueEmail = `test_${Date.now()}@example.com`;
    const card = paymentData.validCard;

    await test.step("Navigate to Landing Page", async () => {
            await homePage.gotoHome();
            await expect(homePage.logoAltText).toBeVisible(); 
        });

    await test.step("Add product in cart and verify cart page", async () => {
        await products.addProductToCart(0).hover();
        await products.addProductToCart(0).click();
        await products.verifyModalIsVisible();
        await products.clickViewCart();
        await cart.clickProceedToCheckout();
        await expect(cart.checkoutModelLocator).toBeVisible();
        await cart.clickDialogRegisterLoginLink();
        });

    await test.step("Signup user and verify login", async () => {

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

    await test.step("Click cart button, proceed to checkout verify address and place order", async () => {
        await homePage.clickCartBtn();
        await cart.clickProceedToCheckout();
        await expect(checkout.getDeliveryAddressLocator).toContainText(user.firstName);
        await expect(checkout.getDeliveryAddressLocator).toContainText(user.city);
        await checkout.enterOrderComment('Ordering something special...');
        await checkout.clickPlaceOrder();
    });

    await test.step("Enter payment details and confirm order", async () => {
        await payment.completePayment(card);
    });

    await test.step("Cleanup: Delete Created User Account", async () => {
        await homePage.clickDeleteAccount();
        await expect(accountProcessingPage.accountDHeading).toHaveText("Account Deleted!");
        await accountProcessingPage.clickContinueBtn();
    });

});
