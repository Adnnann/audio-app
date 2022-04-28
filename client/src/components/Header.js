import React from "react";
import AppBar  from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Item from '@mui/material/Grid'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Grid, makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';

import Menu from '@mui/material/Menu';
import { useState } from "react";
import Logo from '../assets/images/logo.jpeg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser}  from '@fortawesome/free-solid-svg-icons'
import { fbLogin, getUserToken, fetchFiles, updateUserFacebookStatus, userToken, getUserProfile } from "../features/meditationSlice";
import { useEffect } from "react";
import UserProfile from "./UserProfile";

const useStyles = makeStyles(theme=>({
    header:{
      backgroundColor:'#a2c3c8',
      minWidth:"100%",
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
    },
    userIcon:{
      fontSize:'60px',
      marginTop:'10px',
      color:'black',
      marginBottom:'10px',
    }
    
}))

const Header = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    if(window.location.hash === '#_=_'){
      dispatch(fbLogin()) 
      dispatch(fetchFiles())
      dispatch(updateUserFacebookStatus())
      dispatch(userToken())
      navigate('/musicLibrary') 
    }
  }, [])

  const classes = useStyles()
  const navigate = useNavigate()

  const token = useSelector(getUserToken)
  const userProfile = useSelector(getUserProfile)
  
  const login = () => {
    navigate('/login')
  }

  const signup = () => {
    navigate('/signup')
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
                alt="Meditation app"
                src={Logo}
                onClick={()=>navigate('/')}
            />
          </Item>
          </Grid> 

          <Grid item xs={12} md={3} lg={3} xl={3} 
          className={classes.rightButtons}>
            <Item>
            
              {
              token?.message || userProfile?.username ? <FontAwesomeIcon 
              onClick={()=>navigate('/userProfile')}
              icon={faUser} 
              className={classes.userIcon}
              />
              :(<>
              <button style={{color: window.location.pathname ==='/tutorial' ? 'grey' : 'white'}}
                className={classes.button} onClick={()=>navigate('/tutorial')}>How it works</button>
                <button  style={{color: window.location.pathname ==='/signup' ? 'grey' : 'white'}}
                className={classes.button} onClick={()=>signup()}>Sign Up</button>
                <button style={{color: window.location.pathname ==='/login' ? 'grey' : 'white'}} 
                className={classes.button} onClick={()=>login()}>Log In</button>
                </>)
              } 
            </Item>
          </Grid>

        </Toolbar>


    </AppBar>
    )


}

export default Header
    
