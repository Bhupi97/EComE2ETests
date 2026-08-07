import { test, expect } from "../fixtures/baseTest";


test("TC9: Search Product", async ({homePage, products, productDetails})=> {
    await test.step("Navigate to Landing Page", async () => {
        await homePage.gotoHome();
        await expect(homePage.logoAltText).toBeVisible();
    });

    await test.step("Click products verify products list", async () => {
        await homePage.gotoProducts();
        await expect(products.productsHeading).toHaveText("All Products");
    })

    await test.step("Search product and verify", async ()=> {
        await products.searchProduct("Stylish Dress");
        await products.submitSearch();
        await expect(products.searchProductHeading).toHaveText("Searched Products");
        await expect(products.nameOfFirstProduct()).toContainText("Stylish");
    } )

})