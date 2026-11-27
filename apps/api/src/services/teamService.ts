import { normalizeText, slugify, ValidationError } from "@taskflow/shared";
import { Team } from "../entities/team";
import { TeamRepository } from "../repositories/teamRepository";
import { NotificationService } from "./notificationService";

/** Orchestrates team creation and membership changes. */
export class TeamService {
  constructor(private teamRepository: TeamRepository, private notificationService: NotificationService) {}

  createTeam(name: string, ownerId: string): Team {
    const cleanName = normalizeText(name);
    if (cleanName.length === 0) {
      throw new ValidationError("Team name cannot be empty");
    }
    const team = new Team({
      id: this.teamRepository.newId(),
      name: cleanName,
      slug: slugify(cleanName),
      ownerId,
    });
    return this.teamRepository.create(team);
  }

  addMember(teamId: string, userId: string): Team {
    const team = this.teamRepository.get(teamId);
    if (team.memberIds.includes(userId)) {
      return team;
    }
    const updated = this.teamRepository.update(teamId, { memberIds: [...team.memberIds, userId] });
    this.notificationService.notifyTeam(teamId, `A new member joined ${team.name}`);
    return updated;
  }

  removeMember(teamId: string, userId: string): Team {
    const team = this.teamRepository.get(teamId);
    const remaining = team.memberIds.filter((id) => id !== userId);
    return this.teamRepository.update(teamId, { memberIds: remaining });
  }
}
