import { Page, Locator} from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;
    readonly itemImages: Locator;
    readonly sortSelect: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) { 
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.inventoryItems = page.locator('.inventory_item');
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        this.itemImages = page.locator('.inventory_item_img');
        this.sortSelect = page.locator('[data-test="product_sort_container"]');
        this.cartBadge = page.locator('.[data-test="shopping_cart_badge"]');
        this.cartLink = page.locator('[data-test="shopping_cart_link"]');
        this.menuButton = page.getByRole('button', { name: 'Logout' });
        this.logoutLink = page.getByRole('link', { name: 'Logout'});
    }
    
    async addProductToCart(suffix: string): Promise<void> {
        await this.page.locator(`[data-test="add-to-cart-${suffix}"]`).click();
    }

    async removeProductFromCart(suffix: string): Promise<void> {
        await this.page.locator(`[data-test="remove-${suffix}"]`).click();
    }

    async sortProducts(optionValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortSelect.selectOption(optionValue);
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    async logout(): Promise<void> {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}