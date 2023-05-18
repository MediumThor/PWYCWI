import styled from 'styled-components'
import { BorderRad, Colors, Gradients, Shadows } from '../../styles/global/styles'
import { Title } from '../../typography/Title'
import { Fonts } from '../../styles/global/styles'


export const Page = styled.div`
display: flex;
position: relative;
flex-direction: column;
height: 100%
min-height: 100vh;
`

export const Container = styled.div`

`

export const SidebarContainer = styled(Container)`

width: 100vw;
position: fixed;
z-index: 10;
justify-content: flex-start;
&.active{
    
}

`

export const NavContainer = styled(Container)`

  width: 100%;

`

export const MainContent = styled.main`

  display: center;
  position: fixed;
  flex-direction: column;
  margin-top: 150px;
  width: 100vw;

  &:before {
    content: '';
    
    width: 100vw;
    height: 100px;
    
  }
`

export const Section = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  
  
`

export const SectionRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  
 

  ${Title} {
    margin-bottom: 0;
  }
`

export const ContentRow = styled.div`
  display: block;
  
  & + & {
    margin-top: 4px;
  }
`
export const PageContentBlock = styled.div`
border: px solid ${Colors.White};
border-radius: ${BorderRad.s};
margin-top: 10px;
align-items: center;
  width: 100vw;
  color: ${Colors.White}};
  //background-color: rgba(117, 190, 218, 0.3);
  background-color: rgba(232, 214, 181, .0);
  
  

  @media only screen and  
  
  (max-width: 768px) { 
   

  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
      


    }
  
`
export const SectionContentBlock = styled.div`
border: 2px solid ${Colors.White};
  border-radius: ${BorderRad.s};
  margin-top: 10px;

  align-items: center;

  
    left: calc(50% - 650px);
    color: ${Colors.White}};
    box-shadow: ${Shadows.main};
    position: center;

    
  
    @media only screen and  
    
    (max-width: 768px) { 
    }
  
    @media only screen and (max-width: 1375px) and (min-width: 769px) { 
  
      }
    
    
    }`


export const MintContentBlock = styled.div`
border: 1px solid ${Colors.White};
border-radius: ${BorderRad.s};
margin-top: 10px;
align-items: center;
position: fixed;
  width: 700px;
  
  

  left: calc(50% - 350px);
  color: ${Colors.White}};
  //background-color: rgba(117, 190, 218, 0.3);
  background-color: rgba(232, 214, 181, .0);
  height: 420px;
  
  

  @media only screen and  
  
  (max-width: 768px) { 
    align-items: center;
    position: fixed;
    left: calc(50% - 150px);
    margin-top: -80px;
    width: 300px;
    height: 320px;
  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
      align-items: center;
      position: fixed;
      left: calc(50% - 375px);
      margin-top: 60px;
      width: 760px;

    }
  
`

export const StakeContentBlock = styled.div`
border: 0px solid ${Colors.White};
border-radius: ${BorderRad.s};
margin-top: 10px;
position: flex;
margin-left: 50px;
margin-right: 50px; 
  color: ${Colors.White}};
  background-color: rgba(232, 214, 181, .5);
  height: 620px;
  box-shadow: ${Shadows.main};
  overflow-y: scroll;

  
  @media only screen and  
  
  (max-width: 768px) { 
    align-items: center;
    position: fixed;
    left: calc(50% - 180px);
    margin-top: -40px;
    width: 360px;
    height: 600px;
    background-color: rgba(232, 214, 181, .5);
    margin-left: 0px;
    margin-right: 0px; 
    
  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
      align-items: center;
      margin-top: 60px;
      position: flex;
      margin-left: 50px auto;
      margin-right: 50px auto; 
      height: 680px;

    }
`

export const SwapContentBlock = styled.div`
border: 4px solid ${Colors.White};
border-radius: ${BorderRad.s};
margin-top: 10px;
align-items: center;
position: fixed;
  width: 700px;
  

  left: calc(50% - 350px);
  color: ${Colors.White}};
  background-color: #1E2023 ;
  height: 420px;
  box-shadow: ${Shadows.main};
  

`
export const DashContentBlock = styled.div`
border: 10px solid ${Gradients.border};
border-radius: ${BorderRad.s};
margin-top: 10px;
align-items: center;
position: fixed;
  width: 700px;
  
  

  left: calc(50% - 350px);
  color: ${Colors.White}};
  //background-color: rgba(117, 190, 218, 0.7);
  background-color: rgba(232, 214, 181, .7);
    height: 420px;
  box-shadow: ${Shadows.main};
  
  

  @media only screen and  
  
  (max-width: 768px) { 
    align-items: center;
    position: relative;
    justify-content:center;
    left: calc(50% - 170px);
    margin-top: -20px;
    width: 340px;
    height: 320px;
  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
      align-items: center;
      position: fixed;
      left: calc(50% - 375px);
      margin-top: 60px;
      width: 760px;

    }
  
`

