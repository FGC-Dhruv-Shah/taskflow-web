import { NotFoundError } from "@taskflow/shared";
import { User } from "../entities/user";
import { BaseRepository } from "./baseRepository";

/** CRUD plus email lookup for users. */
export class UserRepository extends BaseRepository<User> {
  getByEmail(email: string): User {
    const user = this.listAll().find((u) => u.email === email);
    if (!user) {
      throw new NotFoundError(`No user registered with email '${email}'`);
    }
    return user;
  }

  emailExists(email: string): boolean {
    return this.listAll().some((u) => u.email === email);
  }
}
