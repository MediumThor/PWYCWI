import Image from 'next/image'
import Header from "src/components/Header/Header";
import HeaderLinks from 'src/components/Header/HeaderLinks';
import Section1 from "src/components/Sections/Section1"
import Section2 from "src/components/Sections/Section2"
import Footer from "src/components/Sections/Section3"
import Section4 from "src/components/Sections/Section4"
import Weather from '../components/Sections/Section5'
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
        color="transparent"
        changeColorOnScroll={{
          height: 20,
          color: "dark",
        }} />
      <div>
        <SectionHome />
        <Section1 />
        <Section2 />
        <Section4 />
        <Weather />
        <Footer />
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
