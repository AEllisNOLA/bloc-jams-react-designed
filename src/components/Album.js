import React, { Component } from "react";
import albumData from "../data/albums";
import "../styles/Album.css";
import PlayerBar from "./PlayerBar";

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
      hover: false,
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.8
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = this.state.volume;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };

    this.audioElement.addEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.addEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
    this.audioElement.addEventListener(
      "volumechange",
      this.eventListeners.volumechange
    );
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.removeEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );

    // ADD EVENT LISTENER???
    this.audioElement.removeEventListener(
      "volumechange",
      this.eventListeners.volumechange
    );
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

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    const lastIndex = Math.max(0, currentIndex);
    const lastSong = this.state.album.songs[lastIndex];

    if (newIndex > this.state.album.songs.length - 1) {
      this.setSong(lastSong);
      this.play();
    } else {
      this.setSong(newSong);
      this.play();
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatTime(time) {
    if (isNaN(time) === true || time === undefined) {
      return "-:--";
    }
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    minutes = minutes.toString();
    if (seconds < 10) {
      seconds = Math.floor(seconds.toString());
      return minutes + ":0" + seconds;
    } else {
      seconds = Math.floor(seconds.toString());
      return minutes + ":" + seconds;
    }
  }


  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  hoverOn(index) {
    this.setState({ hover: index });
  }

  hoverOff() {
    this.setState({ hover: false });
  }

  handleHover(song, index) {
    const isSameSong = this.state.currentSong === song;
    const playButton = <i className="play icon" />;
    const pauseButton = <i className="pause icon" />;
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
              <th>Track</th>
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
                  <td className="metadata">
                    <span>{this.handleHover(song, index)}</span>
                  </td>
                  <td className="metadata">
                    <span>{song.title}</span>
                  </td>
                  <td className="metadata">
                    <span>{this.formatTime(song.duration)}</span>

                    
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.state.volume}
          handleVolumeChange={e => {
            this.handleVolumeChange(e);
          }}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={e => this.handleTimeChange(e)}
          formatTime={(e) => this.formatTime(e)}
        />
      </div>
    );
  }
}

export default Album;
