import styled from 'styled-components'
import { Colors, Transitions } from '../../styles/global/styles'

export const Link = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  margin-top: 170px;
  text-decoration: underline;
  color: ${Colors.Gray['600']};
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus-within {
    color: ${Colors.Yellow[500]};
  }
`
