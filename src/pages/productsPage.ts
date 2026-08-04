import { Locator, Page } from "@playwright/test";

export class Products {
    private readonly allProductsHeading: Locator;
    private readonly firstViewProductBtn: Locator;
    private readonly nameOfProduct: Locator;
    private readonly priceOfProduct: Locator;

    constructor(public readonly page: Page) {
        this.allProductsHeading = page.locator(".features_items").getByRole("heading", {name: 'All Products'});
        this.firstViewProductBtn = page.getByRole("link", {name: "View Product"}).first();
        this.nameOfProduct = page.locator(".single-products p");
        this.priceOfProduct = page.locator(".single-products h2");
    }

    public get productsHeading(): Locator {
        return this.allProductsHeading;
    }

    public async clickOnViewProduct(): Promise<void> {
        await this.firstViewProductBtn.click();
    }

    async nameOfFirstProduct(): Promise<string> {
        return await this.nameOfProduct.first().innerText();
    }

    async priceOfFirstProduct(): Promise<string> {
        return await this.priceOfProduct.first().innerText();
    }


}