import React, { Component } from "react";
import "../styles/PlayerBar.css";

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <div className="ui container">
          <section id="buttons">
            <button id="previous" onClick={this.props.handlePrevClick}>
              <i className="backward icon" />
            </button>

            <button id="play-pause" onClick={this.props.handleSongClick}>
              <span>
                <i
                  className={this.props.isPlaying ? "pause icon" : "play icon"}
                />
              </span>
            </button>

            <button id="next" onClick={this.props.handleNextClick}>
              <i className="forward icon" />
            </button>
          </section>

          <section id="time-control">
            <div className="current-time">
              {this.props.formatTime(this.props.currentTime)} /{" "}
              {this.props.formatTime(this.props.duration)}
            </div>
            <div className="ui slider range" id="time-slider">
              <input
                type="range"
                className="seek-bar"
                value={
                  this.props.formatTime(this.props.currentTime) /
                    this.props.formatTime(this.props.duration) || 0
                }
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleTimeChange}
              />
            </div>
          </section>

          <section id="volume-control">
            <div className="current-volume">
              {Math.floor(this.props.volume * 100)}%
            </div>
            <div className="ui slider range" id="volume-slider">
              <i id="volume-down" className="volume down icon large" />
              <input
                type="range"
                className="seek-bar"
                value={this.props.volume}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleVolumeChange}
              />
              <i id="volume-up" className="volume up icon large" />
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default PlayerBar;
