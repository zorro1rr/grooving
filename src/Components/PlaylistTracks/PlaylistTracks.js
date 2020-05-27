import React from 'react';
import './PlaylistTracks.css';
import Tracks2 from  '../Tracks2/Tracks2';
import Playlists2 from '../Playlists2/Playlists2';

class PlaylistTracks extends React.Component {
 
 
    render() {
        return (
            <div className="playlistTracks">
            {
                this.props.playlists.map((playlist, i) => {
                    if(playlist.playlistId){
                         return  <Playlists2 
                         playlists={playlist} 
                         key={playlist.playlistId}
                         playlistId={playlist.playlistId}
                         delete={this.props.delete}
                         id={i}/>
                    } else {
                   return   playlist.map(track=> {
                            return  <Tracks2 
                            track={track}
                            key={track.id} 
                            id={i}/>
                        })
                        
                    }
                })
            }
        </div>
        )
    }
    
}

export default PlaylistTracks;