import React from 'react';
import './Playlists.css';
import PlaylistTracks from  '../PlaylistTracks/PlaylistTracks';

class Playlists extends React.Component {
    constructor(props) {
    super(props);

    this.disPlay = this.disPlay.bind(this);
}



componentDidMount(){
    this.props.loadPlaylists();
}


disPlay (event) {
    event.target.parentNode.style="display: none;";
    const searchresults = document.querySelector('.SearchResults');
    const app = document.querySelector('.App');
    const heading = document.querySelector('h1');
    searchresults.style="display: flex; ";
    app.style="padding-left: 0";
    heading.style="left: 0";
}


 
    render() {
        return (
            <div className="playlist">
            <button className="playlistBut" onClick={this.disPlay}>Show Results</button>
                <PlaylistTracks tracks={this.props.tracks} playlists={this.props.playlists} delete={this.props.delete}/>
            </div>
        );
    }
    
}

export default Playlists;