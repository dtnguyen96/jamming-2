import React from 'react';
import './Track.css'
export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this)
        this.handlingButton = this.handlingButton.bind(this)
    }
    //method to add this.props.track to the playlist
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    //method to decide '+' or '-' button appearance
    handlingButton() {
        if (this.props.isRemoval) {
            return <button className="Track-action"> - </button>
        }
        else {
            return <button className="Track-action" onClick={this.addTrack}> + </button>
        }
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist + ' | ' + this.props.track.album}</p>
                </div>
                {this.handlingButton}
            </div>
        );
    }
}
