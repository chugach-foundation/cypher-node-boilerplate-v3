import { Finality } from '@solana/web3.js'
import { Cluster } from '@chugach-foundation/cypher-client'
import dotEnv from 'dotenv'

/* -------------------------------------------------------------------------- */

dotEnv.config({
  path: __dirname + `/../../${process.env.NODE_ENV}.env`,
})

/* -------------------------------------------------------------------------- */

export const CLUSTER = (process.env.CLUSTER || 'localnet') as Cluster
export const COMMITMENT = (process.env.COMMITMENT || 'confirmed') as Finality
export const IS_DEV_ENV = process.env.NODE_ENV === 'development'
export const IS_TEST_ENV = process.env.NODE_ENV === 'test'
export const IS_STAGE_ENV = process.env.NODE_ENV === 'stage'
export const IS_PROD_ENV = process.env.NODE_ENV === 'production'
export const RPC_KEY_MAINNET = process.env.RPC_KEY_MAINNET
export const RPC_KEY_DEVNET = process.env.RPC_KEY_DEVNET
export const RPC_ADDRESS_DEVNET = process.env.RPC_ADDRESS_DEVNET
export const RPC_ADDRESS_MAINNET = process.env.RPC_ADDRESS_MAINNET
export const RPC_ADDRESS_LOCALNET = process.env.RPC_ADDRESS_LOCALNET
export const RPC_ADDRESS_TESTNET = process.env.RPC_ADDRESS_TESTNET

