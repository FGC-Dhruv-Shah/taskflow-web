/** A group of users collaborating across projects. */
export class Team {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  memberIds: string[];
  createdAt: Date;

  constructor(params: { id: string; name: string; slug: string; ownerId: string; memberIds?: string[] }) {
    this.id = params.id;
    this.name = params.name;
    this.slug = params.slug;
    this.ownerId = params.ownerId;
    this.memberIds = params.memberIds ?? [params.ownerId];
    this.createdAt = new Date();
  }

  toDict() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      memberIds: [...this.memberIds],
    };
  }
}
