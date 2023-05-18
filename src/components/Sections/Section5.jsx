import React, { useState } from 'react'
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'

import "src/styles/styles.module.scss";

const Section2Styled = styled.div`background-color: #000000;`;

export default function Section5() {
      return (
            <Section2Styled id="section5">
                  <main className={styles.main3}>
                        <Wrapper>
                              <iframe align="top" name="wind-map" id="wind-map" src="https://widgets.sailflow.com/widgets/web/windMap?w=600&h=450&c=0A2946&rp=18&m_m=t&search=43.3875,-87.8678&sn=Port Washington&sid=12074&u_t=F&act=Sail&app=sailflow" width="600" height="450" frameborder="0" scrolling="no" allowtransparency="no"></iframe>
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
