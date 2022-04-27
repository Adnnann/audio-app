import Grid from "@material-ui/core/Grid"
import { CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core"
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import Item from "@material-ui/core/Grid"
import { useDispatch } from "react-redux";
import { fbLogin, getAllFiles, getUserProfile, setFile } from "../features/meditationSlice";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { getUserToken, userToken, resetStore } from "../features/meditationSlice"
import { useSelector } from "react-redux"
import { useEffect } from "react";

const useStyles = makeStyles(theme=>({
    buttons:{
        color:'white',
        textTransform:'none',
        fontSize:'20px'
    },
    images:{
        width:'360px',
        height:'360px',
    },
    categoryTitle:{
        marginBottom:'20px',
        marginLeft:'20px',
        textDecoration:'underline'
    }

}))
const MainPage = () => {

const classes = useStyles()
const [filter, setFilter] = useState('')
const dispatch = useDispatch()
const navigate = useNavigate()
const token = useSelector(getUserToken)
const allFiles = useSelector(getAllFiles)
const favorites = useSelector(getUserProfile).favorites
const [favoriteFilter, setFavoriteFilter] = useState(false)

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


    const [button, setButton] = useState({
        all:true,
        myFavorite:false,
        begginers:false,
        stressRelief: false,
        happines: false,
        sleep:false,
        walkingMeditation: false
    })

    const all = () => {
        setFavoriteFilter(false)
        setButton({
            all:true,
            myFavorite:false,
            begginers:false,
            stressRelief: false,
            happines: false,
            sleep:false,
            walkingMeditation: false
        })

        setFilter('')

    }

    const myFavorite = () => {
        setButton({
            all:false,
            myFavorite:true,
            begginers:false,
            stressRelief: false,
            happines: false,
            sleep:false,
            walkingMeditation: false
        })
        setFilter('')
        setFavoriteFilter(true)

    }

    const begginers = () => {
        setFavoriteFilter(false)
        setButton({
            all:false,
            myFavorite:false,
            begginers:true,
            stressRelief: false,
            happines: false,
            sleep:false,
            walkingMeditation: false
        })
        setFilter('begginers')
    }

    const stressRelief = () => {
        setFavoriteFilter(false)
        setButton({
            all:false,
            myFavorite:false,
            begginers:false,
            stressRelief: true,
            happines: false,
            sleep:false,
            walkingMeditation: false
        })
        setFilter('stressRelief')
    }

    const happines = () => {
        setFavoriteFilter(false)
        setButton({
            all:false,
            myFavorite:false,
            begginers:false,
            stressRelief: false,
            happines: true,
            sleep:false,
            walkingMeditation: false
        })
        setFilter('happines')
    }

    const sleep = () => {
        setFavoriteFilter(false)
        setButton({
            all:false,
            myFavorite:false,
            begginers:false,
            stressRelief: false,
            happines: false,
            sleep:true,
            walkingMeditation: false
        })
        setFilter('sleep')
    }

    const walkingMeditation = () => {
        setFavoriteFilter(false)
        setButton({
            all:false,
            myFavorite:false,
            begginers:false,
            stressRelief: false,
            happines: false,
            sleep:false,
            walkingMeditation: true
        })
        setFilter('walkingMeditation')
    }

    const selectFile = (item) => {
        dispatch(setFile(item))
        navigate('/playFile')  
    }

    return(

    
        
        <Grid container>

        {Object.keys(allFiles).length !== 0 ?
<>
            <Grid item xs={12} md={12} lg={12} xl={12}>

  
                <Button 
                onClick={all}
                sx={{
                    color: button.all ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>
                    All
                </Button>

                <Button 
                onClick={myFavorite}
                sx={{
                    color:button.myFavorite ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }} endIcon={<FavoriteIcon />}>
                     My
                </Button>
               
                <Button 
                onClick={begginers}
                sx={{
                    color:button.begginers ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }} 
                >
                    Begginers
                </Button>

                <Button 
                onClick={stressRelief}
                sx={{
                    color:button.stressRelief ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>
                    Stress Relief
                </Button>

                <Button 
                onClick={happines}
                sx={{
                    color:button.happines ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>
                    Happines
                </Button>

                <Button 
                onClick={sleep}
                sx={{
                    color:button.sleep ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>
                    Sleep
                </Button>

                <Button 
                onClick={walkingMeditation}
                sx={{
                    color: button.walkingMeditation ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>
                    Walking meditation
                </Button>
                           
                    
            </Grid>

            <Typography variant="h3" className={classes.categoryTitle}>5 min</Typography>
            <Grid 
            container 
            justifyContent="center" 
            spacing={2}>
         
            { 
                favoriteFilter ? 
                favorites
                .map((item, index)=>{
                    if(item.includes('med5')){
                        return(
                            <Grid item xs={12} md={3} lg={3} xl={2} key={`${index}${item}`}>
                                <Item>
                                    <Card>
                                        <CardMedia
                                        onClick={()=>selectFile(item)}
                                        className={classes.images}
                                        component={'img'}
                                        src={`files/${item.split('.')[0]}.jpeg`}
                                        ></CardMedia>
                                        
                                        <CardContent>
                                            {item.split('_')[0]}
                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>

                        )
                    }
                }) 
                : allFiles.files
                .filter(item=>item.includes('mp3'))
                .filter(item=>item.includes(filter))
                .map((item, index)=>{
                    if(item.includes('med5')){
                        return(
                            <Grid item xs={12} md={3} lg={3} xl={2} key={`${index}${item}`}>
                                <Item>
                                    <Card>
                                        <CardMedia
                                        onClick={()=>selectFile(item)}
                                        className={classes.images}
                                        component={'img'}
                                        src={`files/${item.split('.')[0]}.jpeg`}
                                        ></CardMedia>
                                        
                                        <CardContent>
                                        {item.split('_')[0]}
                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>

                        )
                    }
                })
            }
            </Grid>
            
            <Typography 
            className={classes.categoryTitle} 
            variant="h3">
                10 min
            </Typography>
            <Grid 
            container 
            justifyContent="center"
            spacing={2}>
          
            { 
                favoriteFilter ? 
                favorites 
                .map((item, index)=>{
                    if(item.includes('med10')){
                        return(
                            <Grid key={`${index}${item}`} item xs={12} md={3} lg={3} xl={2}>
                                <Item>
                                    <Card>
                                        <CardMedia
                                        onClick={()=>selectFile(item)}
                                        className={classes.images}
                                        component={'img'}
                                        src={`files/${item.split('.')[0]}.jpeg`}
                                        ></CardMedia>
                                        
                                        <CardContent>
                                        {item.split('_')[0]}
                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>

                        )
                    }
                })
                : 
                allFiles.files
                .filter(item=>item.includes('mp3'))
                .filter(item=>item.includes(filter))
                .map((item, index)=>{
                    if(item.includes('med10')){
                        return(
                            <Grid key={`${index}${item}`} item xs={12} md={3} lg={3} xl={2}>
                                <Item>
                                    <Card>
                                        <CardMedia
                                        onClick={()=>selectFile(item)}
                                        className={classes.images}
                                        component={'img'}
                                        src={`files/${item.split('.')[0]}.jpeg`}
                                        ></CardMedia>
                                        
                                        <CardContent>
                                        {item.split('_')[0]}
                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>

                        )
                    }
                })
            }
            </Grid>

            <Typography 
            className={classes.categoryTitle} 
            variant="h3">
                15 min
            </Typography>

            <Grid 
            container 
            justifyContent="center"
            spacing={2}>
            
            { 
                favoriteFilter ? 
                favorites 
                .map((item, index)=>{
                    if(item.includes('med15')){
                        return(
                            <Grid key={`${index}${item}`} item xs={12} md={3} lg={3} xl={2}>
     
                                  <Item >
                                        <Card>
                                            <CardMedia
                                            onClick={()=>selectFile(item)}
                                            className={classes.images}
                                            component={'img'}
                                            src={`files/${item.split('.')[0]}.jpeg`}
                                            ></CardMedia>
                                            
                                            <CardContent>
                                            {item.split('_')[0]}
                                            </CardContent>
                                        </Card>
                                    </Item>
                            </Grid>

                        )
                    }
                })
                : allFiles.files
                .filter(item=>item.includes('mp3'))
                .filter(item=>item.includes(filter))
                .map((item, index)=>{
                    if(item.includes('med15')){
                        return(
                            <Grid key={`${index}${item}`} item xs={12} md={3} lg={3} xl={2}>
     
                                  <Item >
                                        <Card>
                                            <CardMedia
                                            onClick={()=>selectFile(item)}
                                            className={classes.images}
                                            component={'img'}
                                            src={`files/${item.split('.')[0]}.jpeg`}
                                            ></CardMedia>
                                            
                                            <CardContent>
                                            {item.split('_')[0]}
                                            </CardContent>
                                        </Card>
                                    </Item>
                            </Grid>

                        )
                    }
                })
            }
            </Grid>

            <Typography 
            className={classes.categoryTitle} 
            variant="h3">
                20 min
            </Typography>

            <Grid 
            container 
            justifyContent="center"
            spacing={2}>
         
            { 
                favoriteFilter ? 
                favorites 
                .map((item, index)=>{
                    if(item.includes('med20')){
                        return(
                            <Grid key={`${index}${item}`} item xs={12} md={3} lg={3} xl={2}>
                                <Item>
                                    <Card>
                                        <CardMedia
                                        onClick={()=>selectFile(item)}
                                        className={classes.images}
                                        component={'img'}
                                        src={`files/${item.split('.')[0]}.jpeg`}
                                        ></CardMedia>
                                        
                                        <CardContent>
                                        {item.split('_')[0]}
                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>

                        )
                    }
                })

                : allFiles.files
                .filter(item=>item.includes('mp3'))
                .filter(item=>item.includes(filter))
                .map((item, index)=>{
                    if(item.includes('med20')){
                        return(
                            <Grid key={`${index}${item}`} item xs={12} md={3} lg={3} xl={2}>
                                <Item>
                                    <Card>
                                        <CardMedia
                                        onClick={()=>selectFile(item)}
                                        className={classes.images}
                                        component={'img'}
                                        src={`files/${item.split('.')[0]}.jpeg`}
                                        ></CardMedia>
                                        
                                        <CardContent>
                                        {item.split('_')[0]}
                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>

                        )
                    }
                })
            }
        </Grid>
        </>
       : null }    
    </Grid>
    )

}

export default MainPage