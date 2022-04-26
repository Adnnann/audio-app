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
import { useNavigate } from "react-router"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getUserToken, userToken, resetStore, updateUserPassword, getUserProfile, getUserPassword, clearUpdatePassword, fetchUserProfile } from "../features/meditationSlice"
import { useSelector } from "react-redux"
import { useEffect } from "react";
import Item from "@material-ui/core/Grid"

const useStyles = makeStyles(theme=>({
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
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(getUserToken)

    const userProfile = useSelector(getUserProfile)
    const passwordUpdateStatus = useSelector(getUserPassword)

    
    useEffect(()=>{
        //check if user token exists. 
       dispatch(userToken())
        //redirect user in case token doesn't exist
        if(token === 'Request failed with status code 500'
        || token ==='Request failed with status code 401'){
        dispatch(resetStore())
        navigate('/') 
        }

        if(passwordUpdateStatus?.message){
            dispatch(clearUpdatePassword())
            navigate('/musicLibrary')
        }

    },[token.length, passwordUpdateStatus])


    const [values, setValues] = useState({
        oldPassword:'',
        newPassword:'',
        repeatedPassword:'',
        error:''
    })

    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = () => {

        if(values.password !== '' && (values.newPassword === '' || values.repeatedPassword === '')){
            setValues({
                ...values, 
                error:'Enter old, new and repated password!'})
                return
        }else if(values.newPassword !== values.repeatedPassword){
            setValues({
                ...values, 
                error:'New and repeated password do not match!'})
                return
        }else{
            setValues({
                ...values, 
                error:''})
        }

        const editedUser = {
            param: userProfile._id,
            data:{
                password: values.oldPassword,
                newPassword: values.newPassword
            }
        }

        dispatch(updateUserPassword(editedUser))
    }
  
    return(
        <Grid container>
            <Box className={classes.card}>

            <Button 
            startIcon={<ArrowBackIosNewIcon onClick={()=>navigate('/userProfile')}/>} className={classes.accountDetails}>
                   Change Password
            </Button>

                <CardContent>
                    <TextField 
                    id="password" 
                    type="password"
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
                    onChange={handleChange('repeatedPassword')} 
                    margin="normal" />

                    <br />

                </CardContent>

            <CardActions>
                <Button variant="contained" onClick={clickSubmit}
                className={classes.submit}>Update</Button>
            </CardActions>


            </Box>

            {passwordUpdateStatus?.error && (
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Item>
                        <p style={{textAlign:'center', color:"red"}}>{passwordUpdateStatus.error}</p>
                    </Item>
                </Grid>
            )
            }

            {
                values.error !== '' && (
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Item>
                            <p style={{textAlign:'center', color:"red"}}>{values.error}</p>
                        </Item>
                </Grid>
                )
                
            }

        </Grid>
    )
}

export default ChangePassword