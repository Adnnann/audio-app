import React, {useState} from "react"
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"
import { makeStyles } from "@material-ui/core"
import { loginUser, getUserSigninData, fetchUserProfile, fetchFiles} from "../features/meditationSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Grid, Box } from "@mui/material"
import { grey } from "@mui/material/colors"


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
    error: {
        verticalAlign: 'middle'
    },
    title:{
        marginTop: theme.spacing(2),
        color: 'grey',
        fontWeight:'bold',
        marginLeft:'10px',
        marginRight:'10px'
    },
    textField:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit:{
        margin: 'auto',
        textTransform:'none',
        backgroundColor:'lightblue',
        color:'black'
    },
    noaccount:{
        margin: '0 auto',
    },
    signup:{
        margin: 'auto',
        marginBottom: theme.spacing(1),
    },

}))


    const Login = () => {
    
        const classes = useStyles()
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const userSigninData = useSelector(getUserSigninData)
        
        const [values, setValues] = useState({
            email:'',
            password:'',
        })
    
        //if user has token (is logged) redirected to protected page
        useEffect(()=>{
            if(userSigninData.hasOwnProperty('token')){
              dispatch(fetchUserProfile(userSigninData.user._id))
              dispatch(fetchFiles())
              navigate('/musicLibrary')
            }
          },[userSigninData])
    
        // send request to server to login user and in case there are errors collect error
        const clickSubmit = () => {
            const user = {
                email: values.email || undefined,
                password: values.password || undefined
            }
            dispatch(loginUser(user))    
        }
    
        // get values from input fields
        const handleChange = name => event => {
            setValues({...values, [name]: event.target.value})
        }

        const redirectToSignup = () => {
            navigate('/signup')
        }
    
        return(

        <Grid container>
            <Box className={classes.card}>

                    <Typography 
                    variant='h4' 
                    className={classes.title}>
                        Log into your account
                    </Typography>
        
                    <CardContent>
                        <Typography 
                        variant='h6' 
                        className={classes.tittle}>
                            Sign In
                        </Typography>
        
                        <TextField 
                        id="email" 
                        type='email' 
                        label="Email" 
                        className={classes.textField}
                        value={values.email} 
                        onChange={handleChange('email')} 
                        margin="normal" />
                        <br />
        
                        <TextField 
                        id="password" 
                        type='password' 
                        label="Password" 
                        className={classes.textField}
                        value={values.password} 
                        onChange={handleChange('password')} 
                        margin="normal" />
                        <br />

                        { //display error returned from server
                            userSigninData?.error && (
                                <Typography component='p' color='error'>
                                    <Icon color='error' className={classes.error}></Icon>
                                    {userSigninData.error}
                                </Typography>
                            )
                        }
        
                    </CardContent>
        
                <CardActions>
                    <Button 
                    variant="contained" 
                    onClick={clickSubmit}
                    className={classes.submit}>
                        Login
                    </Button>
                </CardActions>

                <CardActions>
                    <Typography 
                    component='p' 
                    className={classes.noaccount}>
                        or
                    </Typography>
                </CardActions>

                <CardActions>
                    <Button className={classes.submit} color='primary' variant="contained" onClick={clickSubmit}>
                        Sign in with Facebook
                    </Button>
                </CardActions>
            
            </Box>

        </Grid>
        )
    
    }

export default Login