
  // nodejs library that concatenates classes
  import classNames from "classnames";
  // @material-ui/core components
  import { makeStyles } from "@material-ui/core/styles";
  
  // @material-ui/icons
  
  // core components
  import Header from "components/Header/Header.js";
  import Footer from "components/Footer/Footer.js";
  import GridContainer from "components/Grid/GridContainer.js";
  import GridItem from "components/Grid/GridItem.js";
  import Button from "components/CustomButtons/Button.js";
  import HeaderLinks from "components/Header/HeaderLinks.js";
  import Parallax from "components/Parallax/Parallax.js";
  import { Input } from "@material-ui/core";
  
  import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";
  
  
  // Sections for this page
 
  import { Card } from "@material-ui/core";

  import React, { useState, useEffect } from "react";

import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
var randomColor = require("randomcolor");




  
  const dashboardRoutes = [];
  
  const useStyles = makeStyles(styles);
  
  export default function Sticky(props) {



    
    const [item, setItem] = useState("");


    
const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  ); 


  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
 };


    const classes = useStyles();
    const { ...rest } = props;


    const keyPress = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
          newitem();
        }
      };

      const newitem = () => {
        if (item.trim() !== "") {
         //if input is not blank, create a new item object
          const newitem = {
            
            id: uuidv4(),
            item: item,
            color: randomColor({luminosity: "light",}),
            defaultPos: { x: 100, y: 200 },
          };
          //add this new item object to the items array
          setItems((items) => [...items, newitem]);
          //reset item value to empty string
          setItem("");
        } else {
          alert("Enter a item");
          setItem("");
        }
    };

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
      }, [items]);
    
      const updatePos = (data, index) => {
        let newArr = [...items];
        newArr[index].defaultPos = { x: data.x, y: data.y };
        setItems(newArr);
     };
    
    return (
        
      <GridContainer>
             <Input
          

    value={item}
    onChange={(e) => setItem(e.target.value)}
    placeholder="Enter something..."
    onKeyPress={(e) => keyPress(e)}
/>
<Button onClick={newitem} round>ENTER</Button>


      


{items.map((item, index) => {
        return (
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(e, data) => {
              updatePos(data, index);
            }}
          >
            <div style={{ backgroundColor: item.color }} className="box">
              {`${item.item}`}
              <button id="delete" onClick={(e) => deleteNote(item.id)}>
                X
              </button>
            </div>
          </Draggable>
        );
      })}

      </GridContainer>


    );
  }
  