import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist.js'
import spotify  from '../../util/Spotify'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //hard code data 
      searchResults: [],
      playlistName: 'My playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }
  //method to add individuals track to the playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }
  //method to remove individual track from the playlist
  removeTrack(trackPassin) {
    let tracks = this.state.playlistTracks
    //keep the tracks that have different id than track passed in
    tracks = tracks.filter(track => track.id !== trackPassin.id)
    this.setState({ playlistTracks: tracks });
  }
  //method to update Playlist name
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  //method that saves a playlist to the user's Spotify account
  savePlaylist(){
    //generate an array of Spotify uri values from playlistTracks property
    const trackUris=this.state.playlistTracks.map(track=>track.uri);
    //save playlist to user account and then reset playlistName and playlistTracks
    spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>{
      this.setState({
      playlistName:'New Playlist',
      playlistTracks: []
      })
    })
  }
  //method to retrieve data and search through Spotify API
  search(searchTerm){
    //Update state of searchResult with the resolved value of Spotify.search()'s promise
    spotify.search(searchTerm).then(searchResult=>{
      this.setState({searchResults: searchResult })
    });

  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
