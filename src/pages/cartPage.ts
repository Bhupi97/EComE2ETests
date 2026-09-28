import {Page, Locator} from "@playwright/test";

export class CartPage {
    private readonly nameOfFirstProduct;
    private readonly priceOfFirstProduct;
    private readonly quantityOfFirstProduct;
    private readonly totalPriceOfFirstProduct;
    private readonly nameOfSecondProduct;
    private readonly priceOfSecondProduct;
    private readonly quantityOfSecondProduct;
    private readonly totalPriceOfSecondProduct;

    constructor (public readonly page: Page) {
        this.nameOfFirstProduct = page.locator("#product-1 .cart_description h4 a");
        this.priceOfFirstProduct = page.locator("#product-1 .cart_price p");
        this.quantityOfFirstProduct = page.locator("#product-1 .cart_quantity button");
        this.totalPriceOfFirstProduct = page.locator("#product-1 .cart_total_price");
        this.nameOfSecondProduct = page.locator("#product-2 .cart_description h4 a");
        this.priceOfSecondProduct = page.locator("#product-2 .cart_price p");
        this.quantityOfSecondProduct = page.locator("#product-2 .cart_quantity button");
        this.totalPriceOfSecondProduct = page.locator("#product-2 .cart_total_price");
    }

    public get firstProductName(): Locator {
        return this.nameOfFirstProduct;
    }

    public get firstProductPrice(): Locator {
        return this.priceOfFirstProduct;
    }

    public get firstProductQuantity(): Locator{
        return this.quantityOfFirstProduct;
    }

    public get firstProductTotalPrice(): Locator {
        return this.totalPriceOfFirstProduct;
    }

    public get secondProductName(): Locator{
        return this.nameOfSecondProduct;
    }

    public get secondProductPrice(): Locator {
        return this.priceOfSecondProduct;
    }

    public get secondProductQuantity(): Locator {
        return this.quantityOfSecondProduct;
    }

    public get secondProductTotalPrice(): Locator {
        return this.totalPriceOfSecondProduct;
    }

}