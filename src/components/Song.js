import React from 'react';

// arrow function returning jsx

const Song = ({currentSong}) => {
    return (
        <div className="song-container">
            <img src={currentSong.cover} alt={"song playing is" + currentSong.name}/>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    );
};

export default Song;