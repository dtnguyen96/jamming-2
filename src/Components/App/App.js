import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist.js'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{ name: 'name1', artist: 'artist1', album: 'album1', id: 'id1' }],
      playlistName: 'My playlist',
      playlistTracks: [{ name: 'name2', artist: 'artist2', album: 'album2', id: 'id2' }]

    }
    this.addTrack=this.addTrack.bind(this);
  }
  //function add individuals song to the playlist
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack=>savedTrack.id===track.id)) {
      return;
    }
    else {
      this.playlistTracks.push(track)
    }

  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
