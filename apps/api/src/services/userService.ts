import { createHash } from "crypto";
import { normalizeText, validateEmail, validatePasswordStrength, ValidationError } from "@taskflow/shared";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import { AuditService } from "./auditService";

/** Orchestrates user registration and authentication. */
export class UserService {
  constructor(private userRepository: UserRepository, private auditService: AuditService) {}

  registerUser(name: string, email: string, password: string): User {
    validateEmail(email);
    validatePasswordStrength(password);
    const cleanName = normalizeText(name);
    if (cleanName.length === 0) {
      throw new ValidationError("Name cannot be empty");
    }
    if (this.userRepository.emailExists(email)) {
      throw new ValidationError(`Email '${email}' is already registered`);
    }
    const user = new User({
      id: this.userRepository.newId(),
      name: cleanName,
      email,
      passwordHash: this.hashPassword(password),
    });
    return this.userRepository.create(user);
  }

  authenticateUser(email: string, password: string): User {
    const user = this.userRepository.getByEmail(email);
    if (user.passwordHash !== this.hashPassword(password)) {
      throw new ValidationError("Invalid email or password");
    }
    return user;
  }

  updateProfile(userId: string, name: string): User {
    const cleanName = normalizeText(name);
    if (cleanName.length === 0) {
      throw new ValidationError("Name cannot be empty");
    }
    return this.userRepository.update(userId, { name: cleanName });
  }

  /** Mark a user account as inactive. */
  deactivateUser(userId: string): User {
    const user = this.userRepository.update(userId, { isActive: false });
    this.auditService.recordEvent("user", userId, "deactivated");
    return user;
  }

  /** Mark a previously-deactivated user account as active again. */
  reactivateUser(userId: string): User {
    const user = this.userRepository.update(userId, { isActive: true });
    this.auditService.recordEvent("user", userId, "reactivated");
    return user;
  }

  private hashPassword(password: string): string {
    return createHash("sha256").update(password).digest("hex");
  }
}
