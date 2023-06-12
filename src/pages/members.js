import Image from 'next/image'
import Header from "src/components/Header/HeaderMembers";
import HeaderLinks from 'src/components/Header/HeaderLinksMembers';
import Services from "src/components/Sections/Services"
import Events from "src/components/SectionsMembers/Events"
import Contact from "src/components/Sections/Contact"
import Porthole from "src/components/SectionsMembers/Porthole"
import Weather from '../components/Sections/Weather'
import SectionHome from "src/components/SectionsMembers/MembersSectionHome"
import styles from 'src/styles/Home.module.scss'
import styled from 'styled-components'
import { React, useRef } from "react";
import "src/styles/Home.module.scss";


import "../styles/Home.module.scss";
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import Cam from '../components/Sections/Cam';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '4%',
    right: '4%',
    backgroundColor: 'rgb(232,227,212, 0.4)',
    borderRadius: '5px',

    '&:hover': {
      backgroundColor: 'rgb(232,227,212, 0.6)', // make button lighter when hovered over
    },
  },
}));

function ScrollToTop() {
  const classes = useStyles();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <IconButton
      onClick={handleClick}
      className={classes.root}
    >
      <ArrowUpwardIcon />
    </IconButton>
  );
}

export default function Members() {




  return (


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
        <Services />
        <Events />
        <Porthole />
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
