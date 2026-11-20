import { test, expect } from '../fixtures';
import { USERS, PRODUCTS, SORT_CASES } from '../test-data/data';

test.describe('RF5. Defectos conocidos de problem_user', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.problem, USERS.password);
    await expect(loginPage.page).toHaveURL(/\/inventory\.html$/);
  });

  test(
    'DEF-001: Los 6 productos deben mostrar imágenes distintas',
    { tag: ['@defecto'] },
    async ({ page, inventoryPage }, testInfo) => {
      test.fail();
      testInfo.annotations.push({
        type: 'defecto',
        description:
          'DEF-001: problem_user muestra la misma imagen repetida en todos los productos del catálogo.',
      });

      const srcs = await inventoryPage.itemImages.evaluateAll((imgs) =>
        imgs.map((img) => img.getAttribute('src') ?? '')
      );
      const uniqueSrcs = new Set(srcs);

      const screenshot = await page.screenshot();
      await testInfo.attach('def-001-imagenes', {
        body: screenshot,
        contentType: 'image/png',
      });

      expect(uniqueSrcs.size).toBe(PRODUCTS.length);
    }
  );

  test(
    'DEF-002: Ordenar por Name (Z to A) debe invertir el orden de productos',
    { tag: ['@defecto'] },
    async ({ page, inventoryPage }, testInfo) => {
      test.fail();
      testInfo.annotations.push({
        type: 'defecto',
        description:
          'DEF-002: Al seleccionar Name (Z to A) con problem_user, el catálogo no cambia su orden.',
      });

      const zaCase = SORT_CASES.find((item) => item.value === 'za');
      await inventoryPage.sortProducts('za');

      const names = await inventoryPage.itemNames.allTextContents();

      const screenshot = await page.screenshot();
      await testInfo.attach('def-002-orden-za', {
        body: screenshot,
        contentType: 'image/png',
      });

      expect(names).toEqual(zaCase?.expectedNames);
    }
  );

  test(
    'DEF-003: Agregar Sauce Labs Bolt T-Shirt debe mostrar insignia 1 en el carrito',
    { tag: ['@defecto'] },
    async ({ page, inventoryPage }, testInfo) => {
      test.fail();
      testInfo.annotations.push({
        type: 'defecto',
        description:
          'DEF-003: Al pulsar Add to cart en Sauce Labs Bolt T-Shirt con problem_user, el botón no cambia a Remove y no aparece la insignia.',
      });

      const boltShirt = PRODUCTS[2];
      await inventoryPage.addProductToCart(boltShirt.suffix);

      const screenshot = await page.screenshot();
      await testInfo.attach('def-003-bolt-tshirt', {
        body: screenshot,
        contentType: 'image/png',
      });

      await expect(inventoryPage.cartBadge).toHaveText('1');
    }
  );

  test(
    'DEF-004: Al llenar el formulario de compra cada campo debe conservar lo escrito',
    { tag: ['@defecto'] },
    async ({ page, inventoryPage, cartPage, checkoutPage }, testInfo) => {
      test.fail();
      testInfo.annotations.push({
        type: 'defecto',
        description:
          'DEF-004: En el formulario de compra con problem_user, escribir el apellido sobrescribe o altera el campo del nombre.',
      });

      await inventoryPage.addProductToCart(PRODUCTS[0].suffix);
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
      await checkoutPage.fillCustomerInformation('Ana', 'Perez', '01001');

      const screenshot = await page.screenshot();
      await testInfo.attach('def-004-formulario', {
        body: screenshot,
        contentType: 'image/png',
      });

      await expect(checkoutPage.firstNameInput).toHaveValue('Ana');
      await expect(checkoutPage.lastNameInput).toHaveValue('Perez');
    }
  );
});