import { Locator, Page } from "@playwright/test";

export class Products {
    private readonly allProductsHeading: Locator;
    private readonly searchProductsHeading: Locator;
    private readonly firstViewProductBtn: Locator;
    private readonly nameOfProduct: Locator;
    private readonly priceOfProduct: Locator;
    private readonly searchInput: Locator;
    private readonly searchBtn: Locator;

    constructor(public readonly page: Page) {
        this.allProductsHeading = page.locator(".features_items").getByRole("heading", {name: 'All Products'});
        this.searchProductsHeading = page.locator(".features_items").getByRole("heading", {name: 'Searched Products'});
        this.firstViewProductBtn = page.getByRole("link", {name: "View Product"}).first();
        this.nameOfProduct = page.locator(".single-products p");
        this.priceOfProduct = page.locator(".single-products h2");
        this.searchInput = page.getByPlaceholder("Search Product");
        this.searchBtn = page.locator("#submit_search");
    }

    public get productsHeading(): Locator {
        return this.allProductsHeading;
    }

    public get searchProductHeading(): Locator {
        return this.searchProductsHeading;
    }

    public async clickOnViewProduct(): Promise<void> {
        await this.firstViewProductBtn.click();
    }

    public nameOfFirstProduct(): Locator {
        return this.nameOfProduct.first();
    }

    async priceOfFirstProduct(): Promise<string> {
        return await this.priceOfProduct.first().innerText();
    }

    public async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
    }

    public async submitSearch(): Promise<void> {
        await this.searchBtn.click();
    }


}