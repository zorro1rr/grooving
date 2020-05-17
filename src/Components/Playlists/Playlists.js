import React from 'react';
import './Playlists.css';


class Playlists extends React.Component {
constructor(props){
    super(props)

    this.showPlaylists =  this.showPlaylists.bind(this);
}


showPlaylists () {
    this.props.loadPlaylists();
}

    render() {
        return (
            <div className="playlist">
                <button className="playlistButton" onClick={this.showPlaylists}>Fetch Playlists</button>
            </div>
        );
    }
}

export default Playlists