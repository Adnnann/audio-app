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

const useStyles = makeStyles(theme=>({
    container: {
        backgroundColor:'#a2c3c8',
        bottom:'0',
        top:'0',
        left:'0',
        right:'0',
        overflow:'none',
        [theme.breakpoints.only('md')]:{
            height:'535px',
        },
        [theme.breakpoints.only('lg')]:{
            height:'736px',
        } 
    },
    userStats:{
        color:'white',
        fontWeight:'bold',
        fontSize:'40px',
        boxShadow:'none',
        outline:'none',
        backgroundColor:'#a2c3c8',
        textTransform:'none',
        marginTop:'20px',
        marginBottom:'20px',
        [theme.breakpoints.only('md')]:{
            fontSize:'20px',
            marginBottom:'0'
        }   
    },
    winIcon:{
        marginBottom:'10px',
        fontSize:'80px',
        [theme.breakpoints.only('md')]:{
            fontSize:'50px'
        } 
    },
    statIcons:{
        fontSize:'80px',
        [theme.breakpoints.only('md')]:{
            fontSize:'50px'
        } 
    },
    stats:{
        fontWeight:'900',
        color:'black',
        paddingTop:'10px'
    },
    mainStats:{
        marginBottom:'120px',
        [theme.breakpoints.only('xl')]:{
            marginBottom:'283px'
        },
        [theme.breakpoints.only('md')]:{
            marginBottom:'60px'
        }
    }


}))
const UserStats = () => {

    const classes = useStyles()
    const navigate = useNavigate()
   
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

            <Grid container justifyContent='space-around' style={{marginBottom:'201px'}}>
            
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
                    <Item>
                        <FontAwesomeIcon icon={faGlasses} className={classes.statIcons} />
                    </Item>
                    
                    <Item>
                        <Typography 
                        variant="h4" 
                        className={classes.stats}>
                            TOTAL SESSION
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