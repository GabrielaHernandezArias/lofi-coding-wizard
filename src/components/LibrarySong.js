import React from 'react';
// a component that displays each song

const LibrarySong = ({song, setSongs, Songs, id, setCurrentSong, audioRef, isPlaying}) => {

    // 1. methods
    const selectSongMethod = async () => {
        const selectedSong= Songs.filter((state) => state.id === id);
        await setCurrentSong(selectedSong[0]);

        // add active state
            // return all the song properties (title etc) the same but modify the active property to true
        const newSongs = Songs.map((song)=> {
            if(song.id === id){ // the ID represents the song we click on. if they match we clicked on the one currently playing
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

        // check if song is playing
        if (isPlaying) audioRef.current.play();
    };

    // 2. JSX
    return (
        <div className={`library-song ${song.active ? 'selected-song': ""}`} onClick={selectSongMethod}>
            <img src={song.cover} alt={"song playing is" + song.name}/>
            <div className='song-description'>
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>

        </div>
    );
};

export default LibrarySong;