export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.name = new.target.name;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
