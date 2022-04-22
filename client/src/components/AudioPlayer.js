

import { useEffect, useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";

import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Box from "@material-ui/core/Box";
import VolumeOffOutlined from "@mui/icons-material/VolumeOffOutlined";
import { SettingsApplicationsRounded } from "@material-ui/icons";
import { createTheme } from "@material-ui/core";
import { style } from "@mui/system";
import Slider from '@mui/material/Slider';
import { Button } from "@mui/material";



const Player = () => {

      const [file, setFile] = useState('med5.mp3')
  
    
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
        <div className="App">
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
                    style={{ fontSize: "80px" }}
                    onClick={playAudio}
                />

              :<StopCircleOutlinedIcon 
              style={{ fontSize: "80px" }} 
              onClick={stop} />
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
          <PauseCircleOutlinedIcon
            style={{ fontSize: "40px" }}
            onClick={pauseAudio}
          />
          <ReplayIcon style={{ fontSize: "40px" }} onClick={reset} />
          
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
              width: "400px",
              height: "5px",
              borderRadius: "25px"
            }}
          ></progress>
        </div>
      );
    
}

export default Player
