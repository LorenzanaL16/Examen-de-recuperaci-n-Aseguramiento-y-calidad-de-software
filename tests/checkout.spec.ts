import { test, expect } from '../fixtures';
import { MESSAGES, PRODUCTS } from '../test-data/data';

const backpack = PRODUCTS[0];
const bikeLight = PRODUCTS[1];

const MISSING_FIELD_CASES = [
  {
    fieldName: 'nombre',
    firstName: '',
    lastName: 'Perez',
    postalCode: '01001',
    expectedError: MESSAGES.firstNameRequired,
  },
  {
    fieldName: 'apellido',
    firstName: 'Ana',
    lastName: '',
    postalCode: '01001',
    expectedError: MESSAGES.lastNameRequired,
  },
  {
    fieldName: 'código postal',
    firstName: 'Ana',
    lastName: 'Perez',
    postalCode: '',
    expectedError: MESSAGES.postalCodeRequired,
  },
];

test.describe('RF4. Compra completa', () => {
  test.beforeEach(async ({ page, sesionEstandar, cartPage }) => {
    await sesionEstandar.addProductToCart(backpack.suffix);
    await sesionEstandar.addProductToCart(bikeLight.suffix);
    await sesionEstandar.goToCart();
    await cartPage.goToCheckout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  for (const fieldCase of MISSING_FIELD_CASES) {
    test(
      `Formulario de compra con ${fieldCase.fieldName} faltante muestra error y no avanza`,
      { tag: ['@regression'] },
      async ({ page, checkoutPage }) => {
        await checkoutPage.fillCustomerInformation(
          fieldCase.firstName,
          fieldCase.lastName,
          fieldCase.postalCode
        );
        await checkoutPage.continueToOverview();

        await expect(checkoutPage.errorMessage).toBeVisible();
        await expect(checkoutPage.errorMessage).toHaveText(fieldCase.expectedError);
        await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      }
    );
  }

  test(
    'Resumen de compra calcula subtotal, impuesto del 8% y total correctamente',
    { tag: ['@regression'] },
    async ({ page, checkoutPage }) => {
      await checkoutPage.fillCustomerInformation('Ana', 'Perez', '01001');
      await checkoutPage.continueToOverview();
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

      const subtotal = Number((backpack.price + bikeLight.price).toFixed(2));
      const expectedTax = Number((subtotal * 0.08).toFixed(2));
      const expectedTotal = Number((subtotal + expectedTax).toFixed(2));

      await expect(checkoutPage.subtotalLabel).toHaveText(`Item total: $${subtotal.toFixed(2)}`);
      await expect(checkoutPage.taxLabel).toHaveText(`Tax: $${expectedTax.toFixed(2)}`);
      await expect(checkoutPage.totalLabel).toHaveText(`Total: $${expectedTotal.toFixed(2)}`);
    }
  );

  test(
    'Finalizar compra muestra confirmación, adjunta captura y Back Home limpia insignia',
    { tag: ['@smoke', '@regression'] },
    async ({ page, inventoryPage, checkoutPage }, testInfo) => {
      await checkoutPage.fillCustomerInformation('Ana', 'Perez', '01001');
      await checkoutPage.continueToOverview();
      await checkoutPage.finishOrder();

      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(checkoutPage.completeHeader).toHaveText(MESSAGES.orderCompleteTitle);
      await expect(checkoutPage.completeText).toHaveText(MESSAGES.orderCompleteText);

      const screenshot = await page.screenshot();
      await testInfo.attach('confirmacion-compra', {
        body: screenshot,
        contentType: 'image/png',
      });

      await checkoutPage.backHome();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.cartBadge).toHaveCount(0);
    }
  );
});