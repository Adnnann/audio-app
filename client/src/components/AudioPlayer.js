

import { useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOffOutlined from "@mui/icons-material/VolumeOffOutlined";
import Slider from '@mui/material/Slider';
import { useSelector } from "react-redux";
import { getFile } from "../features/meditationSlice";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Item from "@material-ui/core/Grid"

const useStyles = makeStyles(theme=>({
    container:{
      paddingRight:'10px',
      paddingLeft:'10px',
      paddingTop:'100px',
      backgroundColor:'#a2c3c8',
      left:'0',
      right:'0',
      bottom:'0',
      top:'0',
      [theme.breakpoints.only('xs')]:{
        width:'400px',
        height:'600px',
        paddingTop:'30px',
        overflowY:'unset'
  
      },
      [theme.breakpoints.only('md')]:{
        paddingTop:'30px',
      }
    },
    player:{
      paddingTop:'50px',
      paddingBottom:'10px',
      borderRadius:'50%',
      height:'500px',
      width:'500px',
      margin:'0 auto',
      marginBottom:'68px',
      [theme.breakpoints.only('xs')]:{
        height:'250px',
        width:'250px',
        marginBottom:'0px',
        paddingTop:'10px',
        paddingBottom:'0px',
      },
      [theme.breakpoints.only('md')]:{
        paddingBottom:'10px',
        borderRadius:'50%',
        height:'400px',
        width:'400px',
      }
    }
  }))
    
  


const Player = () => {

      const classes = useStyles()
      const file = useSelector(getFile)
    
      const [play, setPlay] = useState(true);
      const [values, setValues] = useState({
        volume: 50
      });
    
      const [progress, setProgress] = useState(0);
    
      const audioFile = document.getElementById("testAudio");
    
      const playAudio = () => {
        
        setPlay(false)
        const test = document.getElementById("testAudio");
        test.play();
      };
    
      const pauseAudio = () => {
        setPlay(true)
        const test = document.getElementById("testAudio");
        test.pause();
      };
    
      const reset = () => {
        const test = document.getElementById("testAudio");
        test.currentTime = 0;
        test.play();
      };
    
      const stop = () => {
        setPlay(true)
        const test = document.getElementById("testAudio");
        test.currentTime = 0;
        test.pause();
      };
    
      const changeVolume = (name) => (event) => {
        

            const test = document.getElementById("testAudio");
            setValues({ ...values, [name]: event.target.value });
            test.volume = event.target.value / 100;
      
      };

      //to change src dyamically I have to invoke load function and then play()

      // const getFile1 = () => {
      //   setFile('med5.mp3')
      //   audioFile.load()
      //   audioFile.play()

      // }

      // const getFile2 = () => {
      //   setFile('med10.mp3')
      //   audioFile.load()
      //   audioFile.play()
      //   console.log(audioFile.duration)
      // }
    
      return (
        <Grid container className={classes.container} justifyContent='center'>
  <Grid item xs={12} md={8} lg={8} xl={6}>
<Typography variant="h3" style={{textAlign:'left'}}>
  {file.split('.')[0]} min
</Typography>

</Grid>       
        <Grid item xs={12} md={8} lg={8} xl={6}>

      <Item className={classes.player}>
            <audio
              id="testAudio"
              onTimeUpdate={() =>
                setProgress(audioFile.currentTime / audioFile.duration)
              }
            >
              <source 
              src={`/files/${file}`}></source>
            </audio>
      
              {
                  play ? 
                  <PlayCircleOutlinedIcon
                        style={{ fontSize: "220px" }}
                        onClick={playAudio}
                    />

                  : <PauseCircleOutlinedIcon
                  style={{ fontSize: "220px" }}
                  onClick={pauseAudio}
                />
              }
          
            <br />
                  {values.volume !== 0 ? <VolumeDown /> : <VolumeOffOutlined />}
              
                <Slider
              
                  aria-label="Volume"
                  value={values.volume}
                  onChange={changeVolume("volume")}
                  style={{
                    width: "40%",
                    marginTop: "17px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    display:"inline-flex"
                  }}
                />
                <VolumeUp />
  
                <br />
          
   
            
              <br />
              {audioFile
                ? (`${Math.floor(audioFile.currentTime / 60)}
                  :
                  ${Math.round(audioFile.currentTime % 60) 
                  <10
                  ?  Math.round(audioFile.currentTime % 60)
                  :  Math.round(audioFile.currentTime % 60)} 
                  / 
                  ${Math.floor(audioFile.duration / 60)} 
                  :
                  ${Math.round(audioFile.duration % 60)}`)
                : "0:00"}
              <br />
        
              <progress
                id="seekbar"
                value={progress}
                style={{
                  width: "200px",
                  height: "5px",
                  borderRadius: "25px"
                }}
              ></progress>

            </Item>
          </Grid>
        </Grid>
      );
    
}

export default Player
