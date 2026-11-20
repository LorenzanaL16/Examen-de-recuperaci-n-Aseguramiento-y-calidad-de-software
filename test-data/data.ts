export interface ProductData {
    name: string;
    price: number;
    suffix: string;
}

export interface SortCase {
    value: 'az' | 'za' | 'lohi' | 'hilo';
    label: string;
    expectedNames: string[];
    expectedPrices: number[];
}

export const USERS = {
    standard: 'standard_user',
    locked: 'locked_out_user',
    problem: 'problem_user',
    password: 'secret_sauce',
} as const;

export const MESSAGES = {
    LockedOutError: 'Epic sadface: Sorry, this user has been locked out.',
    usernameRequired: 'Epic sadface: UserName us required',
    passwordRequired: 'Epic sadface: Password is required',
    invalidCredentials: 'Epic sadface: Username and password do not mach any user in this service',
    noSessionError: "Epic sadface: You can only access '/inventory.html' when you are logged in.",
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required',
    orderCompleteTitle: 'Thank you for your order!',
    oderCompleteText: 'ypur order has been dispatched, and will arrive just as fast as the pony can get there!',
} as const;

export const PRODUCTS: readonly ProductData[] = [
    {
        name: 'Sauce Labs Backpack',
        price: 29.99,
        suffix: 'sauce-labs-backpack',
    },
    {
        name: 'Sauce Labs Bike Light',
        price: 9.99,
        suffix: 'sauce-labs-bike-light',
    },
    {
        name: 'Sauce Labs Bolt T-Shirt',
        price: 15.99,
        suffix: 'sauce-labs-bolt-t-shirt',
    },
    {
        name: 'Sauce Labs Fleece Jacket',
        price: 49.99,
        suffix: 'sauce-labs-fleece-jacket',
    },
    {
        name: 'Sauce Labs Onesie',
        price: 7.99,
        suffix: 'sauce-labs-onesie',
    },
    {
        name: 'Test.allTheThings() T-Shirt (Read)',
        price: 15.99,
        suffix: 'test.allthethings()-t-shirt-(red)',
    },
] as const;

export const SORT_CASES: readonly SortCase[] = [
    {
        value: 'az',
        label: 'Name (A to Z)',
        expectedNames: [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)',
        ],
        expectedPrices: [29.99, 9.99, 15.99, 49.99, 7.99, 15.99],
    },
    {
        value: 'za',
        label: 'Name (Z to A)',
        expectedNames: [
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Onesie',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Bike Light',
            'Sauce Labs Backpack',
        ],
        expectedPrices: [15.99, 7.99, 49.99, 15.99, 9.99, 29.99],
    },
    {
        value: 'lohi',
        label: 'Price (low to high)',
        expectedNames: [
            'Sauce Labs Onesie',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Backpack',
            'Sauce Labs Fleece Jacket',
        ],
        expectedPrices: [7.99, 9.99, 15.99, 15.99, 29.99, 49.99],
    },
    {
        value: 'hilo',
        label: 'Price (high to low)',
        expectedNames: [
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Backpack',
                'Sauce Labs Bolt T-Shirt',
                'Test.allTheThings() T-Shirt (Red)',
                'Sauce Labs Bike Light',
                'Sauce Labs Onesie',
            ],
            expectedPrices: [49.99, 29.99, 15.99, 15.99, 9.99, 7.99],
        },
    ] as const;