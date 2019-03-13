import React, { Component } from "react";
import albumData from "../data/albums";
import "../styles/Album.css";

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug;
    });

    this.state = {
      album: album
    };
  }
  render() {
    return (
      <div className="ui container" id="album-container">
        <section className="album">
          <section id="album-info">
            <img
              id="album-cover-art"
              src={this.state.album.albumCover}
              alt={this.state.album.title}
            />
            <div className="album-details">
              <h1 id="album-title">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          </section>
        </section>

        <table id="song-list" className="ui striped table">
          <thead>
            <tr>
              <th>Track #</th>
              <th>Title</th>
              <th>Length</th>
            </tr>
          </thead>
         
          
          <tbody>
            {this.state.album.songs.map((song, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{song.title}</td>
                  <td>{song.duration}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Album;
