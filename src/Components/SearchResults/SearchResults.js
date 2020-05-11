import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    
    render() {
        return (
            <>
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList 
                //keep passing the searchResults state down through props
                tracks={this.props.searchResults}
                previewUrl={this.props.previewUrl}
                //pass onAdd and preview from SearchResults to Tracklist
                 onAdd={this.props.onAdd} preview={this.props.preview} />
            </div>
             </>
        );
    }
}

export default SearchResults