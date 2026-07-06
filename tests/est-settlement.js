/**
 * TrustGate: CCP Settlement Test Suite
 * Validates the full lifecycle: Attestation -> CCP Escrow -> Settlement.
 */

const assert = require('assert');
const trustGate = require('../src/index');
const ccpClient = require('../src/ccp-client');

describe('TrustGate CCP Settlement Lifecycle', () => {
  
  it('should successfully execute settlement when attestation is valid', async () => {
    // Mock counterparty data
    const mockData = { tx_id: "TX_12345", amount: 50000 };
    const mockEscrow = "0xEscrowContractAddress";

    // Initialize TrustGate
    const tg = new trustGate();

    // Execute full lifecycle
    const result = await tg.verify(mockData, mockEscrow);

    // Assert success
    assert.strictEqual(result.success, true, "Lifecycle should complete successfully");
    assert.ok(result.transactionHash, "Transaction hash should be generated");
    console.log("[TEST] Settlement lifecycle validated successfully.");
  });

  it('should fail settlement if compliance check is invalid', async () => {
    // This test ensures the firewall blocks unsafe transactions
    const invalidData = { tx_id: "TX_BAD", amount: 0 }; 
    const tg = new trustGate();

    const result = await tg.verify(invalidData, "0xAddress");

    assert.strictEqual(result.success, false, "Lifecycle should fail for invalid data");
  });
});
