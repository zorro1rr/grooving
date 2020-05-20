import React from 'react';
import './PlaylistTracks.css';


class PlaylistTracks extends React.Component {


    render() {
        return (
            <div>
                {console.log(this.props.tracks)}
            {
             this.props.tracks.map(playlist=> {
                return playlist;
             })
            }
            </div>
        )
    }
    
}

export default PlaylistTracks;