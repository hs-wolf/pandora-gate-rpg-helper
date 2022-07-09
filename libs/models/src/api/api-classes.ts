import { ResponseCodes } from './api-enums';

export class ApiError {
  constructor(
    public code: ResponseCodes,
    public message: string,
    public status?: number
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromMap(map: any) {
    if (!map) {
      return null;
    }
    return new ApiError(
      <ResponseCodes>map['code'] ?? null,
      <string>map['message'] ?? null,
      <number>map['status'] ?? null
    );
  }

  toMap() {
    return {
      code: this.code,
      message: this.message,
      status: this.status,
    };
  }
}
