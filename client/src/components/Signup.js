import React, {useEffect, useState} from "react"
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import {  useDispatch } from 'react-redux';
import {
        createUser,
        fbLogin,
        getUserProfile
} from "../features/meditationSlice"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import FacebookLogin from 'react-facebook-login';

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
    error:{
        verticalAlign:'middle',
        fontSize:"18px"
    },
    tittle:{
        marginTop:theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField:{
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(1),
        width:300
    },
    submit:{
        margin: 'auto',
        textTransform:'none',
        backgroundColor:'lightblue',
        color:'black'
    },
    hasAccount:{
        margin: '0 auto',
        marginBottom: theme.spacing(1)
    },
    signin:{
        margin: 'auto',
        marginBottom: theme.spacing(1),
    },


}))
const Signup = () =>{

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(getUserProfile)
   
    const [values, setValues] = useState({
        username:'',
        email:'',
        password: '',
    })

    useEffect(()=>{
        if(userData?.message && !userData.message.includes('failed')){
          navigate('/login')
        }
      },[userData])


    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = () => {
        const user = {
            username: values.username || undefined,
            email: values.email || undefined,
            password:values.password
        }

        dispatch(createUser(user))
       
    }

    const responseFacebook = (response) => {
        console.log(response);
      }

    const FBSignup = () => {
        dispatch(fbLogin())
    }
 
    return(
        <Grid container>
            <Box className={classes.card}>
                <CardContent>
                    <Typography 
                    variant='h6' 
                    className={classes.tittle}>
                        Sign Up
                    </Typography>

                    <TextField 
                    id="username" 
                    placeholder="Username" 
                    className={classes.textField}
                    value={values.username} 
                    onChange={handleChange('username')} 
                    margin="normal" />
                    <br />


                    <TextField 
                    id="email" 
                    type='email' 
                    placeholder="Email" 
                    className={classes.textField}
                    value={values.email} 
                    onChange={handleChange('email')} 
                    margin="normal" />
                    <br />

                    <TextField 
                    id="password" 
                    type='password' 
                    placeholder="Password" 
                    className={classes.textField}
                    value={values.password} 
                    onChange={handleChange('password')} margin="normal" />

                    <br />

                    { userData.hasOwnProperty('error') && (
                        <Typography component='p' color='error'>
                            <Icon color='error' className={classes.error}></Icon>
                            {userData.error}
                        </Typography> 
                        ) 
                    }

                </CardContent>

            <CardActions>
                <Button 
                variant="contained" 
                onClick={clickSubmit}
                className={classes.submit}>
                    Sign up
                </Button>
            </CardActions>

            <CardActions>
                <Typography 
                component='p' 
                className={classes.hasAccount}>
                    or
                </Typography>
            </CardActions>

            <CardActions>
                <a 
                href="http://localhost:5000/auth/facebook/callback"
                className={classes.submit} 
                color='primary' 
                variant="contained" 
                >
                    Sign in with Facebook
                </a>
            </CardActions>

        </Box>

   

            {/* <Dialog open={userData.hasOwnProperty('message') ? true : false}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfuly created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                        <Button color="primary" autoFocus="autoFocus" onClick={redirectTosignin}>Sign In</Button>
                </DialogActions>
            </Dialog> */}
    </Grid>
    )
}

export default Signup