import React from 'react';
import "./SearchBar.css"
export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            term: ''
        }
        this.search=this.search.bind(this)
        this.handleTermChange=this.handleTermChange.bind(this)
    }
    //medthod to trigger App.js search method with searchBar state (user input) passed in 
    search() {
        this.props.onSearch(this.state.term);
    }
    //method to set searchBar state with user inpput
    handleTermChange(event){
        this.setState({term: event.target.value});
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"  onChange={this.handleTermChange}/>
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}
export default SearchBar