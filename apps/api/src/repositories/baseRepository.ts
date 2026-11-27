import { randomUUID } from "crypto";
import { NotFoundError } from "@taskflow/shared";

/**
 * Generic in-memory store shared by all entity-specific repositories. A
 * real deployment would back this with a database session; the in-memory
 * store keeps this reference service self-contained while preserving the
 * same method contracts the service layer depends on.
 */
export class BaseRepository<T extends { id: string }> {
  protected store = new Map<string, T>();

  create(entity: T): T {
    this.store.set(entity.id, entity);
    return entity;
  }

  get(id: string): T {
    const entity = this.store.get(id);
    if (!entity) {
      throw new NotFoundError(`No entity found for id '${id}'`);
    }
    return entity;
  }

  /** Apply `fields` onto the stored entity. */
  update(id: string, fields: Partial<T>): T {
    const entity = this.get(id);
    Object.assign(entity as object, fields);
    return entity;
  }

  /** Write an entity into the store. */
  persist(entity: T): T {
    this.store.set(entity.id, entity);
    return entity;
  }

  delete(id: string): void {
    this.store.delete(id);
  }

  listAll(): T[] {
    return Array.from(this.store.values());
  }

  exists(id: string): boolean {
    return this.store.has(id);
  }

  count(): number {
    return this.store.size;
  }

  newId(): string {
    return randomUUID();
  }
}
