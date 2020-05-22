import React from 'react';
import './Tracks2.css';


class Tracks2 extends React.Component {


    render() {
        return (
            <div>
                <p className="track" id={this.props.id}>
                {this.props.track.track}
                </p>
            </div>
        )
    }
    
}

export default Tracks2;