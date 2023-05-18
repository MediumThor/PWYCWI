import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import SmallButton from "src/components/CustomButtons/SmallButton.js"

import logo from "public/assets/xdai.png"
import styles from "src/styles/Home.module.scss";
import { Avatar, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";


const useStyles = makeStyles(styles);

export default function TokenCard() {
  const classes = useStyles();
  return (
      <a className={styles.card1}>
       
         


          <div className={styles.grid} >
          <Avatar sx={{  }}>O</Avatar>
          <h2>TokenA</h2>
          <ListItem dense
          
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <p>0.00</p>
            </IconButton>
          }
        >    
        <ListItemText primary={`Price`} />
        </ListItem>
  </div>
          <Divider dark/>
                   <List dense >

                   <ListItem
          
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <p>0</p>
            </IconButton>
          }
        >    
        <ListItemText primary={`Market Cap`} />
        </ListItem> 
        <ListItem
          
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <p>0</p>
            </IconButton>
          }
        >    
        <ListItemText primary={`Circulating Supply`} />
        </ListItem>  
 
        <ListItem
          
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <p>0</p>
            </IconButton>
          }
        >    
        <ListItemText primary={`Total Supply`} />
        </ListItem>
 
  </List>
  
  <Divider dark/>
          <div className={styles.grid}>

        

          <SmallButton color="transparent" className={styles.smallcard1} 
          >
              <a href="https://mui.com/material-ui/react-table/" className={styles.smallcard2}>
            <h2>Buy</h2>
          </a>
              </SmallButton>


              <SmallButton   color="transparent" 
          >
               <a href="https://mui.com/material-ui/react-table/" className={styles.smallcard1}>
            <h2>Chart</h2>
          
          </a>
              </SmallButton>
              </div>
            
          </a>


  );
}
