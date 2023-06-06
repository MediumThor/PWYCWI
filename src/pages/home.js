import Image from 'next/image'
import Header from "src/components/Header/Header";
import HeaderLinks from 'src/components/Header/HeaderLinks';
import Services from "src/components/Sections/Services"
import Events from "src/components/Sections/Events"
import Contact from "src/components/Sections/Contact"
import Porthole from "src/components/Sections/Porthole"
import Weather from '../components/Sections/Weather'
import SectionHome from "src/components/Sections/SectionHome"
import styles from 'src/styles/Home.module.scss'
import ScrollToTop from "react-scroll-to-top";
import styled from 'styled-components'
import { React, useRef } from "react";
import "src/styles/Home.module.scss";


export default function Home() {




  return (


    <div >
      <Header
        brand="Port Washington Yacht Club"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        changeColorOnScroll={{
          height: 200,
          color: "dark",
        }} />
      <div>
        <SectionHome />
        <Services />
        <Events />
        {/**<Porthole />**/}
        <Weather />
        <Contact />
      </div>
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
        <div>
          <div style={{ marginTop: "15vh" }} />
          <ScrollToTop smooth top='600' />
        </div>
      </footer>
    </div>

  )
}


const TitleWrapper = styled.div`
margin-top: 350px;
color: black;
font-size: 40px;
&:hover,
&:focus-within {
  color: #22C984;
}
@media only screen and  

(max-width: 768px) { 

}

@media only screen and (max-width: 1375px) and (min-width: 769px) { 
 

  }
`

const BackgroundBox = styled.div`
margin-top: 400px;
width: 90%;
font-size: 40px;
&:hover,
&:focus-within {
  color: #22C984;
}
@media only screen and  

(max-width: 768px) { 

}

@media only screen and (max-width: 1375px) and (min-width: 769px) { 
 

  }
`

const Main = styled.div`

font-size: 40px;
justify-content: center;
&:hover,
&:focus-within {
  color: #22C984;
}
@media only screen and  

(max-width: 768px) { 
}

@media only screen and (max-width: 1375px) and (min-width: 769px) { 
 
  }
`
