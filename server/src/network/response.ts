import { HttpCode } from "../utils/HttpCode";

interface ErrorResponse {
  path: string;
  message: string;
}

interface HandleResponseConstructor {
  status?: HttpCode;
  message?: string;
  data?: any | any[];
  errors?: ErrorResponse[];
}

export class HandleResponse {
  private readonly status: number;
  private readonly data: any[];
  private readonly message: string;
  private readonly errors: ErrorResponse[] | undefined;

  constructor({
    data,
    errors,
    status = HttpCode.Ok,
    message = "OK",
  }: HandleResponseConstructor) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
}
