import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./styles/App.css";
import Album from "./components/Album";
import Landing from "./components/Landing";
import Library from "./components/Library";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ui large top fixed hidden borderless inverted menu">
          <nav className="ui container">
            <Link className="item" to="/">
              <img
                id="logo"
                className="logo"
                src={require("./assets/img/bloc_jams_logo.png")}
                alt="Bloc Jams logo"
              />
            </Link>
            <div className="menu right">
              <Link className="item" to="/library">
              <p className="nav-item">Library</p>
              </Link>
              <Link className="item" to="/album">
                <p className="nav-item">Album</p>
              </Link>
            </div>
          </nav>
        </div>

       
        <header>
          <nav>
            <Link to="/">Landing</Link>
            <Link to="/library">Library</Link>
            <Link to="/album">Album</Link>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
    
      </div>
    );
  }
}

export default App;
