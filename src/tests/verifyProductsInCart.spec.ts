import { test, expect } from "../fixtures/baseTest";
import userData from "../data/registerUser.json";

test("TC12: Verify Add products in cart", async ({ homePage, products, cart }) => {
    const user = userData.validUser;

    let nameOfFirstItem: string;
    let priceOfFirstItem: string;
    let nameOfSecondItem: string;
    let priceOfSecondItem: string;

    await test.step("Navigate to Landing Page", async () => {
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible(); 
    });

    await test.step("Click products and add first product in cart", async () => {
        await homePage.gotoProducts();
        nameOfFirstItem = await products.nameOfNthProduct(0).innerText();
        priceOfFirstItem = await products.priceOfNthProduct(0).innerText();
        await products.addProductToCart(0).hover();
        await products.addProductToCart(0).click();
        await products.verifyModalIsVisible();
        await products.clickContinueShopping();
    });

    await test.step("Hover over second product and add to cart", async () => {
        // Index 1 corresponds to the second item (0-indexed)
        nameOfSecondItem = await products.nameOfNthProduct(2).innerText();
        priceOfSecondItem = await products.priceOfNthProduct(2).innerText();
        await products.addProductToCart(2).hover();
        await products.addProductToCart(2).click();
        await products.verifyModalIsVisible();
        await products.clickViewCart();
    });
    
    await test.step("Verify prices, quantity, name and total price", async () => {
        await expect(cart.firstProductName).toHaveText(nameOfFirstItem);
        await expect(cart.firstProductPrice).toHaveText(priceOfFirstItem);
        await expect(cart.firstProductQuantity).toHaveText("1");
        await expect(cart.firstProductTotalPrice).toHaveText(priceOfFirstItem);
        await expect(cart.secondProductName).toHaveText(nameOfSecondItem);
        await expect(cart.secondProductPrice).toHaveText(priceOfSecondItem);
        await expect(cart.secondProductQuantity).toHaveText("1");
        await expect(cart.secondProductTotalPrice).toHaveText(priceOfSecondItem);
    });
});