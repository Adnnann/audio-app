import Grid from "@material-ui/core/Grid"
import { CardMedia, makeStyles, Typography } from "@material-ui/core"
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import Item from "@material-ui/core/Grid"
import Container from '@mui/material/Container';
import { useDispatch } from "react-redux";
import { setFile } from "../features/meditationSlice";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme=>({
    container: {
        backgroundColor:'#a2c3c8',
        bottom:'0',
        top:'0',
        left:'0',
        right:'0',
        overflow:'none',
        [theme.breakpoints.only('md')]:{
            width:'1040px',
        
        },
        [theme.breakpoints.only('xl')]:{
            width:'100%',
            overflowX:'hidden'
        
        }
        
    },
    buttons:{
        color:'white',
        textTransform:'none',
        fontSize:'20px'
    },
    images:{
        width:'360px',
        height:'360px',
        marginLeft:'5px',
        [theme.breakpoints.up('md')]:{
            width:'300px',
            height:'300px',
        },
        [theme.breakpoints.only('md')]:{
            width:'220px',
            height:'220px',
        }
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
        setFilter('myFavorite')

    }

    const begginers = () => {
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

    const files = [
    'begginers_med5.mp3','stressRelief_med10.mp3','happines_med15.mp3','sleep_med20.mp3',
    'walkingMeditation_med5.mp3','happines_med10.mp3','begginers_med15.mp3','stressRelief_med20.mp3', 
    'stressRelief_med5.mp3','happines_med10.mp3','sleep_med15.mp3','begginers_med20.mp3',
    'stressRelief_med5.mp3','happiness_med10.mp3','sleep_med15.mp3','sleep_med20.mp3',
    // 'med5.mp3','med10.mp3','med15.mp3','med20.mp3']
    ]

    const selectFile = (item) => {
        dispatch(setFile(item.split('_')[1]))
        navigate('/playFile')  
    }

    return(

    
        
        <Grid container className={classes.container}>

            <Grid item xs={12} md={12} lg={12} xl={12}>

  
                <Button 
                onClick={all}
                sx={{
                    color: button.all ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>All</Button>
                <Button 
                onClick={myFavorite}
                sx={{
                    color:button.myFavorite ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }} endIcon={<FavoriteIcon />}>My</Button>
                <Button 
                onClick={begginers}
                sx={{
                    color:button.begginers ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }} 
                >Begginers</Button>
                <Button 
                onClick={stressRelief}
                sx={{
                    color:button.stressRelief ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>Stress Relief</Button>
                <Button 
                onClick={happines}
                sx={{
                    color:button.happines ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>Happines</Button>
                <Button 
                onClick={sleep}
                sx={{
                    color:button.sleep ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>Sleep</Button>
                <Button 
                onClick={walkingMeditation}
                sx={{
                    color: button.walkingMeditation ? 'grey' : 'white',
                    textTransform:'none',
                    fontSize:'20px'
                }}>Walking meditation</Button>
                           
                    
            </Grid>

            <Typography variant="h3" className={classes.categoryTitle}>5 min</Typography>
            <Grid container justifyContent="center" spacing={2}>
         
            {
                files
                .filter(item=>item.includes(filter))
                .map(item=>{
                    if(item.includes('med5')){
                        return(
                            <Grid item xs={12} md={3} lg={3} xl={2}>
                                <Item>
                                    <CardMedia
                                    onClick={()=>selectFile(item)}
                                    className={classes.images}
                                    component={'img'}
                                    src={`files/${item.split('_')[1].split('.')[0]}.jpeg`}
                                    ></CardMedia>
                                </Item>
                            </Grid>

                        )
                    }
                })
            }
            </Grid>
            
            <Typography className={classes.categoryTitle} variant="h3">10 min</Typography>
            <Grid container justifyContent="center">
          
            { 
                files
                .filter(item=>item.includes(filter))
                .map(item=>{
                
                    if(item.includes('med10')){
                        return(
                            <Grid item xs={12} md={3} lg={3} xl={2}>
                                <Item>
                                <CardMedia
                                    className={classes.images}
                                    component={'img'}
                                    src={`files/${item.split('_')[1].split('.')[0]}.jpeg`}
                                    ></CardMedia>
                                </Item>
                            </Grid>

                        )
                    }
                })
            }
            </Grid>

            <Typography className={classes.categoryTitle} variant="h3">15 min</Typography>
            <Grid container justifyContent="center">
            
            { 
                files
                .filter(item=>item.includes(filter))
                .map(item=>{
                    if(item.includes('med15')){
                        return(
                            <Grid item xs={12} md={3} lg={3} xl={2}>
     
                                  <Item >
                                        <CardMedia
                                        className={classes.images}
                                        component={'img'}
                                        src={`files/${item.split('_')[1].split('.')[0]}.jpeg`}
                                        ></CardMedia>
                                    </Item>
                            </Grid>

                        )
                    }
                })
            }
            </Grid>

            <Typography className={classes.categoryTitle} variant="h3">20 min</Typography>
            <Grid container justifyContent="center">
         
            { 
                files
                .filter(item=>item.includes(filter))
                .map(item=>{
                    if(item.includes('med20')){
                        return(
                            <Grid item xs={12} md={3} lg={3} xl={2}>
     
                          <Item>
                                    <CardMedia
                                    className={classes.images}
                                    component={'img'}
                                    src={`files/${item.split('_')[1].split('.')[0]}.jpeg`}
                                    ></CardMedia></Item>
                            </Grid>

                        )
                    }
                })
            }
            </Grid>
            
            

         
        </Grid>
    )

}

export default MainPage