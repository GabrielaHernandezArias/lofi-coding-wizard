import React from "react";
import LibrarySong from "./LibrarySong";

/*
loop over each song to create a library component

*/

const Library = ({libraryStatus, Songs, setSongs, setCurrentSong, audioRef, isPlaying}) => {

    // 2. JSX active-library 
    return(
        <div className={`library-container ${libraryStatus ? 'active-library': "" }`}>

            <h2> Library </h2>
            <div className="library-songs">
                {Songs.map( (song) => (
                <LibrarySong 
                    Songs={Songs}
                    song={song}
                    setCurrentSong={setCurrentSong} 
                    key={song.id} 
                    id={song.id}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setSongs ={setSongs}
                /> 
            ))}
            </div>

        </div>
    );
};

export default Library;

/*
what are the things that we pass on to each INDIVIDUAL song?

we create a new object <LibrarySong> with the props:
    - song (an individual song with its info)
    - set current song
    - all songs 
    - id (id of the song)
    - key (key of the song, react makes us do this)
*/