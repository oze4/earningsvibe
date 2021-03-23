export function NewHTTPError(status: number, message: string): CustomError {
  return { status, message };
}