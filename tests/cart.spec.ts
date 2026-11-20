import { test, expect } from '../fixtures';
import { PRODUCTS } from '../test-data/data';

const backpack = PRODUCTS[0];
const bikeLight = PRODUCTS[1];

test.describe('RF3. Carrito de compras', () => {
  test.beforeEach(async ({ sesionEstandar }) => {
    await sesionEstandar.addProductToCart(backpack.suffix);
    await sesionEstandar.addProductToCart(bikeLight.suffix);
  });

  test(
    'Agregar mochila y luz cambia ambos botones a Remove y muestra insignia 2',
    { tag: ['@smoke', '@regression'] },
    async ({ page, inventoryPage }) => {
      const backpackRemoveBtn = page.locator(`[data-test="remove-${backpack.suffix}"]`);
      const bikeLightRemoveBtn = page.locator(`[data-test="remove-${bikeLight.suffix}"]`);

      await expect(backpackRemoveBtn).toBeVisible();
      await expect(bikeLightRemoveBtn).toBeVisible();
      await expect(inventoryPage.cartBadge).toHaveText('2');
    }
  );

  test(
    'En /cart.html se listan los dos productos con cantidad 1 y su precio',
    { tag: ['@regression'] },
    async ({ page, inventoryPage, cartPage }) => {
      await inventoryPage.goToCart();
      await expect(page).toHaveURL(/\/cart\.html$/);

      await expect(cartPage.cartItems).toHaveCount(2);
      await expect(cartPage.itemNames).toHaveText([backpack.name, bikeLight.name]);
      await expect(cartPage.itemQuantities).toHaveText(['1', '1']);
      await expect(cartPage.itemPrices).toHaveText([
        `$${backpack.price.toFixed(2)}`,
        `$${bikeLight.price.toFixed(2)}`,
      ]);
    }
  );

  test(
    'Quitar la luz desde el carrito deja 1 producto y la insignia en 1',
    { tag: ['@regression'] },
    async ({ inventoryPage, cartPage }) => {
      await inventoryPage.goToCart();
      await cartPage.removeProduct(bikeLight.suffix);

      await expect(cartPage.cartItems).toHaveCount(1);
      await expect(cartPage.itemNames).toHaveText([backpack.name]);
      await expect(inventoryPage.cartBadge).toHaveText('1');
    }
  );

  test(
    'Continue Shopping regresa a /inventory.html conservando la insignia en 2',
    { tag: ['@regression'] },
    async ({ page, inventoryPage, cartPage }) => {
      await inventoryPage.goToCart();
      await cartPage.continueShopping();

      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.cartBadge).toHaveText('2');
    }
  );
});