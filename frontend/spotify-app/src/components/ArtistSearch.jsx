import React, { useState } from 'react';
import axios from 'axios';

function ArtistSearch() {
    const [artistName, setArtistName] = useState('');
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchArtist = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/search?name=${artistName}`);
            setSongs(response.data);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
        setLoading(false);
    };

    return (
        <div>
            <input 
                value={artistName}
                onChange={e => setArtistName(e.target.value)}
                placeholder="Enter artist name"
            />
            <button onClick={searchArtist}>Search</button>
            {loading && <p>Loading...</p>}
            <ul>
                {songs.map((song, idx) => <li key={idx}>{song.name}</li>)}
            </ul>
        </div>
    );
}

export default ArtistSearch;
