import { randomUUID } from "crypto";

export interface AuditLogEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  createdAt: Date;
}

/** Lightweight in-memory audit trail for account and team lifecycle events. */
export class AuditService {
  private entries: AuditLogEntry[] = [];

  recordEvent(entityType: string, entityId: string, action: string): AuditLogEntry {
    const entry: AuditLogEntry = { id: randomUUID(), entityType, entityId, action, createdAt: new Date() };
    this.entries.push(entry);
    console.log(`Audit event recorded: ${entityType} ${entityId} ${action}`);
    return entry;
  }

  listForEntity(entityType: string, entityId: string): AuditLogEntry[] {
    return this.entries.filter((e) => e.entityType === entityType && e.entityId === entityId);
  }
}
