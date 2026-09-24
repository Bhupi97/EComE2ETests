import { test, expect } from "../fixtures/baseTest";
import userData from "../data/registerUser.json"


test("TC12: Verify Add products in cart", async ({homePage, products, page}) => {
    const user = userData.validUser;

    await test.step("Navigate to Landing Page", async () => {
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible(); 
    });

    await test.step("Click products and add first product in cart", async ()=> {
        await homePage.gotoProducts();
        await products.firstProductCart.hover();
        await products.firstProductCart.click();
        await products.verifyModalIsVisible();
        await products.clickContinueShopping();
    })

    await test.step("Hover over second product and add to cart", async () => {
        await products.secondProductCart.hover();
        await products.secondProductCart.click();
        // Handle popup modal and click View Cart
        await products.verifyModalIsVisible();
        await products.clickViewCart();
    });

})