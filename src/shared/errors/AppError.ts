/**
 * Custom application error class for handling expected errors.
 *
 * This error is used to represent known business or validation issues,
 * and it carries an HTTP status code along with the message.
 *
 * Example usage:
 * ```ts
 * throw new AppError("Device not found", 404);
 * ```
 */
export class AppError extends Error {
  /**
   * The HTTP status code to be returned to the client.
   */
  public readonly statusCode: number;

  /**
   * Constructs a new AppError instance.
   *
   * @param message - A descriptive error message.
   * @param statusCode - The HTTP status code (default is 400 Bad Request).
   */
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;

    // Necessary to maintain correct prototype chain when targeting ES5
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
