import { test, expect } from "../fixtures/baseTest";

test("Test Case 13: Verify Product quantity in Cart", async ({homePage, products, productDetails, cart}) => {

    let nameOfFirstItem: string;
    let priceOfFirstItem: string;

    await test.step("Navigate to homepage and verify", async () => {
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible(); 
    })

    await test.step("Click view product on any product and verify the details", async () => {
        nameOfFirstItem = await products.nameOfNthProduct(0).innerText();
        priceOfFirstItem = await products.priceOfNthProduct(0).innerText();
        await homePage.clickViewProduct(0);
        await expect(productDetails.name).toHaveText(nameOfFirstItem);
        await expect(productDetails.productPrice).toHaveText(priceOfFirstItem);
    })

    await test.step("Increase product quantity and add to cart", async () => {
        await productDetails.updateQuantity(4);
        await productDetails.clickAddToCart();
        await products.verifyModalIsVisible();
        await products.clickViewCart();
    })
    
    await test.step("Verify product displayed in the cart with exact quantity", async () => {
        await expect(cart.firstProductName).toHaveText(nameOfFirstItem);
        await expect(cart.firstProductQuantity).toHaveText("4");
    })
})