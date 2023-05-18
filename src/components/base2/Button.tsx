import styled from 'styled-components'
import { BorderRad, Colors, Fonts, Transitions } from '../../styles/global/styles'

export const Button = styled.button`

  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  min-width: 160px;
  height: 40px;
  font-family: ${Fonts.abeezee};
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${Colors.Black[900]};
  border: 3px solid ${Colors.Black[900]};
  border-radius: ${BorderRad.m};
  background-color: transparent;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }
`
export const IncButton = styled.button`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  min-width: 80px;
  height: 60px;
  font-family: ${Fonts.abeezee};
  font-size: 40px;
  line-height: 50px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${Colors.Black[900]};
  border: 4px solid ${Colors.Black[900]};
  border-radius: ${BorderRad.m};
  background-color: #22C984;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }
`

export const IncButtonGallery = styled.button`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: 50px;
  min-width: 50px;
  height: 80px;
  font-family: ${Fonts.abeezee};
  font-size: 40px;
  line-height: 50px;
  font-weight: 700;
  padding; 40px;
  text-transform: uppercase;
  color: ${Colors.Black[900]};
  
  border: 4px solid ${Colors.Black[900]};
  border: 4px solid ${Colors.White};

  border-radius: ${BorderRad.m};
  background-color: #22C984;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }
  @media only screen and  
  
  (max-width: 768px) { 
    height: 60px;
    margin: 0 auto;
    margin-top: 00px;
    justify-content: center;
    align-items: center;
    border: 4px solid ${Colors.White};
  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
  

    }

`
export const MintButton = styled.button`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 20px;
  align-items: center;
  width: 400px;
  min-width: 160px;
  height: 70px;
  font-family: ${Fonts.MedievalSharp};
  font-size: 34px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${Colors.Black[900]};
  border: 4px solid ${Colors.Black[900]};
  border-radius: ${BorderRad.m};
  background-color: #C7FFFA;
  cursor: pointer;
  transition: ${Transitions.all};
  

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }`
export const SwapButton = styled.button`

  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  min-width: 160px;
  height: 60px;
  font-family: ${Fonts.abeezee};
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${Colors.Black[900]};
  border: 3px solid ${Colors.Rust[400]};
  border-radius: ${BorderRad.m};
  background-color: #22C984;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }
`