import React, { useState } from 'react'
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'

import "src/styles/styles.module.scss";

const Section2Styled = styled.div`background-color: #000000;`;



export default function Section4() {


      return (
            <Section2Styled id="section4">
                  <main className={styles.main3}>
                        <Wrapper>




                        </Wrapper>
                  </main>
            </Section2Styled >
      );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;



