export class AppError {
  public readonly message: string
  public readonly statusCode: number
  public readonly detail?: string

  constructor(message: string, statusCode = 400, detail?: string) {
    this.message = message
    this.statusCode = statusCode
    this.detail = detail
  }
}