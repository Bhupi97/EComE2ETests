import { test, expect } from "../fixtures/baseTest";

test("TC8: Verify All Products and product detail page", async ({homePage, products, productDetails}) => {
    await test.step("Navigate to Landing Page", async () => {
                await homePage.gotoHome();
                await expect(homePage.logoAltText).toBeVisible(); 
            });

    await test.step("Click products verify products list", async () => {
        await homePage.gotoProducts();
        await expect(products.productsHeading).toHaveText("All Products");
    })

    await test.step("Click On first product and verify details", async () => {
        const nameOfProduct = await products.nameOfFirstProduct().innerText();
        const priceOfProduct = await products.priceOfFirstProduct();
        await products.clickOnViewProduct();
        await expect(productDetails.name).toContainText(nameOfProduct);
        await expect(productDetails.productPrice).toHaveText(priceOfProduct);
        await expect(productDetails.categoryDetails).toHaveText(/Category/);
        await expect(productDetails.availabilityStatus).toHaveText(/Availability/);
        await expect(productDetails.conditionStatus).toHaveText(/Condition/);
        await expect(productDetails.brandName).toHaveText(/Brand/);
    })
    
})