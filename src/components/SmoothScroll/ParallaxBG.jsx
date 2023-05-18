import styled from 'styled-components';



import React, { useRef } from "react";
import GridItem from 'src/components/Grid/GridItem.js';
import GridContainer from "src/components/Grid/GridContainer.js"
import { Parallax, Background } from "react-parallax";
import styles from 'src/styles/Home.module.scss'










export default function Section3() {






  return (
    <GridContainer>

      <Parallax
        bgImage="https://imgs.search.brave.com/yUc5R4dfYiin3D5caacwxpqz8Ygs6PjS9D14lgP6Pl0/rs:fit:477:477:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZmLzA1/LzI0LzZmMDUyNGI1/NTFiODA0YzJlYzVj/MGVmODQ0NWFjMmZm/LnBuZw"
        blur={{ min: -15, max: 15 }}
        strength={300}
        renderLayer={percentage => (

          <div
            style={{

              position: 'absolute',
              left: '20%',
              top: '20%',
              width: percentage * 70,
              height: percentage * 70,
            }}
          />

        )}
      >

        <div style={{ height: '300px', width: '800px' }} />




        <div className={styles.container}>
          <GridContainer>
            <GridItem >





              <div style={{ margin: '160px' }}>
                <img style={{ marginTop: '0px', marginBottom: '50px', width: '250px', }} />

                <h1 style={{ color: 'white' }}>
                  <GridContainer>

                    <GridItem >

                    </GridItem>

                  </GridContainer>

                </h1>
              </div>


            </GridItem>

          </GridContainer>

        </div>
      </Parallax>
    </GridContainer>
  );
}