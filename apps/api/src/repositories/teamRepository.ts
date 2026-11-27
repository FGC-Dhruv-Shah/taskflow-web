import { Team } from "../entities/team";
import { BaseRepository } from "./baseRepository";

/** CRUD for teams, with membership lookups. */
export class TeamRepository extends BaseRepository<Team> {
  listForMember(userId: string): Team[] {
    return this.listAll().filter((t) => t.memberIds.includes(userId));
  }
}
