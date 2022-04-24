import React, { useState} from "react"
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import { useDispatch } from 'react-redux';
// import { getUser, 
//         createUser, 
//         cleanRegisteredUserData,
//         getCloseAccountData,
//         cleanStore} from "../features/usersSlice"
import { useNavigate } from "react-router"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
        marginBottom:'25%',
        [theme.breakpoints.only('md')]:{
            marginBottom:'12%',
        },
        [theme.breakpoints.only('xs')]:{
            marginBottom:'48%',
        }
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
    hasAccount:{
        margin: '0 auto',
        marginBottom: theme.spacing(1)
    },
    signin:{
        margin: 'auto',
        marginBottom: theme.spacing(1),
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
const ChangePassword = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    //const userData = useSelector(getUser)
    const navigate = useNavigate()
    //const closeAccountData = useSelector(getCloseAccountData)
    const [values, setValues] = useState({
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        error:''
    })

    // useEffect(()=>{
    //     if(closeAccountData.hasOwnProperty('message') || closeAccountData.hasOwnProperty('error') ){
    //         dispatch(cleanStore())
    //     }
    // },[closeAccountData.message, closeAccountData.error])
  
    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = () => {
        const user = {
            oldPassword: values.oldPassword || undefined,
            newPassword:values.oldPassword || undefined,
            confirmPassword:values.oldPassword || undefined,
        }

        
        if(!values.confirmationPassword || values.confirmationPassword === ''){
            setValues({...values, error: 'Please repeat your password'})
            return
        }else if(values.password !== values.confirmationPassword){
            setValues({...values, error: 'Password do not match'})
            return
        }else{
            setValues({...values, error: ''})
        }

        //dispatch(createUser(user))
       
        // if(userData.hasOwnProperty('message')){
        //     setValues({...values, error: '', open:true})
        // }
    }
    const redirectTosignin = () =>{
        navigate('/')
        //dispatch(cleanRegisteredUserData())
    }
    return(
        <Grid container className={classes.container}>
            <Box className={classes.card}>

            <Button 
            startIcon={<ArrowBackIosNewIcon onClick={()=>navigate('/userProfile')}/>} className={classes.accountDetails}>
                   Change Password
            </Button>

                <CardContent>
                    <TextField 
                    id="password" 
                    placeholder="Old password" 
                    className={classes.textField}
                    value={values.oldPassword} 
                    onChange={handleChange('oldPassword')} 
                    margin="normal" />
                    <br />


                    <TextField id="password" 
                    type='password' 
                    placeholder="New Password" 
                    className={classes.textField}
                    value={values.newPassword} 
                    onChange={handleChange('newPassword')} margin="normal" />
                    <br />

                    <TextField 
                    id="password" 
                    type='password' 
                    placeholder="Confirm Password" 
                    className={classes.textField}
                    value={values.confirmPassword} 
                    onChange={handleChange('confirmPassword')} 
                    margin="normal" />

                    <br />

                    {/* {
                    values.error ? (
                        <Typography component='p' color='error'>
                            <Icon color='error' className={classes.error}></Icon>
                            {values.error}
                        </Typography> 
                    ) 
                : userData.hasOwnProperty('error') && (
                        <Typography component='p' color='error'>
                            <Icon color='error' className={classes.error}></Icon>
                            {userData.error.split(':')[2] ? userData.error.split(':')[2] : userData.error}
                        </Typography> 
                    ) 
                } */}

                </CardContent>

            <CardActions>
                <Button variant="contained" onClick={clickSubmit}
                className={classes.submit}>Update</Button>
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

export default ChangePassword