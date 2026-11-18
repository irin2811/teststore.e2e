import type { RegistrationData } from '@pages';

export function createUniqueUser(): RegistrationData {
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    firstName: 'Test',
    lastName: 'User',
    email: `qa.user.${id}@example.com`,
    password: 'Passw0rd!123',
  };
}

// Persistent account used by login tests. It is registered on demand if missing.
export const existingUser: RegistrationData = {
  firstName: 'Existing',
  lastName: 'Customer',
  email: process.env.TEST_USER_EMAIL ?? 'qa.existing.user@example.com',
  password: process.env.TEST_USER_PASSWORD ?? 'Passw0rd!123',
};
