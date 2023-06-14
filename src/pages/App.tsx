import Image from 'next/image'
import Header from "../components/Header/Header";
import HeaderLinks from '../components/Header/HeaderLinks';
import Services from "../components/Sections/Services"
import Events from "../components/Sections/Events"
import Contact from "../components/Sections/Contact"
import Porthole from "../components/Sections/Porthole"
import Weather from '../components/Sections/Weather'
import SectionHome from "../components/Sections/SectionHome"
import styles from '../styles/Home.module.scss'
import styled from 'styled-components'
import React, { useEffect, useState } from "react";
import "../styles/Home.module.scss";
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import Cam from '../components/Sections/Cam';
import SectionWithVideo from '../components/Sections/VideoSection';
import ParallaxImage from '../components/ParallaxSection1';
import ParallaxImage2 from '../components/ParallaxSection2';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '4%',
    right: '4%',
    backgroundColor: 'rgb(232,227,212, 0.4)',
    borderRadius: '5px',
    opacity: 0,
    transition: 'opacity 0.5s',

    '&:hover': {
      backgroundColor: 'rgb(232,227,212, 0.6)', // make button lighter when hovered over
    },
  },
  visible: {
    opacity: 1,
  },
}));




function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Event to listen to the scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  return (
    <IconButton
      onClick={handleClick}
      className={`${classes.root} ${isVisible ? classes.visible : ''}`}
    >
      <ArrowUpwardIcon />
    </IconButton>
  );
}

export default function Home() {


  return (

    <div className={styles['fade-in']}>

      <div >
        <Header
          brand="Port Washington Yacht Club"
          rightLinks={<HeaderLinks />}
          fixed
          color="dark"
          changeColorOnScroll={{
            height: 20,
            color: "dark",
          }} />
        <div>
          <SectionHome />
          <ParallaxImage />
          <SectionWithVideo />
          <Services />
          <ParallaxImage2 />
          <Events />
          {/**<Porthole />**/}
          <Weather />
          <Cam />
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
            <ScrollToTop />
          </div>
        </footer>
      </div>
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
