import { TeamRepository } from "../repositories/teamRepository";
import { UserRepository } from "../repositories/userRepository";

/** Builds lightweight membership statistics across teams. */
export class TeamAnalyticsService {
  constructor(private teamRepository: TeamRepository, private userRepository: UserRepository) {}

  getOwnerSummary(ownerId: string): Record<string, unknown> {
    const teams = this.teamRepository.listOwnedBy(ownerId);
    const totalMembers = teams.reduce((sum, team) => sum + team.memberIds.length, 0);
    return {
      ownerId,
      teamCount: teams.length,
      totalMembers,
      publicTeamCount: teams.filter((t) => t.isPublic).length,
    };
  }

  getActiveMemberCount(): number {
    return this.userRepository.listAll().filter((u) => u.isActive).length;
  }
}
