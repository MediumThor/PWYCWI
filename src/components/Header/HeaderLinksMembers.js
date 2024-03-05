import React, { useState, useEffect } from "react";
import { Link } from 'react-scroll';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";
import style from 'src/styles/Home.module.scss'
import { Apps, CloudDownload } from "@material-ui/icons";
import { useRouter } from 'next/router';
import { auth, firestore } from '../../../firebase';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Cookies from 'js-cookie';

import CustomDropdown from "src/components/CustomDropdown/CustomDropdown";
import Button from "src/components/CustomButtons/Button";
import SmallButton from "src/components/CustomButtons/SmallButton.js"
import styles from "src/styles/jss/nextjs-material-kit/components/headerLinksStyle";
import AdminPanel from "../Admin/AdminPanel";
import OfficerPanel from "../Admin/OfficerPanel";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


Transition.displayName = "Transition";

function HeaderLinks() {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSecretary, setIsSecretary] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [role, setRole] = useState('');
  const [isOfficer, setIsOfficer] = useState(false);
  const [officerPanelOpen, setOfficerPanelOpen] = useState(false);
  const [userRoles, setUserRoles] = useState([]);


  const handleBackClick = () => {
    router.push('/App'); // Redirect to the home page
  };



  useEffect(() => {
    const fetchUserRoleAndClaims = async () => {
      const authUser = auth.currentUser;
      if (authUser) {
        // Get the ID token result to check for roles
        const token = await authUser.getIdTokenResult();
  
        // Set state based on the user's roles
        setIsAdmin(!!token.claims.admin);
        setIsOfficer(!!token.claims.officer);
        setIsSecretary(!!token.claims.secretary);
  
        // Default role to 'Member'
        let role = 'Member';
  
        // Fetch user/member data based on roles and collections
        if (token.claims.admin) {
          // Admins are in the 'users' collection
          const userSnapshot = await firestore.collection('users').doc(authUser.uid).get();
          if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setUserRoles(userData.roles || []);
            role = 'Admin'; // Set the role for display
          }
        } else {
          // Non-admins (including Secretary) are in the 'members' collection
          const memberSnapshot = await firestore.collection('members').where('authUid', '==', authUser.uid).limit(1).get();
          if (!memberSnapshot.empty) {
            const memberData = memberSnapshot.docs[0].data();
            setFirstName(memberData.firstName);
            setLastName(memberData.lastName);
            setUserRoles(memberData.roles || []);
            // Set the role for display based on the user's roles
            if (token.claims.officer) {
              role = 'Officer';
            } else if (token.claims.secretary) {
              role = 'Secretary';
            } else {
              role = memberData.role || 'Member';
            }
          }
        }
  
        // Finally, set the role state
        setRole(role);
      }
    };
  
    fetchUserRoleAndClaims();
  }, []);
  
  
  






  const handleLogout = async () => {
    try {
      await auth.signOut();
      Cookies.remove('specialUser');
      router.push('/App');
    } catch (error) {
      console.error(error);
    }
  };

  const openAdminPanel = () => {
    setAdminPanelOpen(true);
  };

  const closeAdminPanel = () => {
    setAdminPanelOpen(false);
  };

  const openOfficerPanel = () => {
    setOfficerPanelOpen(true);
  };

  const closeOfficerPanel = () => {
    setOfficerPanelOpen(false);
  };



  return (
    <div>

      <List className={classes.list}>

        <ListItem className={classes.listItem}>
          <SmallButton size="sm" color="transparent" onClick={handleBackClick}>
            <ArrowBackIcon />
          </SmallButton>
        </ListItem>

        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="sectionHome" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Home
            </Link>
          </SmallButton>

        </ListItem>


        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section1" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Services
            </Link>
          </SmallButton>
        </ListItem>


        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section2" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Events
            </Link>
          </SmallButton>

        </ListItem>




        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section4" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Porthole
            </Link>
          </SmallButton>

        </ListItem>
        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section5" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Weather
            </Link>
          </SmallButton>

        </ListItem>

        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section3" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Contact
            </Link>
          </SmallButton>

        </ListItem>

        <ListItem className={classes.listItem}>

          <SmallButton size="sm"
            color="transparent"
          >
            <Link onClick={handleLogout} activeClass="active" spy={false} smooth={true} duration={1000} className={style.headerLink3}>

              Log out
            </Link>

          </SmallButton>
        </ListItem>


        <div style={{ marginLeft: '20px', justifyContent: 'center', alignItems: 'center' }}>
          <ListItem style={{
            marginTop: '12px',
          }}
            className={classes.listItem}>
            Welcome, {role} {firstName} {lastName}
          </ListItem>
        </div>

        {isAdmin && (
          <ListItem className={classes.listItem}>
            <SmallButton
              size="sm"
              color="transparent"
              className={isSmallScreen ? classes.smallScreenButton : null}

            >
              <Link onClick={openAdminPanel} activeClass="active" spy={false} smooth={true} duration={1000} className={style.headerLink4}>

                Admin Panel
              </Link>
            </SmallButton>
          </ListItem>
        )}
      </List>


      {
        (isOfficer || isAdmin) && (
          <ListItem className={classes.listItem}>
            <SmallButton
              size="sm"
              color="transparent"
              className={isSmallScreen ? classes.smallScreenButton : null}
            >
              <Link onClick={openOfficerPanel} activeClass="active" spy={false} smooth={true} duration={1000} className={style.headerLink4}>

                Officer Panel
              </Link>
            </SmallButton>
          </ListItem>

        )
      }
      <AdminPanel open={adminPanelOpen} onClose={closeAdminPanel} />
      <OfficerPanel roles={userRoles} open={officerPanelOpen} onClose={closeOfficerPanel} />

    </div >
  );
}

export default HeaderLinks;

