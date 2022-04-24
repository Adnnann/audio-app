

import React, {useEffect, useState} from "react"
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from "@material-ui/core/TextField"
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@material-ui/core/Grid'
import Item from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import { Typography } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Navigate, useNavigate } from "react-router-dom"

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
        marginBottom:'28%',
        [theme.breakpoints.only('md')]:{
            marginBottom:'15%',
        },
        [theme.breakpoints.only('xs')]:{
            marginBottom:'61%',
        }
    },
    error:{
        verticalAlign:'middle',
        fontSize:"18px"
    },
    tittle:{
        marginTop:theme.spacing(2),
        color: theme.palette.openTitle,
        marginBottom:theme.spacing(2),
    },
    textField:{
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(1),
        width:300
    },
    submit:{
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(1),
        minWidth:'300px',
        minHeight:'50px',
        marginBottom:'10px',
        justifyContent:'center',
        paddingLeft:'30px',
        backgroundColor:'grey',
        textTransform:'none'
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
    hasAccount:{
        margin: '0 auto',
        marginBottom: theme.spacing(1)
    },
    signin:{
        margin: 'auto',
        marginBottom: theme.spacing(1),
    },
    edit:{
        marginTop:'35px'
    },
    accountDetails:{
        color:'white',
        fontWeight:'bold',
        fontSize:'24px',
        boxShadow:'none',
        outline:'none',
        backgroundColor:'#a2c3c8',
        textTransform:'none'
        
    }


}))
const AccountDetails = () => {

    const classes = useStyles()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email:'',
        username:''
    })

    const [editUserData, setEditUserData] = useState({
        username: false,
        email:false
    })

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }
        //dispatch(signinUser(user))    
    }

    // get values from input fields
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    return(

        <Grid container className={classes.container}>

        <Box className={classes.card}>

            <Button 
            startIcon={<ArrowBackIosNewIcon onClick={()=>navigate('/userProfile')}/>} className={classes.accountDetails}>
                   Account Details
            </Button>
    
                <CardContent>
                    <Typography variant='h6' className={classes.tittle}>Sign In</Typography>
    
                    <TextField id="email" 
                    type='email' 
                    label="Email" 
                    className={classes.textField}
                    value={values.email} 
                    onChange={handleChange('email')} 
                    margin="normal" 
                    disabled={editUserData.email ? false : true}
                    />
                    <EditIcon 
                    className={classes.edit}
                    onClick={()=>setEditUserData({email:true})}
                    />
                    <br />
    
                    <TextField 
                    id="username" 
                    type='text' 
                    label="Username" 
                    className={classes.textField}
                    value={values.username} 
                    onChange={handleChange('password')} 
                    margin="normal" 
                    disabled={editUserData.username ? false : true}
                    
                    />
                    <EditIcon 
                    onClick={()=>setEditUserData({username:true})}
                    className={classes.edit}/>
                    <br />
                    {/* { //display error returned from server
                        Object.keys(userSigninData).length !== 0 && (
                            <Typography component='p' color='error'>
                                <Icon color='error' className={classes.error}></Icon>
                                {userSigninData.error}
                            </Typography>
                        )
                    } */}
    
                </CardContent>


            <CardActions>

            <Button disabled={editUserData.email || editUserData.username ? false : true}
            className={classes.submit} color='primary' variant="contained" onClick={clickSubmit}>
                    Update
                </Button>
            </CardActions>
            
        </Box>
        </Grid>
    )
}

export default AccountDetails