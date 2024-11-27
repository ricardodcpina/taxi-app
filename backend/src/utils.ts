import { invalidDataError } from './errors';

// Validate if provided args are empty
export function validateBlankFields(...args: string[]): boolean {
  for (let arg of args) {
    if (!arg) {
      throw invalidDataError;
    }
  }
  return true;
}

// Valiate if origin and destionation addresses are different
export function validateAddresses(
  origin: string,
  destination: string
) {
  let processedOrigin = origin
    // Remove accents
    .normalize('NFD')
    // Remove punctuations and white spaces
    .replace(/[\u0300-\u036f]|[^\w]|_/g, '')
    // Guarante case insensitivity
    .toLowerCase();

  let processedDestination = destination
    .normalize('NFD')
    .replace(/[\u0300-\u036f]|[^\w]|_/g, '')
    .toLowerCase();

  if (processedOrigin === processedDestination) {
    throw invalidDataError;
  }
  return true;
}
