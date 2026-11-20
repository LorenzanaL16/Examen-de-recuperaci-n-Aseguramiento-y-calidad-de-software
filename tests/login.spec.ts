import { test, expect } from '../fixtures';
import { USERS, MESSAGES, PRODUCTS } from '../test-data/data';

const INVALID_LOGIN_CASES = [
  {
    caseName: 'usuario vacío',
    username: '',
    password: USERS.password,
    expectedError: MESSAGES.usernameRequired,
  },
  {
    caseName: 'contraseña vacía',
    username: USERS.standard,
    password: '',
    expectedError: MESSAGES.passwordRequired,
  },
  {
    caseName: 'credenciales inexistentes',
    username: 'usuario_inexistente',
    password: 'clave_incorrecta',
    expectedError: MESSAGES.invalidCredentials,
  },
];

test.describe('RF1. Inicio y cierre de sesión', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test(
    'Inicio de sesión válido con standard_user',
    { tag: ['@smoke', '@regression'] },
    async ({ page, loginPage, inventoryPage }) => {
      await loginPage.login(USERS.standard, USERS.password);

      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.pageTitle).toHaveText('Products');
      await expect(inventoryPage.inventoryItems).toHaveCount(PRODUCTS.length);
    }
  );

  test(
    'Usuario bloqueado muestra mensaje de cuenta bloqueada y no ingresa',
    { tag: ['@regression'] },
    async ({ page, loginPage }) => {
      await loginPage.login(USERS.locked, USERS.password);

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(MESSAGES.LockedOutError);
      await expect(page).toHaveURL(/\/$/);
    }
  );

  for (const scenario of INVALID_LOGIN_CASES) {
    test(
      `Inicio de sesión inválido: ${scenario.caseName}`,
      { tag: ['@regression'] },
      async ({ page, loginPage }) => {
        await loginPage.login(scenario.username, scenario.password);

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(scenario.expectedError);
        await expect(page).toHaveURL(/\/$/);
      }
    );
  }

  test(
    'Abrir /inventory.html sin sesión redirige al login con mensaje de error',
    { tag: ['@regression'] },
    async ({ page, loginPage }) => {
      await page.goto('/inventory.html');

      await expect(page).toHaveURL(/\/$/);
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(MESSAGES.noSessionError);
    }
  );

  test(
    'Cerrar sesión desde el menú regresa al login con usuario vacío',
    { tag: ['@regression'] },
    async ({ page, loginPage, inventoryPage }) => {
      await loginPage.login(USERS.standard, USERS.password);
      await expect(page).toHaveURL(/\/inventory\.html$/);

      await inventoryPage.logout();

      await expect(page).toHaveURL(/\/$/);
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.usernameInput).toHaveValue('');
    }
  );
});