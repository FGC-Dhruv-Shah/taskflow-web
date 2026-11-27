import { Project } from "../entities/project";
import { BaseRepository } from "./baseRepository";

/**
 * CRUD for projects, with a soft-delete override. `delete` does not remove
 * the row: it flags the project as deleted so history/reporting views can
 * still resolve the id. This repository never purges a project from the
 * store.
 */
export class ProjectRepository extends BaseRepository<Project> {
  delete(projectId: string): void {
    this.update(projectId, { isDeleted: true } as Partial<Project>);
  }

  listForOwner(ownerId: string): Project[] {
    return this.listAll().filter((p) => p.ownerId === ownerId && !p.isDeleted);
  }
}
