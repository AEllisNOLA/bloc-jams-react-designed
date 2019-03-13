import React, { Component } from "react";

class Album extends Component {
  render() {
    return (
      <div className="ui container">
        <section className="album">{this.props.match.params.slug} Album page will go here.</section>
      </div>
    );
  }
}

export default Album;
