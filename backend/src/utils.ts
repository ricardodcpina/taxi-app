import { invalidDataError } from './errors';

export function validateUserInput(
  origin: string,
  destination: string,
  customer_id: string
): boolean {
  // Origin, destination and customer_id must not be empty
  if (!origin || !destination || !customer_id) {
    throw invalidDataError;
  }

  // Origin and destination addresses must not be the same
  let processedOrigin = origin
    // Remove accents
    .normalize('NFD')
    // Remove punctuations and white spaces
    .replace(/[\u0300-\u036f]|[^\w]|_/g, '')
    // Guarante case insensitivity
    .toLowerCase();

  // Same for the destination input
  let processedDestination = destination
    .normalize('NFD')
    .replace(/[\u0300-\u036f]|[^\w]|_/g, '')
    .toLowerCase();

  if (processedOrigin === processedDestination) {
    throw invalidDataError;
  }

  return true;
}
