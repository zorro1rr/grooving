import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.dis = this.dis.bind(this);
  }

  //make button so we can swap the search results and the playlists in smaller displays
  dis(event) {
    const playlists = document.querySelector(".playlist");
    const app = document.querySelector(".App");
    const heading = document.querySelector("h1");
    const playlist = document.querySelector(".Playlist1");
    const searchbar = document.querySelector(".SearchBar");
    event.target.parentNode.style = "display: none;";
    playlists.style = "display: initial; width: 25%";
    app.style = "padding-left: 30%";
    heading.style = "left: -7%";
    playlist.style = "margin-left: 3%; margin-right: 3%;";
    searchbar.style = "margin-top: 60%;";
  }

  render() {
    return (
      <>
        <div className="SearchResults">
          <button className="disButton" onClick={this.dis}>
            Show Playlists
          </button>
          <h2>Results</h2>
          <TrackList
            //keep passing the searchResults state down through props
            tracks={this.props.searchResults}
            previewUrl={this.props.previewUrl}
            //pass onAdd and preview from SearchResults to Tracklist
            onAdd={this.props.onAdd}
            preview={this.props.preview}
          />
        </div>
      </>
    );
  }
}

export default SearchResults;
