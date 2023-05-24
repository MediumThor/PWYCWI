import React from 'react';
import styled from 'styled-components';


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

      <OnScreenScrolling />
    </NavbarStyled>
  );
}