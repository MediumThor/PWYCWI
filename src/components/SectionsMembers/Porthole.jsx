import React from 'react';
import styled from 'styled-components';
import Slideshow from 'src/components/Slideshow.jsx';


const Section4Styled = styled.div`
  background-color: #000000;
  margin-top: -250px;
`;

const Wrapper = styled.div`
  margin-top: 150px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Section4 = () => {




      return (
            <Section4Styled id="section4">
                  <main>
                        <Wrapper>
                              <Slideshow />
                        </Wrapper>
                  </main>
            </Section4Styled>
      );
};

export default Section4;
