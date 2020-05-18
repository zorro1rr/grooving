import React from 'react';
import './Playlists.css';


class Playlists extends React.Component {
//     constructor(props) {
//     super(props);

//     this.renderTracks = this.renderTracks.bind(this);
// }



componentDidMount(){
    this.props.loadPlaylists();
}

// renderTracks () {
//     //getting props.tracks here
//     console.log('getting the state(now props) in Playlist.js', this.props.tracks);
//     const playlist = this.props.tracks.map(playlist=> {
//         console.log('not working', playlist);
//         return playlist;
//     });
//     console.log(playlist);
//     return playlist;
// }
 
    render() {
        return (
            <div className="playlist">
                {/* {this.renderTracks()}
                {this.props.tracks} */}
            </div>
        );
    }
}

export default Playlists;