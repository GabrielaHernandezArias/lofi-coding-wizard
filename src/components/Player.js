import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons"; // singular component aka car type: tesla

// MAIN: arrow function returning jsx (the play bar <->) with props from APP.JS
const Player = ({Songs, setSongs, currentSong, setCurrentSong, songInfo, setSongInfo, isPlaying, setIsPlaying, audioRef}) => {

    // Event Handlers

    const activeLibraryHandler = (nextPrev) => {
       // add active state (this is the same code we use in library song.js)
            // return all the song properties (title etc) the same but modify the active property to true
            const newSongs = Songs.map((song)=> {
                if(song.id === nextPrev.id){ // the ID represents the song we click on. if they match we clicked on the one currently playing
                    return {
                        ...song,
                        active: true,
                    }
                }
                else {
                    return {
                        ...song,
                        active: false,
                    }
                }
            });
        setSongs(newSongs);
    }

    const playSongHandler = () => {
        // debugging: console.log(audioRef);
       if (isPlaying) {
            audioRef.current.pause(); // these are built in to the audio
            setIsPlaying(!isPlaying);
       }
       else {
            audioRef.current.play();
            setIsPlaying(!isPlaying); // setting this to the opposite of what it is
       }
    };

    const formatSongTime = (timeVar) => {
        return (
            Math.floor(timeVar / 60) + ":" + ("0" + Math.floor(timeVar % 60)).slice(-2) // every time we get up to 60 it starts up at 0 again
        );
    };

    // every time that we move the input bar manually (onChange) this function is going to run (dragHandler)
    const dragHandler = (event) => {
        audioRef.current.currentTime = event.target.value; // updating the value
        setSongInfo({...songInfo, currentTime: event.target.value});   // we need to hook this up to the state to update values
    };

    // function to skip a song (back or forward)
    // our songs are in an array index, get current index and then check out the one before and the one after
    const skipTrackHandler = async (direction) => {
        let currentSongIndex = Songs.findIndex((song) => song.id === currentSong.id); // get the index of the current song that is playing
       
        if (direction === "skip-forward"){
            await setCurrentSong(Songs[(currentSongIndex + 1) % Songs.length]);   // reset to first song if we reach the end
            activeLibraryHandler(Songs[(currentSongIndex + 1) % Songs.length]); // updating the active song to be the next one, since we're skipping forward
            /* DEBUGGING
            console.log(`next index: ${currentSongIndex +1}`);
            console.log(`songs length: ${Songs.length}`);
            console.log(`modulus: ${(currentSongIndex +1) % Songs.length}`);
        */
        }
        if (direction === "skip-back") {
            if ((currentSongIndex -1) % Songs.length === -1){
                await setCurrentSong(Songs[Songs.length-1]);
                activeLibraryHandler(Songs[Songs.length-1]);
                if (isPlaying) audioRef.current.play();                // if we don't add this the last line of setCurrentSong will crash the app
                return; // if we don't add this the last line of setCurrentSong will crash the app
            }
            await setCurrentSong(Songs[(currentSongIndex - 1) % Songs.length]);
        }
        if (isPlaying) audioRef.current.play();
    };

    // dynamic variable "translateX" in the animate-track div: how much of the track div is overshadowed
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };

    // 3. JSX 
    return (
        <div className="player-container">
            <div className="time-control"> 
                <p> {formatSongTime(songInfo.currentTime)} </p>

            <div className="track" style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`}}>
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <div className="animate-track" style={trackAnim}></div>
            </div>

                <p> {songInfo.duration ? formatSongTime(songInfo.duration) : "0:00"} </p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} onClick={() => skipTrackHandler("skip-back")}/>
                <FontAwesomeIcon className="play" size="2x" icon={isPlaying ? faPause : faPlay} onClick={playSongHandler}/>
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} onClick={() => skipTrackHandler("skip-forward")}/>
            </div>
        </div>
    )
}

export default Player;

/*
NOTES
- onTimeUpdate is like onClick but it runs EVERY time the time updates in the audio
- onLoadedMetadata 

JSX:
- input is the music bar (which is why onChange calls the dragHandler function)
- "animate-track" div goes on top of the input and slides off to reveal the input bar
- div "track" has a style that is the gradient mix of the current song's two main colors :) cool right? 
*/
