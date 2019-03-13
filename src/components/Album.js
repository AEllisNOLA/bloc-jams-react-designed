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
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      hover: false
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;

    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  hoverOn(index) {
    this.setState({ hover: index });
    console.log(`Hovering on ${index}`);
  }

  hoverOff() {
    this.setState({ hover: false });
    console.log("Off");
  }

  handleHover(song, index) {
    const isSameSong = this.state.currentSong === song;
    const playButton = <i id="play-button" className="play icon"></i>;
    const pauseButton = <i id="pause-button" className="pause icon"></i>;
    const trackNumber = <span>{index + 1}</span>;

    if (this.state.isPlaying && isSameSong) {
      return pauseButton;
    } else if (!this.state.isPlaying && isSameSong) {
      return playButton;
    } else if (this.state.hover === index) {
      return playButton;
    } else {
      return trackNumber;
    }
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
                <tr
                  className="song"
                  key={index}
                  onMouseEnter={() => this.hoverOn(index)}
                  onMouseLeave={() => this.hoverOff()}
                  onClick={() => this.handleSongClick(song)}
                >
                  <td><span>{this.handleHover(song, index)}</span></td>
                  <td><span>{song.title}</span></td>
                  <td><span>{song.duration}</span></td>
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
