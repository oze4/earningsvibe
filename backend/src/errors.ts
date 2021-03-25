import { CustomError } from './types';

export function NewHTTPError(status: number, message: string): CustomError {
  return { status, message };
}