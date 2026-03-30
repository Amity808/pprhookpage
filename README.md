# Umbra Finance - Frontend Dashboard

**Private By Design: The UI for the Confidential Dark Pool & Rebalancing Hook on Uniswap v4**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![FHE SDK](https://img.shields.io/badge/FHE-CoFHE_SDK-purple)](https://fhenix.io/)
[![Wagmi](https://img.shields.io/badge/Web3-Wagmi-blue)](https://wagmi.sh/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 💡 What is Umbra Finance? (The Idea)

**Umbra Finance is a fully decentralized "Dark Pool" and portfolio rebalancing protocol built directly on top of Uniswap v4.** 

In DeFi, *every single action*—from placing limit orders to setting Automated Market Maker (AMM) parameters—is entirely public on the blockchain. When institutional or retail investors want to rebalance a portfolio, sophisticated MEV bots and copycat traders can see the transaction in the mempool and exploit it (sandwich attacks, front-running), causing massive slippage and loss of funds.

**The Solution:** Umbra Finance acts as a Uniswap v4 Hook that allows users to place **completely encrypted Dark Orders** and automated **Confidential Rebalancing Strategies**. Using Fully Homomorphic Encryption (FHE) via the Fhenix network, the smart contract mathematically matches trades directly on the blockchain *without ever decrypting the amounts or the user's trading strategy!*

**This repository contains the Next.js interactive frontend dashboard that powers the end-user experience.**

---

## 🖥️ Frontend Architecture & Features

This dashboard utilizes the `@cofhe/sdk`, `wagmi`, and `viem` to safely abstract the complex cryptographic flows away from the user. 

### 1. Client-Side Encryption (`@cofhe/sdk`)
When a user configures a target allocation or places a Dark Order, the exact payload (e.g., "sell 5.5 ETH") is mathematically encrypted *client-side* in the browser using the CoFHE SDK before being sent to the RPC. 
- Cleartext strategy data never touches the mempool.
- Front-running is practically impossible.

### 2. Strategy Management UI
A seamless interface allowing users to dynamically create `strategyId` hashes, deploy FHE strategies to the Uniswap v4 Hook, and configure confidential multi-asset portfolios across Token0 and Token1 simultaneously. 

### 3. Selective Reveal ("Unseal") via EIP-712
To solve the UX problem of "blind" encrypted state, we implemented an EIP-712 localized signature permit system (`PermitUtils.createSelfAndSign`). Authorized strategy owners can cryptographically "unseal" and decrypt their on-chain ciphertexts to legally and visually verify their balances on the frontend, without exposing their position to the public ledger.

---

## 🚀 Quick Start / Local Development

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone this frontend repository
git clone https://github.com/Amity808/pprhookpage.git
cd pprhookpage

# Install dependencies
pnpm install
```

### Running the Development Server

```bash
pnpm run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live app. 
The interactive Dark Pool demo is located at: `http://localhost:3000/demo`

### Setting up the Smart Contracts

If you want to run the FHE Uniswap v4 Hook locally or deploy it to a testnet alongside this frontend:

```bash
# Clone the smart contract repository
git clone https://github.com/Amity808/fhe-hook-template.git
cd fhe-hook-template

# Install dependencies
npm install

# Compile the contracts and run the FHE test suites
forge build
forge test
```

### 💻 SDK Code Snippets

#### 1. Encrypting a Dark Order Payload (Client-Side)
```typescript
import { Encryptable } from "@cofhe/sdk";

// User defines a cleartext value (e.g., 1.0 Tokens) to trade
const amountBN = parseEther("1.0");

// The payload is encrypted locally in the browser UI
const [encAmount] = await cofheClient.encryptInputs([
    Encryptable.uint128(amountBN)
]).execute();

// The encrypted ciphertext is sent to the v4 Hook, hiding the order size
await walletClient.writeContract({
    address: HOOK_ADDRESS,
    abi: HOOK_ABI,
    functionName: 'placeDarkOrder',
    args: [poolKey, amountBN, encAmount, isBuyOrder]
});
```

#### 2. Selective Reveal / Unsealing On-Chain Data
```typescript
import { PermitUtils, FheTypes } from "@cofhe/sdk/permits";

// Generate a secure, 1-time EIP-712 signature permit from the wallet
const permit = await PermitUtils.createSelfAndSign(
    { issuer: userAddress, name: "Ephemeral Position Permit" },
    publicClient,
    walletClient
);

// Decrypt the on-chain encrypted position securely for the frontend UI
const unsealedPosition = await cofheClient.decryptForView(
    onChainCiphertextHash, 
    FheTypes.Uint128
).withPermit(permit).execute();

console.log(`Unsealed Balance: ${formatEther(unsealedPosition)}`);
```

---

## 🔗 Links & Repositories

- **Live Demo Website:** [https://pprhook.vercel.app](https://pprhook.vercel.app)
- **Interactive Dark Pool App:** [https://pprhook.vercel.app/demo](https://pprhook.vercel.app/demo)
- **Frontend Dashboard (This Repo):** [https://github.com/Amity808/pprhookpage](https://github.com/Amity808/pprhookpage)
- **Smart Contracts Repo:** [https://github.com/Amity808/fhe-hook-template](https://github.com/Amity808/fhe-hook-template)
- **Documentation Diagram:** [Canva Concept Diagram](https://www.canva.com/design/DAGzTpLdOSc/4i0IdBI577rFh4nSrodgZA/edit)

---

## 🤝 Contributing

We welcome contributions to the UI/UX! Please fork the repository, make your styling or logic changes on a feature branch, and submit a PR. 

## 📄 License & Contact

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

- **GitHub Issues**: [https://github.com/Amity808/pprhookpage/issues](https://github.com/Amity808/pprhookpage/issues)
- **Email**: bolarinwamuhdsodiq0@gmail.com

---

**Built with ❤️ for the Private By Design dApp Buildathon**

*Revolutionizing institutional trading with zero-knowledge rebalancing and internalized Dark Pools on Uniswap v4* 🚀
