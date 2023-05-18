import React from 'react';
import styled from 'styled-components';
import Wrapper from 'components/MemberSection/Wrapper';
import OnScreenScrolling from 'components/MemberSection/on-screen-scrolling';


import { Link } from 'react-scroll';
import { Button } from '@mui/material';

const NavbarStyled = styled.div`
  font-size: 24px;
  position: fixed;
  width: 100%;

  
  }
  .scrolling-buttons {
    display: flex;
    flex-direction: column;
  }
`;


export default function Navbar() {
    return (
      <NavbarStyled>
   
          <Wrapper>
              <OnScreenScrolling/>
          </Wrapper>
      </NavbarStyled>
    );
  }