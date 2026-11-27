/** A group of users collaborating across projects. */
export class Team {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  memberIds: string[];
  isPublic: boolean;
  createdAt: Date;

  constructor(params: {
    id: string;
    name: string;
    slug: string;
    ownerId: string;
    memberIds?: string[];
    isPublic?: boolean;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.slug = params.slug;
    this.ownerId = params.ownerId;
    this.memberIds = params.memberIds ?? [params.ownerId];
    this.isPublic = params.isPublic ?? false;
    this.createdAt = new Date();
  }

  isOwner(userId: string): boolean {
    return this.ownerId === userId;
  }

  toDict() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      memberIds: [...this.memberIds],
      isPublic: this.isPublic,
    };
  }
}
