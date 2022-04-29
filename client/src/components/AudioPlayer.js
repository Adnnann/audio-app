

import { useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOffOutlined from "@mui/icons-material/VolumeOffOutlined";
import Slider from '@mui/material/Slider';
import { useSelector } from "react-redux";
import {clearMindfulMinutes, clearStreak, clearUserFavoriteList, 
        fetchUserProfile,
        getFile, 
        getMindfullMinutes, 
        getSessions, 
        getStreak, 
        getUpdatedFavorite, 
        getUserProfile, 
        updateFavoriteList,
        updateMindfullMinutes,
        updateSessions,
        updateStreak,
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
        width:'60%',
        [theme.breakpoints.only('xs')]:{
          width:'40%'
        }
    },
    volumeContainer:{
      width:'20%', 
      margin:'0 auto', 
      marginTop:'40px',
      [theme.breakpoints.only('xs')]:{
        width:'40%'
      }
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
const mindfullMinutes = useSelector(getMindfullMinutes)
const streak = useSelector(getStreak)

const [pausedTime, setPausedTime] = useState([])
const [paused, setPaused] = useState(false)
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

        if(mindfullMinutes?.message){
          dispatch(fetchUserProfile(userProfile._id))
          dispatch(clearMindfulMinutes())
        }

        if(streak?.message){
          dispatch(fetchUserProfile(userProfile._id))
          dispatch(clearStreak())
        }

        if(paused){
  
  
          const editedUser = {
            param: userProfile._id,
            data: {
              id:userProfile._id,
              mindfulMinutes: pausedTime.length < 2 ? [0,pausedTime[0]] : [pausedTime[pausedTime.length-2], pausedTime[pausedTime.length-1]]
            },
          }
     
          dispatch(updateMindfullMinutes(editedUser))
          setPaused(false)
        }

    },[token.message, addToFavorite, userSessions, mindfullMinutes, paused, streak])

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
      setPaused(false)
  
      audioFile.play();
      //calculate time difference between two days and then subtract and divide to get diff in days
      //between two dates. In case date between last element in array dayStreak is more than one higher
      //than current date empty dayStreak array - otherwise store value
      let streak = `${new Date().getUTCMonth()}/${new Date().getUTCDate()}/${new Date().getUTCFullYear()}`
  
      if(!userProfile.dayStreak.includes(streak)){
      let dayStreak = []
      let longestStreak = ''
       
       if(userProfile.dayStreak.length === 1){
         
        let dateDiff = new Date(streak).getTime() - new Date(userProfile.dayStreak[0]).getTime()

          if(Math.abs(Math.ceil(dateDiff/(60*60*1000*24))) === 1){
            
            dayStreak = [...userProfile.dayStreak, streak]

            longestStreak = userProfile.longestStreak < dayStreak.length ? 
            userProfile.longestStreak+1 
            : userProfile.longestStreak

          }else{
            dayStreak = []
          }

       }else if(userProfile.dayStreak.length > 1){

        let dateDiff2 = new Date(streak).getTime() - new Date(userProfile.dayStreak[userProfile.dayStreak.length - 1]).getTime()

          if(Math.abs(Math.ceil(dateDiff2/(60*60*1000*24))) === 1){
            dayStreak = [...userProfile.dayStreak, streak]

            longestStreak = userProfile.longestStreak < dayStreak.length ? 
            userProfile.longestStreak+1 
          : userProfile.longestStreak
          }else{
            dayStreak = []
          }
      }else if(userProfile.dayStreak.length ===0){
          dayStreak.push(streak)
      }

      if(userProfile.longestStreak === 0){
        longestStreak = 1
      }
        
    
        const editedUser = {
          param: userProfile._id,
          data: {
            id:userProfile._id,
            streak: dayStreak,
            longestStreak: longestStreak !== '' ? longestStreak : userProfile.longestStreak
          },
        }

        

        dispatch(updateStreak(editedUser))
      }
        
      };
    
      const pauseAudio = () => {
        setPlay(false)
        setPaused(true)
        audioFile.pause();

        
        setPausedTime([...pausedTime, audioFile.currentTime])
       

      };
    
      const reset = () => {
        setPlay(true)
        audioFile.currentTime = 0;
        audioFile.play();
      };
    
      const stop = () => {

       
          setPausedTime([...pausedTime, audioFile.currentTime])
        

        setPlay(false)
        setPaused(true)

        const editedUser = {
          param: userProfile._id,
          data: {
            id:userProfile._id,
            session: file,
          },
        }
   
      dispatch(updateSessions(editedUser))
   
      };
    
      const changeVolume = (name) => (event) => {
         
            setValues({ ...values, [name]: event.target.value });
            audioFile.volume = event.target.value / 100;
      
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

        { file ?
          <>
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
                      ? `0${Math.floor(audioFile.currentTime / 60)}
                        :
                        ${Math.round(audioFile.currentTime % 60) 
                        <10
                        ?  `0${Math.round(audioFile.currentTime % 60)}`
                        :  Math.round(audioFile.currentTime % 60)}`
                      : '00'}
                      </p>

                      <progress
                        id="seekbar"
                        value={progress}
                        className={classes.progressBar}>
                      </progress>

                      <p className={classes.audioTime}>
                      
                      { //added && - check if it works
                        audioFile && audioFile.duration ?
                      `0${Math.floor(audioFile.duration / 60)} 
                       :
                      0${Math.round(audioFile.duration % 60)}`
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
       </>
        : null}
      </Grid>
      );
    
}

export default Player
