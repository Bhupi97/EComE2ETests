import { Locator, Page, expect } from "@playwright/test";

export class Products {
    private readonly allProductsHeading: Locator;
    private readonly searchProductsHeading: Locator;
    private readonly firstViewProductBtn: Locator;
    private readonly nameOfProduct: Locator;
    private readonly priceOfProduct: Locator;
    private readonly searchInput: Locator;
    private readonly searchBtn: Locator;
    private readonly firstProductCartBtn: Locator;
    private readonly secondProductCartBtn: Locator;
    private readonly successModal: Locator;
    private readonly continueShoppingBtn: Locator;
    private readonly viewCartLink: Locator;

    constructor(public readonly page: Page) {
        this.allProductsHeading = page.locator(".features_items").getByRole("heading", {name: 'All Products'});
        this.searchProductsHeading = page.locator(".features_items").getByRole("heading", {name: 'Searched Products'});
        this.firstViewProductBtn = page.getByRole("link", {name: "View Product"}).first();
        this.nameOfProduct = page.locator(".single-products p");
        this.priceOfProduct = page.locator(".single-products h2");
        this.searchInput = page.getByPlaceholder("Search Product");
        this.searchBtn = page.locator("#submit_search");
        this.firstProductCartBtn = page.locator('a.add-to-cart[data-product-id="1"]');
        this.secondProductCartBtn = page.locator('a.add-to-cart[data-product-id="2"]');
        this.successModal = page.locator("#cartModal");
        this.continueShoppingBtn = page.getByRole("button", { name: "Continue Shopping" });
        this.viewCartLink = page.getByRole("link", { name: "View Cart" });
    }

    public get firstProductCart(): Locator {
        return this.firstProductCartBtn.first();
    }

    public get secondProductCart(): Locator {
        return this.secondProductCartBtn.first();
    }

    public async verifyModalIsVisible(): Promise<void> {
        await expect(this.successModal).toBeVisible();
    }

    public async clickContinueShopping(): Promise<void> {
        await this.continueShoppingBtn.click();
        await expect(this.successModal).not.toBeVisible();
    }

    public async clickViewCart(): Promise<void> {
        await this.viewCartLink.click();
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