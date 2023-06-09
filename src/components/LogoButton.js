import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "src/components/Grid/GridContainer.js";


import LogoButton from "src/components/LogoButton.tsx";

import styles from "src/styles/jss/nextjs-material-kit/pages/componentsSections/tabsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionTabs() {
  const classes = useStyles();
  return (
    <div >
      <div className={classes.container} color='primary'>
        <div id="nav-tabs">

          <div>
            <LogoButton />
          </div>
          <GridContainer>


          </GridContainer>
        </div>
      </div>
    </div>
  );
}
