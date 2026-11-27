/** A workspace that groups related tasks. */
export class Project {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  budget: number;
  currency: string;
  isArchived: boolean;
  isDeleted: boolean;
  createdAt: Date;

  constructor(params: {
    id: string;
    name: string;
    slug: string;
    ownerId: string;
    budget?: number;
    currency?: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.slug = params.slug;
    this.ownerId = params.ownerId;
    this.budget = params.budget ?? 0;
    this.currency = params.currency ?? "USD";
    this.isArchived = false;
    this.isDeleted = false;
    this.createdAt = new Date();
  }

  toDict() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      ownerId: this.ownerId,
      budget: this.budget,
      isArchived: this.isArchived,
    };
  }
}
