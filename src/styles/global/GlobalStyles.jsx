import { createGlobalStyle } from 'styled-components'

import { Colors, Fonts } from './styles'



export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    scrollbar-width: 0px;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

 
  


  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: ${Fonts.Helvetica};
    font-size: 16px;
    color: ${Colors.Black[900]};
    overscroll-behavior-y: none;
  
    

   
 
    
    //background-image: url("https://media.giphy.com/media/Qgfz2N36MgUBG/giphy.gif");
    //background-image: url("https://wallpapercave.com/dwp2x/wp4452858.jpg"); 
    //background-image: url("https://wallpapercave.com/wp/wp4946071.jpg");  
    //background-image: url("https://wallpapercave.com/wp/wp6072545.png");
    //background-image: url("https://wallpapercave.com/wp/wp4177467.jpg");  
    background-image: url("https://wallpapercave.com/wp/wp8963203.jpg");  


    background-image:  linear-gradient(to right, rgba(50, 70, 80, 0.2), rgba(0, 0, 0, 0.7)),url("https://wallpapercave.com/wp/wp8963203.jpg");  
    background-image:  radial-gradient(circle, rgba(00, 200, 200, 0.7), rgba(50, 10, 9, 0.6)),url("https://wallpapercave.com/wp/wp8963203.jpg");  

    
    background-size: 120%;
    height: 100%;


    font-family: ${Fonts.abeezee};
    font-size: 20px;
    color: ${Colors.Green[100]};

    @media only screen and  
  
    (max-width: 768px) { 
    background-size: 1400px;

  }

  @media only screen and (max-width: 1036px) and (min-width: 769px) { 
    background-size: 1800px;


    }
  
  
  }
  }
  
  
  button {
    font-family: ${Fonts.abeezee};
    font-size: 1em;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${Colors.White};
    text-decoration: none;
    

    
    &:visited {
      color: ${Colors.White};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 150%;
    font-weight: 600;
    font-family: ${Fonts.abeezee};
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }
  
  h3 {
    font-size: 14px;
  }

  h4 {
    font-size: 12px;
  }

  h5 {
    font-size: 12px;
  }

  p {
    margin: 0;
  }
`
