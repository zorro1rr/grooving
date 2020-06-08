import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
  render() {
    return (
      //Pass results of SearchResults in SearchResults.js to this component with this.props}
      <div className="TrackList">
        {
          //loop through the SearchResults Array's objests we set in App.js and set the keys
          this.props.tracks.map((track) => {
            //for each object in the SearchResults Array return a seperate track component
            //the attribute value {track} will provide the entire object with the name, artist, album, id
            return (
              <Track
                track={track}
                key={track.id}
                previewUrl={this.props.previewUrl}
                //pass onAdd from here to Track, onRemove, isRemoval and preview to track.js
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval}
                preview={this.props.preview}
              />
            );
          })
        }
      </div>
    );
  }
}

export default TrackList;
