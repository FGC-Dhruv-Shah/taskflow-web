/**
 * Outbound notifications. A real deployment would push to email or a
 * websocket channel; here every call is logged so the rest of the system
 * has a stable interface to depend on.
 */
export class NotificationService {
  notifyUser(userId: string, message: string): void {
    console.log(`Notifying user ${userId}: ${message}`);
  }

  notifyTeam(teamId: string, message: string): void {
    console.log(`Notifying team ${teamId}: ${message}`);
  }

  notifyProjectMembers(projectId: string, message: string): void {
    console.log(`Notifying members of project ${projectId}: ${message}`);
  }
}
