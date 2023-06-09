import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "../components/Header/Header";
import HeaderLinks from '../components/Header/HeaderLinks';
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli, Avalanche } from '@usedapp/core'





export default function Home() {

  const config: Config = {
    readOnlyChainId: Avalanche.chainId,


    readOnlyUrls: {

      [Avalanche.chainId]: 'https://api.avax.network/ext/bc/C/rpc',

      // [AvalancheTestnet.chainId]: 'https://api.avax-test.network/ext/bc/C/rpc'


    },
    multicallVersion: 1 as const,
  }



  return (
    <DAppProvider config={config}>

      <div className={styles.container}>

        <Header
          brand="PWYC"
          leftLinks
          rightLinks={<HeaderLinks />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 20,
            color: "dark",
          }}
        />

        <div className={styles.container}>


          <Head >
            <title>Full Circle Compost</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

        </div>


        <main className={styles.main}>

        </main>


        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>


        </footer>

      </div>
    </DAppProvider>

  )
}
