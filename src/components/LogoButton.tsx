import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Button, Avatar } from '@mui/material';
import { Link } from 'react-scroll';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';


const TextDiv = styled.div`
     @media (max-width: 600px) {
   display: none;
    }
`;


const images = [
  {
    url: 'https://i.imgur.com/QmF9MdD.png',

    width: '100%',

  },

];




export function LogoLink({ to, onClick, children }) {
  // implement link functionality

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
}


export default function ButtonBases() {
  const theme = useTheme(); // Get the theme object


  const handleClick = (event) => {
    event.preventDefault(); // prevent the default action
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll smoothly to the top
  };

  return (
    <Link activeClass="active" to="sectionHome" spy={false} smooth={true} duration={1000} onClick={handleClick}
      style={{
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => (e.target.style.color = '#eee')}
      onMouseLeave={(e) => (e.target.style.color = '#E8E3D5')}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt="Start icon"
          src={images[0].url}
          sx={{
            marginLeft: theme.breakpoints.down(800) ? 0 : -10, // Apply -3 marginLeft at 800px and below
            width: 66,
            height: 66
          }}
        />        <TextDiv>
          <Typography variant="h6" component="div" sx={{ marginLeft: 2, textDecoration: 'none' }}>
            Port Washington Yacht Club
          </Typography>
        </TextDiv>
      </Box>

    </Link>
  );
}
