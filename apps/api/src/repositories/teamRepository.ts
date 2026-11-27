import { Team } from "../entities/team";
import { BaseRepository } from "./baseRepository";

/** CRUD for teams, with membership lookups. */
export class TeamRepository extends BaseRepository<Team> {
  listForMember(userId: string): Team[] {
    return this.listAll().filter((t) => t.memberIds.includes(userId));
  }

  listPublicTeams(): Team[] {
    return this.listAll().filter((t) => t.isPublic);
  }

  listOwnedBy(ownerId: string): Team[] {
    return this.listAll().filter((t) => t.ownerId === ownerId);
  }

  findBySlug(slug: string): Team | undefined {
    return this.listAll().find((t) => t.slug === slug);
  }

  countMembersAcrossTeams(): number {
    return this.listAll().reduce((sum, t) => sum + t.memberIds.length, 0);
  }
}
