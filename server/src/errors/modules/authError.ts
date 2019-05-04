import { BaseError } from "../baseError";

enum AuthErrorStatus {
  NO_SUCH_USER = "NO_SUCH_USER",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS"
}

export class AuthError extends BaseError {
  public static Status = AuthErrorStatus;
  public static Type = "AuthError";
  constructor(status: AuthErrorStatus, description?: string) {
    super(AuthError.Type, status, description);
  }
}
