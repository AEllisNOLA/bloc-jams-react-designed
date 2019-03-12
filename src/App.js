import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Album from "./components/Album";
import Landing from "./components/Landing";
import Library from "./components/Library";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ui container">
          <header>
            <nav>
              <Link to="/">Landing</Link>
              <Link to="/library">Library</Link>
              <Link to="/album">Album</Link>
            </nav>
            <h1>Bloc Jams</h1>
          </header>
          <main>
            <Route exact path="/" component={Landing} />
            <Route path="/library" component={Library} />
            <Route path="/album" component={Album} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;