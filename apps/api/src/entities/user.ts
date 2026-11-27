/** A registered TaskFlow account. */
export class User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;

  constructor(params: { id: string; name: string; email: string; passwordHash: string }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.passwordHash = params.passwordHash;
    this.isActive = true;
    this.createdAt = new Date();
  }

  toDict() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      isActive: this.isActive,
    };
  }
}
