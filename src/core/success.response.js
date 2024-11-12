const StatusCodes = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  CREATED: "Created",
  OK: "Success",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatus = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatus : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata,
    options = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}

export { SuccessResponse, OK, CREATED };
