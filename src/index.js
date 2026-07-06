/**
 * TrustGate: Main Entry Point
 * Orchestrates the Compliance-to-Settlement pipeline.
 */

const firewall = require('./firewall');
const attestationEngine = require('./attestation');
const CCPClient = require('./ccp-client');

class TrustGate {
  constructor(provider) {
    this.ccpClient = new CCPClient(provider);
    console.log("[SYS] TrustGate API Service Online");
  }

  /**
   * Main API Method: verify()
   * Initiates the full compliance-to-settlement lifecycle.
   */
  async verify(counterpartyData, escrowAddress) {
    try {
      console.log("[START] Initiating compliance lifecycle for:", counterpartyData.tx_id);

      // 1. Evaluate Risk
      const riskProfile = await firewall.evaluate(counterpartyData);
      
      if (!riskProfile.isCompliant) {
        throw new Error("Compliance check failed: Counterparty does not meet risk standards.");
      }

      // 2. Generate ZK-Attestation
      const attestation = await attestationEngine.generateAttestation(riskProfile);

      // 3. Execute Settlement on CCP
      const settlement = await this.ccpClient.submitSettlement(attestation, escrowAddress);

      return {
        success: true,
        transactionHash: settlement.hash,
        attestationId: attestation.attestationId
      };

    } catch (error) {
      console.error(`[ERROR] TrustGate Lifecycle Terminated: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}

module.exports = TrustGate;
