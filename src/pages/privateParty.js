import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';

import SectionHome from "src/components/SectionsClubTablet/TabletHome.jsx";
import styles from 'src/styles/Home.module.scss';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import Cam from '../components/Sections/Cam';
import Cookies from 'js-cookie';  // Add this line
import CrewCardsSection from '../components/SectionsMembers/CrewCards';


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

export default function PrivateParty() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCaptain, setIsCaptain] = useState(false); // State to check if user is a Captain
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user || Cookies.get('specialUser') === 'true') {
                setIsAuthenticated(true);

                // Check for custom claim 'Captain'
                user.getIdTokenResult().then(idTokenResult => {
                    if (idTokenResult.claims.captain) { // Notice the lowercase 'c'
                        setIsCaptain(true);
                    }
                });
            } else {
                setIsAuthenticated(false);
                router.push('/');
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, [router]);

    if (!isAuthenticated) {
        return null; // or return <LoadingComponent />
    }

    return (
        <div>

            <div>
                <SectionHome />



            </div>
        </div>
    );
}


const TitleWrapper = styled.div`
margin-top: 350px;
color: black;
font-size: 40px;
&:hover,
&:focus-within {
  color: #22C984;
}
@media only screen and (max-width: 768px) { }
@media only screen and (max-width: 1375px) and (min-width: 769px) { }
`;


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
