import styled from 'styled-components';



import React, { useRef } from "react";

import GridItem from 'src/components/Grid/GridItem.js';
import GridContainer from "src/components/Grid/GridContainer.js"
import { Parallax, Background } from "react-parallax";
import styles from 'src/styles/Home.module.scss'









export default function Section3() {






  return (
    <GridContainer>


      <div style={{ maxHeight: '-100px', width: '95vw' }}>

        <Parallax
          bgImage="https://imgs.search.brave.com/dgs86i5E0XIP34LX47NC-JLGmGr5FKKk14e-APM2Iy0/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9qb29p/bm4uY29tL2ltYWdl/cy9kb3R0ZWQtYmFj/a2dyb3VuZC1wYXR0/ZXJuLTEucG5n"
          blur={{ min: 15, max: -15 }}
          strength={-300}
          renderLayer={percentage => (

            <div

            />
          )}
        >





          <div className={styles.container}>
            <GridContainer>
              <GridItem >





                <div style={{ margin: '160px' }}>
                  <img style={{ marginTop: '0px', marginBottom: '-500px', width: '250px', }} />

                  <h1 style={{ color: 'white' }}>


                  </h1>
                </div>


              </GridItem>

            </GridContainer>

          </div>
        </Parallax>
      </div>
    </GridContainer>
  );
}