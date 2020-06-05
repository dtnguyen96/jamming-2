import React from './node_modules/react';
import "./TrackList.css"
export class Tracklist extends React.Component {
    render() {
        return (
            <div className="TrackList">
            {this.props.tracks.map((track)=>{
                return <Track track={track} key={track.id} />
            })
            </div>
        )
    }
}
