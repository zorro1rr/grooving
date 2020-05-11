import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.preview = this.preview.bind(this);
    }

    addTrack(){
        //use the onAdd method we passed down thats checks and adds song and pass the track into it
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        //use onRemove method passed all the way down from App.js and pass track into it
        this.props.onRemove(this.props.track);
    }

    preview(){
        this.props.preview(this.props.track)
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return (
                <>
                <button className="Track-action" onClick={this.addTrack}>+</button>
                <button className="Track-action" onClick={this.preview}>&#10148;</button>
                </>
            )
        }
    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    {/* use props to render the names, artists and albums 
                    from App->SearchResults->TrackList */}
                    <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;