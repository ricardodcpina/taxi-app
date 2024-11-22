import { APIError, RideError } from './types';

export const invalidDataError: RideError = {
  status_code: 400,
  error_code: 'INVALID_DATA',
  error_description:
    'Os dados fornecidos no corpo da requisição são inválidos',
};

export const invalidDriver: RideError = {
  status_code: 400,
  error_code: 'INVALID_DRIVER',
  error_description: 'Motorista inválido',
};

export const driverNotFound: RideError = {
  status_code: 404,
  error_code: 'DRIVER_NOT_FOUND',
  error_description: 'Motorista não encontrado',
};

export const noRidesFound: RideError = {
  status_code: 404,
  error_code: 'NO_RIDES_FOUND',
  error_description: 'Nenhum registro encontrado',
};

export const invalidDistance: RideError = {
  status_code: 406,
  error_code: 'INVALID_DISTANCE',
  error_description: 'Quilometragem inválida para o motorista',
};

export const externalAPIError: APIError = {
  status_code: 500,
  error_code: 'EXTERNAL_API_ERROR',
  error_description: 'Falha ao coletar dados da API Route do Google',
};
