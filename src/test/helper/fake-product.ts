import faker from 'faker';

export function makeFakeProductId(): string {
  return faker.commerce.productName().replace(/\s+/g, '-').toLowerCase();
}
