export interface CustomErrorType {
  type: "axios-error" | "stock-error";
  error: any;
  status?: number;
}

export class CustomError {
  type;
  error;
  status;

  constructor({ type, error, status }: CustomErrorType) {
    this.error = error;
    this.type = type;
    this.status = status;
  }
}
