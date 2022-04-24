import React from "react"
import CardActions from "@material-ui/core/CardActions"
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom"

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
        [theme.breakpoints.only('xs')]:{
            marginBottom:'425px',
        },
        [theme.breakpoints.only('md')]:{
            marginBottom:'350px',
        },
        [theme.breakpoints.only('lg')]:{
            marginBottom:'550px',
        },
        [theme.breakpoints.only('xl')]:{
            marginBottom:'826px',
        }
    },
    submit:{
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(1),
        minWidth:'300px',
        minHeight:'50px',
        marginBottom:'10px',
        justifyContent:'center',
        paddingLeft:'30px',
        textTransform:'none'
    },
    logout:{
        color:'white',
        fontWeight:'bold',
        fontSize:'24px',
        boxShadow:'none',
        outline:'none',
        backgroundColor:'#a2c3c8',
        textTransform:'none'  
    }
}))
const Logout = () =>{

    const classes = useStyles()
    const navigate = useNavigate()

    const logout = () => {

    }

    return(
        <Grid container className={classes.container}>
            <Box className={classes.card}>

            <Button 
            startIcon={<ArrowBackIosNewIcon 
            onClick={()=>navigate('/userProfile')}/>} 
            className={classes.logout}>
                   Log Out
            </Button>

            <CardActions>
                <Button 
                variant="contained" 
                onClick={logout}
                color='primary'
                className={classes.submit}>Logout</Button>
            </CardActions>


            </Box>

        </Grid>
    )
}

export default Logout