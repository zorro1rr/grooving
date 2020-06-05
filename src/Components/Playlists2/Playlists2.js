import React from 'react';
import './Playlists2.css';

class Playlists2 extends React.Component {
    constructor(props){
        super(props);

        this.deletePlaylist = this.deletePlaylist.bind(this);
        this.showDelete = this.showDelete.bind(this);
    }

     deletePlaylist() {
         this.props.delete(this.props.playlistId);
     }
     
     showDelete(event) {
         event.target.style="display:none";
         event.target.previousSibling.style = "display: flex;"
     }


    render() {
        return (
            <div>
            {this.props.playlists.map((playlist, i) =>{
                if (i === 0){
                    return <div key={playlist[0] + 1} className="playDiv"><h2 key={playlist[0] + 2}className="playlistNames">{playlist[0]}</h2>
                    <button key={playlist[0] + 3} className="fdBut" id="fdbut" onClick={this.deletePlaylist}>Delete</button>
                    <button key={playlist[0] + 4} className="dBut" onClick={this.showDelete}>-</button></div>
                }
                return <ul key={this.props.playlistId} className="playlistTracks">{playlist.map((track, i)  =>{
                    return <li key={i}>{track}</li>
                })}</ul>
            })}
        </div>
            )
    }
    
}

export default Playlists2;