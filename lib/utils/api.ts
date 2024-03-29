import { GenericErrorCode } from "../enums/api.ts";
import { ApiError, ValidatorInputs } from "@shared/lib/ts/api/generic.ts";
import { ApiCallRes, ValidationErrors } from "../ts/api/generic.ts";
import { RequestDetails } from "@shared/lib/ts/api/generic.ts";
import { RequestInputs } from "@shared/lib/ts/api/generic.ts";
import { RequestResponse } from "@shared/lib/ts/api/generic.ts";

export const parseBody = async <B>(ctx: any) => {
  let body: B | null;
  try {
    body = await ctx.request.body({
      type: "json",
      limit: 0,
    }).value;
  } catch (_err) {
    return null;
  }
  return body;
};

export const parseParams = <B>(ctx: any) => {
  return ctx.params as B;
};

export const ok =
  (body: any = { message: "success" }, statusCode = 200) =>
  (ctx: any) => {
    ctx.response.body = JSON.stringify(body);
    ctx.response.headers.append("Content-Type", "application/json");
    ctx.response.status = statusCode;
  };

export const error =
  (
    error: string,
    errorCode: string = GenericErrorCode.InternalServerError,
    statusCode = 500
  ) =>
  (ctx: any) =>
    ok({ error, errorCode }, statusCode)(ctx);

export const badRequestError =
  (
    error: string,
    errorCode: string = GenericErrorCode.BadRequest,
    statusCode = 400
  ) =>
  (ctx: any) =>
    ok({ error, errorCode }, statusCode)(ctx);

export const notFoundError =
  (error: string, errorCode: string = GenericErrorCode.NotFound) =>
  (ctx: any) =>
    ok(
      {
        error,
        errorCode,
        validation: { failed: false },
      },
      404
    )(ctx);

export const validationError =
  (validation: ValidationErrors<any>) => (ctx: any) =>
    ok(
      {
        error: "Validation failed",
        errorCode: GenericErrorCode.ValidationError,
        validation,
      },
      400
    )(ctx);

export const conflictError =
  (
    error = "Resource already exists",
    errorCode: string = GenericErrorCode.AlreadyExists
  ) =>
  (ctx: any) =>
    ok(
      {
        error,
        errorCode,
      },
      409
    )(ctx);

export const unauthorizedError =
  (error = "Unauthorized", errorCode: string = GenericErrorCode.Unauthorized) =>
  (ctx: any) =>
    ok(
      {
        error,
        errorCode,
      },
      401
    )(ctx);

export const forbiddenError =
  (error = "Forbidden", errorCode: string = GenericErrorCode.Forbidden) =>
  (ctx: any) =>
    ok(
      {
        error,
        errorCode,
      },
      403
    )(ctx);

export const isResError = <RD extends RequestDetails>(
  res: ApiCallRes<RD>
): res is {
  error: ApiError<keyof ValidatorInputs<RD>>;
} => !!(res as any).error;

export const isResData = <RD extends RequestDetails>(
  res: ApiCallRes<RD>
): res is {
  data: RequestResponse<RD>;
} => !!(res as any).data;
