import React, {useState} from "react"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Item from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import { Typography } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSliders, faGlasses, faClock, faTrophy} from '@fortawesome/free-solid-svg-icons'
import { getUserToken, userToken, resetStore } from "../features/meditationSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react";

const useStyles = makeStyles(theme=>({
    userStats:{
        color:'white',
        fontWeight:'bold',
        fontSize:'40px',
        boxShadow:'none',
        outline:'none',
        backgroundColor:'#a2c3c8',
        textTransform:'none',
        marginTop:'20px',
   
    },
    winIcon:{
        marginBottom:'10px',
        fontSize:'80px',
        textAlign:'center',
        [theme.breakpoints.only('md')]:{
            fontSize:'50px'
        } 
    },
    statIcons:{
        fontSize:'80px', 
        marginTop:'40px'
    },
    stats:{
        fontWeight:'900',
        color:'black',
        paddingTop:'10px',
        textAlign:'center',
    },
    container:{
        textAlign:'center'
    }

}))
const UserStats = () => {

    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(getUserToken)
    
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
        <Grid container className={classes.container} justifyContent='center'>

            <Button 
            startIcon={<ArrowBackIosNewIcon 
            onClick={()=>navigate('/userProfile')}/>} 
            className={classes.userStats}>
                   UserStats
            </Button>

            <Grid item xs={12} md={12} lg={12} xl={12}>
                <Item>
                    <FontAwesomeIcon 
                    icon={faTrophy} 
                    className={classes.winIcon} />
                </Item>

                <Item className={classes.mainStats}>
                    
                    <Typography 
                    variant="h4" 
                    className={classes.stats}>
                        DAY STREAK
                    </Typography>

                    <Typography 
                    variant="h3" 
                    className={classes.stats}>
                        1
                    </Typography>

                </Item>
            </Grid>

            <Grid 
            container 
            justifyContent='center'>
            
                <Grid item xs={12} md={4} lg={4} xl={4}> 
                    <Item>
                        <FontAwesomeIcon 
                        icon={faSliders} 
                        className={classes.statIcons} />
                    </Item>

                    <Item>

                        <Typography 
                            variant="h4" 
                            className={classes.stats}>
                            LONGEST STREAK
                        </Typography>

                        <Typography 
                        variant="h3" 
                        className={classes.stats}>
                            1
                        </Typography>

                    </Item>
                </Grid>
        
                <Grid item xs={12} md={4} lg={4} xl={4}>
                    <Item >
                        <FontAwesomeIcon 
                        icon={faGlasses} 
                        className={classes.statIcons}
                         />
                    </Item>
                    
                    <Item>

                        <Typography 
                        variant="h4" 
                        className={classes.stats}>
                            TOTAL COMPLETED SESSIONS
                        </Typography>

                        <Typography 
                        variant="h3" 
                        className={classes.stats}>
                            1
                        </Typography>

                    </Item>
                </Grid>

                <Grid item xs={12} md={4} lg={4} xl={4}>
                    
                    <Item>
                        <FontAwesomeIcon 
                        icon={faClock} 
                        className={classes.statIcons}/>
                    </Item>
                    
                    <Item>
                        <Typography 
                        variant="h4" 
                        className={classes.stats}>
                            MINDFUL MINUTES
                        </Typography>
                        
                        <Typography 
                        variant="h3" 
                        className={classes.stats}>
                            3m
                        </Typography>
                    </Item>
                
                </Grid>   
            
            </Grid>
       
        </Grid>
    )
}

export default UserStats