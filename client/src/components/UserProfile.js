import React from "react"
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReplayIcon from "@mui/icons-material/Replay";
import { getUserToken, userToken, resetStore, getUserProfile } from "../features/meditationSlice"
import { useSelector } from "react-redux"
import { useEffect } from "react";

const useStyles = makeStyles(theme=>({
    container: {
        backgroundColor:'#a2c3c8',
        bottom:'0',
        top:'0',
        left:'0',
        right:'0',
        overflow:'none'
    },
    card: {
        borderStyle:'none',
        maxWidth: 620,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
        backgroundColor:'#a2c3c8',
    },
    tittle:{
        marginTop:theme.spacing(2),
        color: theme.palette.openTitle,
        marginBottom:theme.spacing(2),
    },
    submit:{
        margin: 'auto',
        textTransform:'none',
        backgroundColor:'white',
        color:'black',
        minWidth:'220px',
        minHeight:'50px',
        marginBottom:'10px',
        justifyContent:'left',
        paddingLeft:'30px'
    },
    trackLibrary:{
        textTransform:'none',
        backgroundColor:'white',
        color:'black',
        minWidth:'220px',
        minHeight:'50px',
        marginBottom:'10px',
        marginLeft: '900px',
        [theme.breakpoints.only('lg')]:{
            marginLeft:'600px',
        },
        [theme.breakpoints.only('md')]:{
            marginLeft:'500px',
        },
        [theme.breakpoints.only('xs')]:{
            marginLeft:'0px',
        }
    },
    myStatsButtonIcon:{
        marginLeft:'105px'
    },
    changePasswordButtonIcon:{
        marginLeft:'40px'
    },
    logoutButtonIcon:{
        marginLeft:'105px'
    },
    accountDetailsButtonIcon:{
        marginLeft:'60px'
    }
    
}))
const UserProfile = () =>{
    const classes = useStyles()
    //const userData = useSelector(getUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(getUserToken)
    const userProfile = useSelector(getUserProfile)
    
    useEffect(()=>{
            //check if user token exists. 
           dispatch(userToken())
            //redirect user in case token doesn't exist
            if(token === 'Request failed with status code 500'
            || token ==='Request failed with status code 401'){
            dispatch(resetStore())
            navigate('/') 
            }
        },[token.length])
    
    
    return(
        <Grid container>
            
            <Box 
            className={classes.card}>
      
            <Button 
            startIcon={<ReplayIcon />} 
            onClick={()=>navigate('/musicLibrary')}
            className={classes.trackLibrary}>
                Track library
            </Button>    
                    
                    <Typography variant='h4' 
                    className={classes.tittle}>
                        Profile
                    </Typography>

                    <Button 
                    endIcon={<ArrowForwardIosIcon 
                    onClick={()=>navigate('/accountDetails')}
                    className={classes.accountDetailsButtonIcon}/>} 
                    className={classes.submit}>
                        Account details
                    </Button>
                    <br />
                    
                    <Button 
                    endIcon={<ArrowForwardIosIcon 
                    className={classes.changePasswordButtonIcon} />} 
                    className={classes.submit}
                    onClick={()=>navigate('/changePassword')}>
                        Change Password
                    </Button>
                    <br />
                 
                    <Button 
                    endIcon={<ArrowForwardIosIcon 
                    className={classes.myStatsButtonIcon}/>} 
                    onClick={()=>navigate('/userStats')}
                    className={classes.submit}>
                        My stats
                    </Button>
                    <br />

                    <Button 
                    endIcon={<ArrowForwardIosIcon 
                    className={classes.logoutButtonIcon}/>} 
                    onClick={()=>navigate('/logout')}
                    className={classes.submit}>
                        Log Out
                    </Button>
                    <br />

           </Box>

        </Grid>
    )
}

export default UserProfile