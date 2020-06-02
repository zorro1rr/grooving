import React from 'react';
import './PlaylistTracks.css';
import Playlists2 from '../Playlists2/Playlists2';

class PlaylistTracks extends React.Component {
 
    
 
    render() {
       
            console.log('playlist props passed to PlaylistTracks', this.props.playlists);
            // console.log('object.entries(playlist)', Object.entries(this.props.playlists));
     
        
        return (
            <div className="playlistTracks">
               {
                    this.props.playlists.map((playlist, i) => {
                         return  <Playlists2 
                         playlist={playlist}
                         key={i} 
                         />    
                    })
                 }
        </div>
        )
    }
    
}

export default PlaylistTracks;