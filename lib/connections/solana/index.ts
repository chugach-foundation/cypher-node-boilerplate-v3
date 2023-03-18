import { Connection, ConfirmOptions } from '@solana/web3.js'
import { EventParser } from '@project-serum/anchor'
import { CONFIGS, CypherClient } from '@chugach-foundation/cypher-client'
import {
  CLUSTER,
  RPC_ADDRESS_DEVNET,
  RPC_ADDRESS_LOCALNET,
  RPC_ADDRESS_MAINNET,
  RPC_ADDRESS_TESTNET,
  RPC_KEY_DEVNET,
  RPC_KEY_MAINNET,
} from '../../config'
import { cypherCoder } from '@chugach-foundation/cypher-client'

/* -------------------------------------------------------------------------- */

export const getRpcEndpoint = (cluster: string) => {
  switch (cluster) {
    case 'mainnet-beta':
      return RPC_ADDRESS_MAINNET + '/' + RPC_KEY_MAINNET
    case 'testnet':
      return RPC_ADDRESS_TESTNET
    case 'devnet':
      return RPC_ADDRESS_DEVNET + '/' + RPC_KEY_DEVNET
    case 'localnet':
      return RPC_ADDRESS_LOCALNET
    default:
      throw new Error('Invalid cluster.')
  }
}

/* -------------------------------------------------------------------------- */

class ClientProvider {
  static get confirmOpts(): ConfirmOptions {
    return {
      commitment: 'confirmed',
      preflightCommitment: 'confirmed',
    }
  }

  get connection() {
    return new Connection(getRpcEndpoint(CLUSTER), ClientProvider.confirmOpts)
  }

  get config() {
    return CONFIGS[CLUSTER]
  }

  get cypherPid() {
    return this.config.CYPHER_PID
  }

  get rpcEndpoint() {
    return getRpcEndpoint(CLUSTER)
  }

  get client() {
    const client = new CypherClient(CLUSTER, this.rpcEndpoint)
    return client
  }
}

/* -------------------------------------------------------------------------- */

export const clientProvider = new ClientProvider()
export const eventParser = new EventParser(
  clientProvider.cypherPid,
  cypherCoder,
)
