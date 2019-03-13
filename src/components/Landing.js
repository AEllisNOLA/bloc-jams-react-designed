import React from "react";
import "../styles/Landing.css";

const Landing = () => (
    <div id="landing-image">
      <div id="landing-overlay">
        <section className="landing ui container">
          <h1 className="hero-title">Turn the music up!</h1>
          <section className="ui stackable three column grid">
            <div className="column point">
              <h2 className="point-title">Choose your music</h2>
              <h3 className="point-description">
                The world is full of music; why should you have to listen to
                music that someone else chose?
              </h3>
            </div>

            <div className="column point">
              <h2 className="point-title">Unlimited, streaming, ad-free</h2>
              <h3 className="point-description">
                No arbitrary limits. No distractions.
              </h3>
            </div>

            <div className="column point">
              <h2 className="point-title">Mobile-enabled</h2>
              <h3 className="point-description">
                Listen to your music on-the-go. This streaming service is
                available on all mobile platforms.
              </h3>
            </div>
          </section>
        </section>
      </div>
    </div>
    
);

export default Landing;
