import React from 'react';
import './Playlists.css';
import PlaylistTracks from  '../PlaylistTracks/PlaylistTracks';

class Playlists extends React.Component {
    constructor(props) {
    super(props);

    this.disPlay = this.disPlay.bind(this);
    // this.renderTracks = this.renderTracks.bind(this);
}



componentDidMount(){
    this.props.loadPlaylists();
}

// renderTracks () {
//     getting props.tracks here
//     console.log('getting the state(now props) in Playlist.js', this.props.tracks);
//     const playlist = this.props.tracks.map(playlist=> {
//         console.log('not working', playlist);
//         return playlist;
//     });
//     console.log(playlist);
//     return playlist;
    
// }

disPlay (event) {
    console.log('test');
    alert('test');
    event.target.parentNode.style="display: none;";
    const searchresults = document.querySelector('.SearchResults');
    searchresults.style="display: initial;";
}


 
    render() {
        return (
            <div className="playlist">
            {/* <button className="playlistBut" onClick={this.disPlay}>Show Results</button> */}
                <PlaylistTracks tracks={this.props.tracks}/>
            </div>
        );
    }
    
}

export default Playlists;