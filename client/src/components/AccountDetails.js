

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
import { useNavigate } from "react-router-dom"
import { getUserToken, userToken, resetStore, updateUserProfile, getUserProfile, getUpdateUserProfile, clearUpdateUserProfile, fetchUserProfile } from "../features/meditationSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

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
        color: theme.palette.openTitle,
        marginBottom:theme.spacing(2),
    },
    textField:{
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(1),
        width:300,
        [theme.breakpoints.only('xs')]:{
            width:220
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
        backgroundColor:'grey',
        textTransform:'none'
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

    const dispatch = useDispatch()
    const token = useSelector(getUserToken)
    const classes = useStyles()
    const navigate = useNavigate()
    const userProfile = useSelector(getUserProfile)
    const updateUserProfileStatus = useSelector(getUpdateUserProfile)

    const [values, setValues] = useState({
        email:userProfile.email,
        username:userProfile.username
    })

    const [editUserData, setEditUserData] = useState({
        username: false,
        email:false
    })

    useEffect(()=>{

        if(values.email === '' || values.username === ''){
            setValues({
                email:userProfile.email,
                username:userProfile.username
            })
        }
        

        //check if user token exists. 
        dispatch(userToken())
        //redirect user in case token doesn't exist
        if(token === 'Request failed with status code 500'
        || token ==='Request failed with status code 401'){
        dispatch(resetStore())
        navigate('/') 
        }

        if(updateUserProfileStatus?.message){
            dispatch(clearUpdateUserProfile())
            dispatch(fetchUserProfile(userProfile._id))
            navigate('/musicLibrary')
        }

    },[token.length, updateUserProfileStatus, userProfile.email])

    const clickSubmit = () => {
        const userToEdit = {
            param: userProfile._id,
            data:{
            email: values.email === userProfile.email ? undefined : values.email,
            username: values.username === userProfile.username ? undefined : values.username
            }
        }
        dispatch(updateUserProfile(userToEdit))    
    }

    // get values from input fields
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    return(

        <Grid container>

        <Box className={classes.card}>

            <Button 
            startIcon={<ArrowBackIosNewIcon onClick={()=>navigate('/userProfile')}/>} className={classes.accountDetails}>
                   Account Details
            </Button>
    
                <CardContent>
                    <Typography 
                    variant='h6' 
                    className={classes.tittle}>
                        Sign In
                    </Typography>
    
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
                    onChange={handleChange('username')} 
                    margin="normal" 
                    disabled={editUserData.username ? false : true}
                    
                    />
                    <EditIcon 
                    onClick={()=>setEditUserData({username:true})}
                    className={classes.edit}/>
                    <br />
    
                </CardContent>


            <CardActions>
                <Button disabled={editUserData.email || editUserData.username ? false : true}
                className={classes.submit} 
                color='primary' 
                variant="contained" 
                onClick={clickSubmit}>
                    Update
                </Button>
            </CardActions>
            
        </Box>
        {updateUserProfileStatus?.error && (
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Item>
                        <p style={{textAlign:'center', color:"red"}}>{updateUserProfileStatus.error}</p>
                    </Item>
                </Grid>
            )
            }
    </Grid>
    )
}

export default AccountDetails