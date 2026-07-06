/**
 * TrustGate: ZK-Verification Test Suite
 * Validates the BN254/ZK-ElGamal attestation logic.
 */

const assert = require('assert');
const attestationEngine = require('../src/attestation');

describe('TrustGate Attestation Engine', () => {

  it('should generate a valid ZK-Attestation from a compliant risk profile', async () => {
    // Mock risk profile returned by firewall.js
    const mockProfile = {
      isCompliant: true,
      jurisdictionCheck: true,
      amlScan: true,
      sanctionsScan: true
    };

    // Generate attestation
    const attestation = await attestationEngine.generateAttestation(mockProfile);

    // Assertions
    assert.ok(attestation.attestationId, "Attestation ID should be generated");
    assert.strictEqual(attestation.status, "VERIFIED_COMPLIANT");
    assert.ok(attestation.proof, "ZK-Proof should be present");
    console.log("[TEST] ZK-Attestation generation validated.");
  });

  it('should throw an error for non-compliant profiles', async () => {
    const invalidProfile = { isCompliant: false };

    await assert.rejects(async () => {
      await attestationEngine.generateAttestation(invalidProfile);
    }, /Attestation Generation Failed/);
    
    console.log("[TEST] Engine correctly rejected non-compliant profile.");
  });
});
