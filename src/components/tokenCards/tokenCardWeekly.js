import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import SmallButton from "src/components/CustomButtons/SmallButton.js"

import logo from "public/assets/xdai.png"
import styles from "src/styles/Home.module.scss";
import { Avatar, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import Shiva from "src/abi/Shiva.json"

const useStyles = makeStyles(styles);


export default function TokenCard() {
  const classes = useStyles();
  return (
    <a className={styles.card4}>

      <div className={styles.grid} >

        <h2>Weekly</h2>


      </div>

      <div className={styles.grid} >

        <p>   $10 </p>

      </div>




      <ListItem

        disableGutters
        secondaryAction={
          <IconButton aria-label="comment">

          </IconButton>
        }>
        <ListItemText />
      </ListItem>

      <ListItem

        disableGutters
        secondaryAction={
          <IconButton aria-label="comment">

          </IconButton>
        }>
        <ListItemText />
      </ListItem>


      <Divider dark />
      <div className={styles.grid}>



        <SmallButton color="transparent" className={styles.smallcard3}
        >
          <a href="https://mui.com/material-ui/react-table/" className={styles.smallcard1}>
            <h2>Purchase</h2>
          </a>
        </SmallButton>



      </div>

    </a >


  );
}
