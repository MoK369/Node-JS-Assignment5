export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent constructor with the message
    this.name = "CustomError"; // Set the error name (optional but recommended)
    this.statusCode = statusCode;
  }
}
