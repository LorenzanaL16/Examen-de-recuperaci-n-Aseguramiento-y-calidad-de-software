import { test, expect } from '../fixtures';
import { PRODUCTS, SORT_CASES } from '../test-data/data';

test.describe('RF2. Catálogo y ordenamiento', () => {
  test.beforeEach(async ({ sesionEstandar }) => {
    await expect(sesionEstandar.page).toHaveURL(/\/inventory\.html$/);
  });

  test(
    'El catálogo muestra los 6 productos con nombre y precio exactos en su orden inicial',
    { tag: ['@smoke', '@regression'] },
    async ({ inventoryPage }) => {
      await expect(inventoryPage.inventoryItems).toHaveCount(PRODUCTS.length);

      const names = await inventoryPage.itemNames.allTextContents();
      const pricesText = await inventoryPage.itemPrices.allTextContents();
      const prices = pricesText.map((text) => Number(text.replace('$', '').trim()));

      expect(names).toEqual(PRODUCTS.map((p) => p.name));
      expect(prices).toEqual(PRODUCTS.map((p) => p.price));
    }
  );

  for (const sortCase of SORT_CASES) {
    test(
      `Ordenar catálogo por ${sortCase.label} (${sortCase.value}) verifica nombres y precios`,
      { tag: ['@regression'] },
      async ({ inventoryPage }) => {
        await inventoryPage.sortProducts(sortCase.value);

        const names = await inventoryPage.itemNames.allTextContents();
        const pricesText = await inventoryPage.itemPrices.allTextContents();
        const prices = pricesText.map((text) => Number(text.replace('$', '').trim()));

        expect(names).toEqual(sortCase.expectedNames);
        expect(prices).toEqual(sortCase.expectedPrices);
      }
    );
  }
});