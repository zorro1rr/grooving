import React from 'react';
import './Tracks2.css';


class Tracks2 extends React.Component {


    render() {
        return (
            <div>
                <ul>
                <li>{this.props.track.track}</li>
                </ul>
            </div>
        )
    }
    
}

export default Tracks2;