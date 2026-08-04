import { Locator, Page } from "@playwright/test";

export class ProductDetails {
    private readonly productName: Locator;
    private readonly priceText: Locator;
    private readonly category: Locator;
    private readonly availability: Locator;
    private readonly condition: Locator;
    private readonly brand: Locator;

    constructor(public readonly page: Page) {
        this.priceText = page.locator('.product-information span span');
        this.productName = page.locator('.product-information h2');
        this.category = page.locator('.product-information p').first();
        this.availability = page.locator('.product-information p', { hasText: 'Availability:' });
        this.condition = page.locator('.product-information p', { hasText: 'Condition:' });
        this.brand = page.locator('.product-information p', { hasText: 'Brand:' });
    }

    public get productPrice(): Locator {
        return this.priceText;
    }

    public get name(): Locator {
        return this.productName;
    }

    public get categoryDetails(): Locator {
        return this.category;
    }

    public get availabilityStatus(): Locator {
        return this.availability;
    }

    public get conditionStatus(): Locator {
        return this.condition;
    }

    public get brandName(): Locator {
        return this.brand;
    }
}