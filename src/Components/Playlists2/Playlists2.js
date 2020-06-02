import React from 'react';
import './Playlists2.css';


class Playlists2 extends React.Component {
    constructor(props){
        super(props);

        this.deletePlaylist = this.deletePlaylist.bind(this);
    }

     deletePlaylist (event) {
        //  this.props.delete(this.props.playlistId, this.props.playlist);

        //  hack disappear
        //  grab every p element
        //   const id = document.querySelectorAll(`p`);
        //   //make p nodelist  into array
        //   const idArr = Array.prototype.slice.call(id);
        //   idArr.forEach(p => {
        //       //grab id's of event target and tracks I feed in at PlaylistTracks.js
        //    let pId = event.target.parentNode.id;
        //    let id = p.id;
        //    //increase playlist's id by 1 so it matches it's tracks id
        //    ++pId;
        //  //check if it matches and make them  all dissappear.
        //   if(Number(id) === pId){
        //       p.style="display:none;"
        //   }
        //    return
        //   })
        //    event.target.parentNode.style="display: none;"
     }


    render() {
        console.log('playlist passed to playlist2', this.props.playlist);
        return (
            <div>
                <p>{this.props.playlist}</p>
                {/* <button className="dBut" onClick={this.deletePlaylist}>-</button> */}
            </div>
            )
    }
    
}

export default Playlists2;