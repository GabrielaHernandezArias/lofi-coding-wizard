import React, {useState, useRef} from "react";
// Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from "./components/Library";
import Nav from "./components/Nav";
// sass
import "./styles/app.scss";
import data from './data';

function App() {
  // 1. Set local states (are they local, actually?) 
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);  // refffff
  const [libraryStatus, setLibraryStatus]= useState(false);
 
  // 2. State for current song (that used to be in PLAYER) 
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  // 3. Methods 
  // method to update the playbar
  const playbarUpdateTime = (event) => {      // we have access to the event, console log event
    const songTimeElapsed = event.target.currentTime;
    const songDuration = event.target.duration;    // eg. 137 seconds total
    
    // Calculate percentage
    const roundedSongCurrent = Math.round(songTimeElapsed);
    const roundedSongDuration = Math.round(songDuration);
    const animation = Math.round((roundedSongCurrent/roundedSongDuration) *100);
    setSongInfo({...songInfo, currentTime: songTimeElapsed, duration: songDuration, animationPercentage: animation });
  };

  // Auto Skip: when a song ends the next one automatically starts :)
  const songEndHandler = async () => {
    let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id); // get the index of the current song that is playing
    await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]); 
    if (isPlaying) audioRef.current.play();
  };

  // 4. JSX 
  return (
    <div className={`App ${libraryStatus ? `library-active` : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} isPlaying={isPlaying}/>
      <Player Songs={songs} setIsPlaying={setIsPlaying} isPlaying={isPlaying} setCurrentSong={setCurrentSong} currentSong={currentSong} audioRef={audioRef} songInfo={songInfo} setSongs={setSongs} setSongInfo={setSongInfo}/>
      <Library libraryStatus={libraryStatus}  Songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs}/>
      <audio onTimeUpdate={playbarUpdateTime} onLoadedMetadata={playbarUpdateTime} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler}></audio>
    </div>
  );
}

export default App;

// SONG is given a props of currentSong
// the libraryStatus - librar-active animation is really fun and made with the mobile styling in scss thing :)