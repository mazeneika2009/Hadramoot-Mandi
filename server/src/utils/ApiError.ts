export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly errors?: string[],
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static badRequest(message: string, errors?: string[]): ApiError {
    return new ApiError(400, message, errors);
  }

  static unauthorized(
    message = 'يجب تسجيل الدخول للمتابعة',
    code = 'AUTH_REQUIRED',
  ): ApiError {
    return new ApiError(401, message, undefined, code);
  }

  static forbidden(message = 'ليس لديك صلاحية لهذا الإجراء'): ApiError {
    return new ApiError(403, message);
  }

  static notFound(message = 'العنصر غير موجود'): ApiError {
    return new ApiError(404, message);
  }

  static conflict(message: string): ApiError {
    return new ApiError(409, message);
  }
}
