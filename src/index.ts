/**
 * Audit Logger
 * 
 * Standalone library for security audit logging.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface AuditEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  action: string;
  user?: string;
  resource?: string;
  details?: Record<string, any>;
}

export class AuditLogger {
  private logs: AuditEntry[] = [];

  log(entry: Omit<AuditEntry, 'id' | 'timestamp'>): AuditEntry {
    const newEntry: AuditEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };
    this.logs.push(newEntry);
    return newEntry;
  }

  getAll(): AuditEntry[] {
    return [...this.logs];
  }

  getByAction(action: string): AuditEntry[] {
    return this.logs.filter(l => l.action === action);
  }

  getByUser(user: string): AuditEntry[] {
    return this.logs.filter(l => l.user === user);
  }

  clear(): void {
    this.logs = [];
  }
}

export default AuditLogger;
