import React from 'react';
import './Playlists2.css';


class Playlists2 extends React.Component {


    render() {
        return (
            <div>
                <h2>
                    {this.props.playlists}
                </h2>
            </div>
        )
    }
    
}

export default Playlists2;