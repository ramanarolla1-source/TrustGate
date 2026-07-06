/**
 * TrustGate: Lifecycle Audit Logger
 * Provides structured logging for immutable audit trails.
 */

const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logFile = path.join(__dirname, '../../audit.log');
  }

  /**
   * Logs lifecycle events to the audit trail.
   * @param {string} stage - The current compliance stage (e.g., 'EVALUATION', 'ATTESTATION').
   * @param {Object} data - The event details to record.
   */
  logEvent(stage, data) {
    const entry = {
      timestamp: new Date().toISOString(),
      stage: stage,
      ...data
    };

    const logMessage = JSON.stringify(entry) + '\n';

    // Log to console for real-time visibility
    console.log(`[AUDIT:${stage}] ${JSON.stringify(data)}`);

    // Append to audit log file for persistent record
    fs.appendFileSync(this.logFile, logMessage);
  }
}

module.exports = new Logger();
