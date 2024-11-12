const StatusCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ReasonStatusCode = {
  FORBIDDEN: "Bad request error",
  CONFLICT: "Conflict error",
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    status = StatusCodes.CONFLICT
  ) {
    super(message, status);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    status = StatusCodes.CONFLICT
  ) {
    super(message, status);
  }
}

export { ErrorResponse, ConflictRequestError, BadRequestError };