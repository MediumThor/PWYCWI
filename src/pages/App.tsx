

import React from 'react'
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli, Avalanche, AvalancheTestnet } from '@usedapp/core'
import Home from "./home"







export default function App() {


  const config: Config = {
    readOnlyChainId: AvalancheTestnet.chainId,
    // readOnlyChainId: Avalanche.chainId,


    readOnlyUrls: {

      // [Avalanche.chainId]: 'https://api.avax.network/ext/bc/C/rpc',

      [AvalancheTestnet.chainId]: 'https://api.avax-test.network/ext/bc/C/rpc'


    },
    multicallVersion: 1 as const,
  }



  return (

    <DAppProvider config={config}>
      <Home />

    </DAppProvider>




  )
}

