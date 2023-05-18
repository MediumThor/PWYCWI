import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Button, Avatar } from '@mui/material';


const images = [
  {
    url: 'https://cdn.discordapp.com/attachments/1090123749300379740/1108611479416098817/PWYC_LOGO2.png',

    width: '100%',

  },

];


export function Link({ to, onClick, children }) {
  // implement link functionality

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
}
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 40,
  [theme.breakpoints.down('md')]: {
    width: '100% !important', // Overrides inline-style
    height: 60,
  },
  '&:hover ': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 10,
    },
    '& .MuiTypography-root': {
      border: '0px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 50%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0,
  transition: theme.transitions.create('opacity'),

}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 0,
  width: 0,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBases() {
  const handleClick = (event) => {
    event.preventDefault(); // prevent the default action
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll smoothly to the top
  };

  return (
    <Link to="sectionHome" onClick={handleClick}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt="Start icon" src={images[0].url} sx={{ marginLeft: -12, width: 66, height: 66 }} />
        <Typography variant="h6" component="div" sx={{ marginLeft: 2 }}>
          Port Washington Yacht Club
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 60, width: '100%' }}>
        {/* any other components or text */}
      </Box>
    </Link>
  );
}
