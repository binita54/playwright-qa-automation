import dotenv from 'dotenv';
dotenv.config();

export const USERS = {
  standard: {
    username: process.env.VALID_USERNAME ?? 'standard_user',
    password: process.env.VALID_PASSWORD ?? 'secret_sauce',
  },
  locked: {
    username: process.env.LOCKED_USERNAME ?? 'locked_out_user',
    password: process.env.VALID_PASSWORD ?? 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
  emptyUsername: {
    username: '',
    password: 'secret_sauce',
  },
  emptyPassword: {
    username: 'standard_user',
    password: '',
  },
};

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
};

export const CHECKOUT_INFO = {
  valid: {
    firstName: 'Jane',
    lastName: 'Doe',
    postalCode: '10001',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '10001',
  },
};

export const API = {
  baseUrl: process.env.API_BASE_URL ?? 'https://reqres.in/api',
};

export const ERROR_MESSAGES = {
  invalidCredentials: 'Username and password do not match',
  lockedUser: 'Sorry, this user has been locked out',
  usernameRequired: 'Username is required',
  passwordRequired: 'Password is required',
  firstNameRequired: 'First Name is required',
};
