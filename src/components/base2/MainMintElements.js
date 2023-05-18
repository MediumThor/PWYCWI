import styled from "styled-components"
import {NavLink as Link} from "react-router-dom"
import {FaBars} from "react-icons/fa"

export const Nav = styled.nav`
    background: #000;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) /2);
    z-index: 10;

    justify-content: flex-start;
`

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 2.5rem;
    height: 100%;
    cursor: pointer;

    &.active{
        color: #15cdfc;
    }
`

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-20%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`
export const NavMenu = styled.div`
        display: flex;
        align-items: center;
        margin-right: -24px;

        width: 100vw;
        white-space: nowrap;

    @media screen and (max-width: 768px) {
            display: none;
`
export const NavBtn = styled.nav`
border-radius: 4px;
background: #7EE3CC;
padding: 10px 22px;
color: ;
border: none;
outline: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

&:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;


`
export const NavBtnLink = styled(Link)`
        border-radius: 4px;
        background: #7EE3CC;
        padding: 10px 22px;
        color: ;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        text-decoration: none;

        &:hover {
            transition: all 0.2s ease-in-out;
            background: #fff;
            color: #010606;

        }
`
export const Button = styled.nav`
border-radius: 4px;
background: #5AD043;
padding: 10px 22px;
color: ;
border: none;
outline: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
margin: 40px 40px;


&:hover {
    transition: all 0.2s ease-in-out;
    background: #358700;
    color: #010606;


`
export const MintButton = styled.nav`
border-radius: 6px;
background: #5AD043;
padding: 20px 5px;
color: ;
border: none;
outline: 3px;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
margin: 40px 0px;
font-size: 25px;
width: 17rem;
display: inline-block;

&:hover {
    transition: all 0.2s ease-in-out;
    background: #434D2A;
    color: #010606;


`
