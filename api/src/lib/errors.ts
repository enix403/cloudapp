import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationErrorItem } from "joi";

interface ApplicationErrorOptions {
  /* Should log the error ? */
  log?: boolean;
  /* Extra object to output while logging */
  meta?: any;
}

export class ApplicationError extends Error {
  public readonly userMessage: string;
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly opts: ApplicationErrorOptions;

  constructor(
    msg: string,
    statusCode?: number,
    errorCode?: string,
    opts: ApplicationErrorOptions = {}
  ) {
    super(msg);
    this.userMessage = msg;
    this.statusCode = statusCode || StatusCodes.BAD_REQUEST;
    this.errorCode = errorCode || "unset";
    this.opts = opts;
  }

  public sendResponse(res: Response) {
    res.status(this.statusCode).json({
      isApiReplyError: true,
      errorMessage: this.userMessage,
      errorCode: this.errorCode,
      ...this.getExtraData()
    });
  }

  protected getExtraData(): object {
    return {};
  }
}

export class NotFound extends ApplicationError {
  constructor(msg?: string) {
    super(msg || "Resource not found", StatusCodes.NOT_FOUND, "not_found");
  }
}

export class BadRequest extends ApplicationError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST, "bad_request");
  }
}

export class Forbidden extends ApplicationError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN, "forbidden");
  }
}

export class ValidationError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? "Invalid input", StatusCodes.BAD_REQUEST, "val_err");
  }
}

export class JoiValidationError extends ValidationError {
  constructor(public readonly details: ValidationErrorItem[]) {
    super("Invalid input");
  }

  protected getExtraData(): object {
    return { details: this.details };
  }
}
