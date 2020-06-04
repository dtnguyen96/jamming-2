import React from 'react';
import './Track.css'
class Track extends React.Component {
    render() {
        const isRemoval= this.state.isRemoval
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{/*track name will go here  */}</h3>
                    <p>{/*track artist will go here | track album will go here */}</p>
                </div>
                <button className="Track-action">{isRemoval? '-' : '+' }</button>
            </div>
        )
    }
}
export default Track