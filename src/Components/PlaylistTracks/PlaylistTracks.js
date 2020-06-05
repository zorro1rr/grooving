import React from 'react';
import './PlaylistTracks.css';
import Playlists2 from '../Playlists2/Playlists2';

class PlaylistTracks extends React.Component {
 
    
 
    render() {
        return (
            <div className="playlistTracks">
               {
                    this.props.playlists.map((playlist, i) => {
                         return  <Playlists2 
                         playlists={playlist}
                         delete={this.props.delete}
                         playlistId={playlist[0][1]}
                         key={i} 
                         />    
                    })
                 }
        </div>
        )
    }
    
}

export default PlaylistTracks;