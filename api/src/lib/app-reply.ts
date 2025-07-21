import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function reply(res: Response, data?: any): void {
  res.status(StatusCodes.OK).json(data).end();
}
