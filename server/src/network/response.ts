import { HttpCode } from "../utils/HttpCode";

interface HandleResponseConstructor {
  status?: HttpCode;
  message?: string;
  data?: any | any[];
}

export class HandleResponse {
  private readonly status: number;
  private readonly data: any[];
  private readonly message: string;

  constructor({
    data = null,
    status = HttpCode.Ok,
    message = "OK",
  }: HandleResponseConstructor) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
