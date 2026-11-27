import { ValidationError } from "./errors";

const EMAIL_PATTERN = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_LENGTH = 8;

/** Raise `ValidationError` if `email` is not a syntactically valid address. */
export function validateEmail(email: string): void {
  if (!email || !EMAIL_PATTERN.test(email)) {
    throw new ValidationError(`'${email}' is not a valid email address`);
  }
}

/** Raise `ValidationError` if `password` does not meet the minimum policy. */
export function validatePasswordStrength(password: string): void {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new ValidationError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
  }
}

/** Raise `ValidationError` if `name` is empty or exceeds the length limit. */
export function validateProjectName(name: string): void {
  if (!name) {
    throw new ValidationError("Project name cannot be empty");
  }
  if (name.length > 120) {
    throw new ValidationError("Project name cannot exceed 120 characters");
  }
}
