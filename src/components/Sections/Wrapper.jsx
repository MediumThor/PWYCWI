import React from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

export default function Wrapper({ children }) {
  return <WrapperStyled>{children}</WrapperStyled>;
}