export const ContentBlock = styled.div`
border-radius: ${BorderRad.s};
margin-top: 10px;
align-items: center;
position: fixed;
  width: 700px;
  
  background-color: rgb(255, 255, 255, .75)
  ;
  left: calc(50% - 350px);
  color: ${Colors.Black[900]}};
  height: 200px;
  box-shadow: ${Shadows.main};
  

  

`
export const WaterContentBlock = styled.div`
border-radius: ${BorderRad.s};
margin-top: 0px;
align-items: center;
position: fixed;
  width: 1150px;
  

  left: calc(50% - 575px);
  color: ${Colors.Black[900]}};
  height: px;
  @media only screen and  
  
  (max-width: 768px) { 
    align-items: center;
    position: fixed;
    left: calc(50% - 180px);
    margin-top: 60px;
    width: 360px;
  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
      align-items: center;
      position: fixed;
      left: calc(50% - 350px);
      margin-top: px;
      width: 700px;

    }
`

export const Span = styled.div`

  
  margin-top: 10px;
  padding-left: 0px;
  color: #22C984;
  font-family: ${Fonts.MedievalSharp};  
  width: 100px;

  (max-width: 768px) { 
    padding-left: 0px;

  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
  

    }

  `

  export const SidebarLink = styled(Container)`

  max-width: 200px;
  
`

export const ChainContentBlock = styled.div`
border-radius: ${BorderRad.s};
margin-top: 10px;
align-items: center;
position: fixed;
  width: 700px;
  

  left: calc(50% - 350px);
  color: ${Colors.Black[900]}};
  height: 420px;
  (max-width: 768px) { 
    align-items: center;
    position: fixed;
    left: calc(50% - 150px);
    margin-top: 60px;
    width: 300px;
  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
      align-items: center;
      position: fixed;
      left: calc(50% - 350px);
      margin-top: 30px;
      width: 700px;

    }
`
export const TxContentBlock = styled.div`
border-radius: ${BorderRad.s};
margin-top: 10px;
align-items: center;
position: fixed;
  width: 700px;
  

  left: calc(50% - 350px);
  color: ${Colors.White}};
  height: 420px;
  box-shadow: ${Shadows.main};
  

  

`
export const GalleryItemRow = styled.div`
border: 2px solid ${Colors.White};
border-radius: ${BorderRad.s};
margin-top: 200px;
align-items: center;
position: fixed;
  width: 1200px;
  height: 300px;
  
  background-color: rgba(232, 214, 181, .5);

  left: calc(50% - 600px);
  color: ${Colors.White}};
  box-shadow: ${Shadows.main};
  
  

  @media only screen and  
  
  (max-width: 768px) { 
    align-items: center;
    position: fixed;
    left: calc(50% - 175px);
    margin-top: 60px;
    width: 350px;
  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
      align-items: center;
      position: fixed;
      left: calc(50% - 375px);
      margin-top: 60px;
      width: 760px;

    }
  
  
  }`

export const GalleryItemBlock = styled.div`
border: 2px solid ${Colors.White};
border-radius: ${BorderRad.s};
margin-top: 70px;
align-items: center;
position: fixed;
  width: 500px;
  height: 500px;
  
  background-color: rgba(232, 214, 181, .5);

  left: calc(50% - 600px);
  color: ${Colors.White}};
  box-shadow: ${Shadows.main};
  
  

  @media only screen and  
  
  (max-width: 768px) { 
    align-items: center;
    position: fixed;
    left: calc(50% - 175px);
    margin-top: 60px;
    width: 350px;
  }

  @media only screen and (max-width: 1375px) and (min-width: 769px) { 
      align-items: center;
      position: fixed;
      left: calc(50% - 375px);
      margin-top: 60px;
      width: 760px;

    }
  
  
  }`

  export const BlankContentBlock = styled.div`
  border: 2px solid ${Colors.White};
  border-radius: ${BorderRad.s};
  margin-top: 10px;
  position: flex;
  margin-left: 50px;
  margin-right: 60px;

  align-items: center;
    height: 600px;
    overflow-y: scroll;    
    background-color: rgba(0, 21, 90, .5);

  
    left: calc(50% - 650px);
    color: ${Colors.White}};
    box-shadow: ${Shadows.main};
    
    
  
    @media only screen and  
    
    (max-width: 768px) { 
      align-items: center;
      margin-top: -40px;
      min-width: 360px;
      height: 600px;
      margin-left: 10px;
    }
  
    @media only screen and (max-width: 1375px) and (min-width: 769px) { 
        align-items: center;
        margin-top: 60px;
  
      }
    
    
    }`

    export const MainContentBlock = styled.div`
  border: 2px solid ${Colors.White};
  border-radius: ${BorderRad.s};
  margin-top: 10px;
  position: flex;
  margin-left: 50px;
  margin-right: 60px;

  align-items: center;
    height: 600px;
    overflow-y: scroll;    
    background-color: rgba(0, 21, 90, .5);

  
    left: calc(50% - 650px);
    color: ${Colors.White}};
    box-shadow: ${Shadows.main};
    
    
  
    @media only screen and  
    
    (max-width: 768px) { 
      align-items: center;
      margin-top: -40px;
      min-width: 360px;
      height: 600px;
      margin-left: 10px;
    }
  
    @media only screen and (max-width: 1375px) and (min-width: 769px) { 
        align-items: center;
        margin-top: 60px;
  
      }
    
    
    }`

