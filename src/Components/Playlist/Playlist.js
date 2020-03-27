import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    //set up method triggered by onNameChange attribute passed down from App.js
    handleNameChange(event){
        //call the OnNameChange method with value of the event target for an argument
        this.props.onNameChange(event.target.value);
    }

    render(){
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'}
                //attach the handleNameChange method to input to get it's value
                onChange={this.handleNameChange} />
                {/* pass the stated playlistTracks object and the on Remove method from App.js */}
                <TrackList tracks={this.props.playlistTracks}
                    isRemoval={true}
                    onRemove={this.props.onRemove} />
                    {/* attach the passed down savePlaylist method with event listener attribute */}
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;