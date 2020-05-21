import React from 'react';
import './PlaylistTracks.css';
import Tracks2 from  '../Tracks2/Tracks2';
import Playlists2 from '../Playlists2/Playlists2';

class PlaylistTracks extends React.Component {

    // componentDidMount(){
    //     this.props.loadPlaylists();
    // }
   

    render() {
        return (
            <div>
                {
                    this.props.playlists.map(playlist => {
                        if(typeof playlist === 'string'){
                            return  <Playlists2 
                            playlists={playlist} />
                        } else {
                       return   playlist.map(track=> {
                                return <Tracks2 
                                track={track}
                                key={track.id} />
                            })
                        }
                    })
                }
            </div>
        )
    }
    
}

export default PlaylistTracks;