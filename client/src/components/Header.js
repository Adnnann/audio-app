import React from "react";
import AppBar  from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Item from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import {signoutUser, 
//         getUserSigninData,
//         cleanStore,
//         getUserDataToDisplay} from "../../features/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { Grid, makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from "react";
import Logo from '../assets/images/logo.jpeg'

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

const useStyles = makeStyles(theme=>({
    header:{
      backgroundColor:'#a2c3c8'
    },
    logo: {
        marginTop:'10px'
    },
    rightButtons: {
        marginLeft:'auto',
        color:'white'
    },
    welcomeMessage:{
        paddingLeft:"20px"
    },
    button:{
      textTransform:'none',
      borderStyle:'none',
      backgroundColor:'#a2c3c8',
      color:'white',
      fontWeight:'bold',
      fontSize:'14px'
    }
    
}))

const Header = () => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //const userData = useSelector(getUserSigninData)
  //const displayUserName = useSelector(getUserDataToDisplay)

 
    const [anchorEl, setAnchorEl] = useState(null);
    
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const editProfile = () => {
        //navigate(`editProfile/${userData.user._id}`)
    }

    const editPassword = () => {
        //navigate(`/editPassword/${userData.user._id}`)
    }

    const deleteAccount = () => {
      //navigate(`/deleteAccount/${userData.user._id}`)
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    const date = new Date()

    const signout = () => {
        //dispatch(signoutUser())
        //dispatch(cleanStore())
        navigate('/')
    }

    const login = () => {
      //dispatch(signoutUser())
      //dispatch(cleanStore())
      navigate('/signin')
  }
    return(
        
    <AppBar position="static" className={classes.header}>

        <Toolbar>
        <Grid item xs={12} md={3} lg={3} xl={3}>
        <Item>
            <Box
                component="img"
                className={classes.logo}
                sx={{
                height: window.location.pathname === '/' 
                || window.location.pathname === '/signin' 
                || window.location.pathname === '/signup' ? 64 : 38,
                }}
                alt="Expense tracker"
                src={Logo}
            />
          </Item>
          </Grid> 

          <Grid item xs={12} md={3} lg={3} xl={3} className={classes.rightButtons}>
          <Item>
          
              <button className={classes.button} onClick={()=>navigate('/tutorial')}>How it works</button>
              <button  className={classes.button}>Sign Up</button>
              <button  className={classes.button} onClick={()=>login()}>Log In</button>
        
          </Item>
          </Grid>

        </Toolbar>

        {/* { 
                Object.keys(displayUserName).length !== 0 ?
                    <Typography variant="h6" className={classes.welcomeMessage}>
                       {dateFormat(date, 'dddd, dd mmmm')}
                        <br />
                        Hello, {
                         displayUserName.user.firstName}
                    </Typography>
                : null
        } */}

    </AppBar>
    )


}

export default Header
    
