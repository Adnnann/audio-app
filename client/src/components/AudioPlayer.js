

import { useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOffOutlined from "@mui/icons-material/VolumeOffOutlined";
import Slider from '@mui/material/Slider';
import { useSelector } from "react-redux";
import {clearUserFavoriteList, 
        fetchUserProfile,
        getFile, 
        getSessions, 
        getUpdatedFavorite, 
        getUserProfile, 
        updateFavoriteList,
        updateSessions,
} from "../features/meditationSlice";
import { Card, CardActions, CardMedia,  Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Item from "@material-ui/core/Grid"
import { getUserToken, userToken, resetStore, clearUserSessions } from "../features/meditationSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart}  from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

const useStyles = makeStyles(theme=>({
    player:{
      paddingTop:'50px',
      paddingBottom:'10px',
      borderRadius:'50%',
      height:'500px',
      width:'500px',
      margin:'0 auto',
    },
    audioLenght:{
      textAlign:'left',
      textDecoration:'underline'
    },
    audioTimeAndProgress: {
      width: "60%",
      height: "5px",
      borderRadius: "25px",
      margin:'0 auto'
    },
    audioTime:{
      display:'inline-flex'
    },
    progressBar:{
        marginLeft:'12px', 
        marginRight:'12px', 
        width:'60%'
    },
    volumeContainer:{
      width:'20%', 
      margin:'0 auto', 
      marginTop:'40px'
    },
    volumeAdjuster:{
        marginTop: "5px",
        marginLeft: "2px",
        marginRight: "2px",
        margin:'0 auto',
        display:"inline-flex",
    },
    card:{
        textAlign:'center', 
        borderRadius:'50%',
        backgroundColor:'#fff2cd',
        marginTop:"20px"
    }
    
  }))
    
  


const Player = () => {

const dispatch = useDispatch()
const token = useSelector(getUserToken)
const navigate = useNavigate()
const addToFavorite = useSelector(getUpdatedFavorite)
const userProfile = useSelector(getUserProfile)
const userSessions = useSelector(getSessions)
useEffect(()=>{
        //check if user token exists. 
        dispatch(userToken())
        //redirect user in case token doesn't exist
        if(token === 'Request failed with status code 500'
        || token ==='Request failed with status code 401'){
        dispatch(resetStore())
        navigate('/') 
        }

        if(addToFavorite?.message){
          dispatch(fetchUserProfile(userProfile._id))
          dispatch(clearUserFavoriteList())
        }

        if(userSessions?.message){
          dispatch(fetchUserProfile(userProfile._id))
          dispatch(clearUserSessions())
        }

    },[token.message, addToFavorite, userSessions])

      const classes = useStyles()
      const file = useSelector(getFile)
    
      const [play, setPlay] = useState(false);
      const [values, setValues] = useState({
        volume: 50
      });


    
      const [progress, setProgress] = useState(0);
    
      const audioFile = document.getElementById("testAudio");
    
      const playAudio = () => {
        
        setPlay(true)
        const test = document.getElementById("testAudio");
        test.play();
      };
    
      const pauseAudio = () => {
        setPlay(false)
        const test = document.getElementById("testAudio");
        test.pause();
      };
    
      const reset = () => {
        setPlay(true)
        const test = document.getElementById("testAudio");
        test.currentTime = 0;
        test.play();
      };
    
      const stop = () => {
        setPlay(false)
        const editedUser = {
          param: userProfile._id,
          data: {
            id:userProfile._id,
            session: file
          },
        }
      dispatch(updateSessions(editedUser))
      };
    
      const changeVolume = (name) => (event) => {
        

            const test = document.getElementById("testAudio");
            setValues({ ...values, [name]: event.target.value });
            test.volume = event.target.value / 100;
      
      };

      const addToFavorites = () => {
        const editedUser = {
          param: userProfile._id,
          data: {
            id:userProfile._id,
            favorites: file
          },
        }
      dispatch(updateFavoriteList(editedUser))
      }

    
      return (
        <Grid 
        container 
        justifyContent='center' >
          
          <Grid item xs={12} md={8} lg={8} xl={6}>
            <Typography 
            variant="h3" 
            className={classes.audioLenght}>
            
            </Typography>
          </Grid>    

        <Grid item xs={12} md={8} lg={8} xl={9} >

          <Item>

            <Card 
            className={classes.card}>
      
            
              <CardMedia 
              //autoPlay
              component={'audio'}
              id="testAudio"
              src={`/files/${file}`}
              onEnded={stop}
              onTimeUpdate={() =>
                setProgress(audioFile.currentTime / audioFile.duration)
              }
              ></CardMedia>

              <CardActions>
              
                {
                  !play ? 
                  <PlayCircleOutlinedIcon
                        style={{ 
                          fontSize: "220px",
                          margin:'0 auto' 
                        }}
                        onClick={playAudio}
                    />

                  : <PauseCircleOutlinedIcon
                  className={classes.pauseAndPlayIcons}
                  style={{ 
                    fontSize: "220px", 
                    margin:'0 auto' 
                  }}
                  onClick={pauseAudio}
                  />
                }
              </CardActions>
              
              <ReplayIcon
              onClick={reset} 
              className={classes.replay}/>
              
              <CardActions style={{textAlign:'center'}}>

                  <span 
                  className={classes.audioTimeAndProgress}>
                
                      <p className={classes.audioTime}>
                      {audioFile
                      ? `${Math.floor(audioFile.currentTime / 60)}
                        :
                        ${Math.round(audioFile.currentTime % 60) 
                        <10
                        ?  Math.round(audioFile.currentTime % 60)
                        :  Math.round(audioFile.currentTime % 60)}`
                      : '00'}
                      </p>

                      <progress
                        id="seekbar"
                        value={progress}
                        className={classes.progressBar}>
                      </progress>

                      <p className={classes.audioTime}>
                      {audioFile ?
                      `${Math.floor(audioFile.duration / 60)} 
                          :
                          ${Math.round(audioFile.duration % 60)}`
                        : "0:00"
                      }
                      </p>
                    
                    </span>

                </CardActions>

                <CardActions 
                className={classes.volumeContainer}>
      
                  {values.volume !== 0 ? <VolumeDown /> : <VolumeOffOutlined />}
                      
                        <Slider
                          className={classes.volumeAdjuster}
                          aria-label="Volume"
                          value={values.volume}
                          onChange={changeVolume("volume")}
                          
                        />
                        <VolumeUp />
                        <FontAwesomeIcon 
                          icon={faHeart}
                          onClick={addToFavorites}
                        style={{color:userProfile.favorites.includes(file) ? 'black' : 'grey'}} 
              />
                </CardActions>

               
             
             </Card>
             
          </Item>
            
        </Grid>
        
      </Grid>
      );
    
}

export default Player
