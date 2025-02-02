interface AppErrorConstructor {
  name: string;
  statusCode: number;
  description: string;
  isOperational: boolean;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly description: string;
  public readonly statusCode?: number;
  public readonly isOperational?: boolean;

  constructor({
    name,
    description = "Internal server error",
    statusCode = 500,
    isOperational = false,
  }: AppErrorConstructor) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.description = description;

    Error.captureStackTrace(this);
  }
}
