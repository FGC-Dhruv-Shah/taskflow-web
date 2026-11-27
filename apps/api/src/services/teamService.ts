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

  /** Return the ids of every member on a team. */
  listMembers(teamId: string): string[] {
    const team = this.teamRepository.get(teamId);
    return [...team.memberIds];
  }

  /** Send an arbitrary announcement to every member of a team. */
  broadcastAnnouncement(teamId: string, message: string): void {
    this.teamRepository.get(teamId);
    this.notificationService.notifyTeam(teamId, message);
  }

  /** Mark a team as discoverable in the public team directory. */
  makePublic(teamId: string): Team {
    return this.teamRepository.update(teamId, { isPublic: true });
  }

  /** Remove a team from the public directory. */
  makePrivate(teamId: string): Team {
    return this.teamRepository.update(teamId, { isPublic: false });
  }
}
