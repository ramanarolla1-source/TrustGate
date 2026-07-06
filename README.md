<img width="1024" height="559" alt="TrustGate" src="https://github.com/user-attachments/assets/d9c59630-e81c-462b-8f7e-db3983a67d98" />

One ager: https://docs.google.com/document/d/1U6uNdAg_0GzYawfi_wGE9XYX7k-FCioxcBeM3ghMiQk/edit?usp=sharing
PPT Deck: https://docs.google.com/presentation/d/1m8jxReehcJyfQTBeWy_lNR-djp0xBWFjDZfH7w2og28/edit?usp=sharing
Demo Video: https://youtu.be/_HME8PgDo04

# TrustGate
TrustGate: The programmable compliance firewall for the Agent Economy. Automate ZK-verified risk assessment and secure on-chain settlement for high-value A2A commerce via the CROO Coordination Protocol.

## The Problem
As autonomous Agent-to-Agent (A2A) commerce scales, it lacks a native, automated compliance fabric. Agents operate in silos, unable to reliably verify counterparty risk or execute safe, regulatory-compliant settlements without manual friction.

## The Solution
TrustGate is an API-callable compliance firewall that enables agents to "hire" automated, institutional-grade verification. By utilizing ZK-primitives (BN254/ZK-ElGamal), TrustGate generates immutable attestations that act as the cryptographic keys required to unlock on-chain escrow contracts.

## Architecture
![TrustGate Architecture](assets/diagram.png)
__________________________________________________________________________
| LAYER 1: APPLICATION (CROO Agent Store / CAP)                            |
| [ External Agent A ] ----> ( Discovery & Hire ) ----> [ TrustGate Agent ]  |
|__________________________________________________________________________|
                                     |
                                     v
 __________________________________________________________________________
| LAYER 2: TRUSTGATE FIREWALL (The Core Enclave)                            |
|  ________________          ________________          _________________   |
| | Risk-Classifier | ----> | BN254 / ElGamal | ----> | ZK-Attestation |  |
| |__(Evaluation)___|       |____(Forge)______|       |______(Key)______|  |
|__________________________________________________________________________|
                                     |
                                     v
 __________________________________________________________________________
| LAYER 3: EXECUTION (CROO Coordination Protocol - CCP)                    |
| [ CCP Escrow Contract ] <---- ( Verifies Key ) ---- [ USDC Settlement ]    |
|__________________________________________________________________________|
                                     |
                                     v
 __________________________________________________________________________
| LAYER 4: SETTLEMENT (Base Mainnet)                                       |
| [ Account Abstraction ] ----> [ Immutable Ledger Audit Trail ]           |
|__________________________________________________________________________|

## Core Workflow
1. **Discovery:** The agent initiates a service request to TrustGate via the CROO Agent Store.
2. **Verification:** TrustGate evaluates counterparty risk using ZK-primitives.
3. **Attestation:** A cryptographically signed ZK-Attestation is generated.
4. **Execution:** The CCP escrow contract verifies the attestation and triggers USDC settlement on Base.
5. **Audit:** The entire lifecycle is logged to the distributed ledger for regulatory transparency.

## Why TrustGate Wins
- **Foundational Infrastructure:** A reusable security layer that lowers risk for the entire agent economy.
- **Protocol-Native:** Designed to operate natively within the CROO Coordination Protocol (CCP).
- **Revenue-Ready:** A sustainable per-call service fee model ($0.05–$1.00) proving commercial maturity.

## Quick Start
```bash
npm install @croo/connect-sdk
