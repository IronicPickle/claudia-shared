export enum GenericErrorCode {
  InternalServerError = "INTERNAL_SERVER_ERROR",
  ValidationError = "VALIDATION_ERROR",
  NotFound = "NOT_FOUND",
  AlreadyExists = "ALREADY_EXISTS",
  Unauthorized = "UNAUTHORIZED",
  Forbidden = "FORBIDDEN",
  KyError = "KY_ERROR",
  BadRequest = "BAD_REQUEST",
  InvalidToken = "InvalidToken",
  NotImplemented = "NOT_IMPLEMENTED",
  TooEarly = "TOO_EARLY",
}

export enum OrganisationRole {
  Member = "MEMBER",
  Admin = "ADMIN",
  Owner = "OWNER",
}
