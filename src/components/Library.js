import React, { Component } from "react";
import { Link } from "react-router-dom";
import albumData from "../data/albums";
import "../styles/Library.css";

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = { albums: albumData };
  }

  render() {
    return (
      <div className="ui container">
        <section className="library ui stackable two column grid centered">
          {this.state.albums.map((album, index) => (
            <Link to={`/album/${album.slug}`} className="album" key={index}>
              <img
                className="album-cover"
                src={album.albumCover}
                alt={album.title}
              />
              <h1 className="album-title">{album.title}</h1>
              <h2 className="album-artist">{album.artist}</h2>
              <div className="album-songs-number">
                {album.songs.length} songs
              </div>
            </Link>
          ))}
        </section>
      </div>
    );
  }
}

export default Library;
