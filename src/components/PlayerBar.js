import React, { Component } from "react";
import "../styles/PlayerBar.css";


class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <div className="ui container">
          <section id="buttons">
            <button id="previous">
              <i className="backward icon" />
            </button>
            <button id="play-pause">
              <span>
                <i className={this.props.isPlaying ? "pause icon" : "play icon" }/>
              </span>

            </button>

            <button id="next">
              <i className="forward icon" />
            </button>
          </section>

          <section id="time-control">
            <div className="current-time">-:--</div>
            <div className="ui slider range">
              <input type="range" className="seek-bar" value="0" />
            </div>
            <div className="total-time">-:--</div>
          </section>

          <section id="volume-control">
            <i className="volume down icon large" />
            <input type="range" className="seek-bar" value="0" />
            <i className="volume up icon large" />
          </section>
        </div>
      </section>
    );
  }
}

export default PlayerBar;