// src/pages/AboutPage.js

import React from 'react';
import './StaticPage.css'; // Use the shared CSS for static pages

function AboutPage() {
  const imageUrl = "https://imgs.search.brave.com/i0RpCNmxBHILSlNROkB2_Hn2IHAaSDQasDs-mv_3nI0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA0/MzE5NTIzL3ZlY3Rv/ci90cmVlLWFuZC1w/aG90by5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9QW1xU2R6/aDN3LTVtbl92Rk1z/Qm5UUmU0dkFVR0pv/eEFDN1ZKZ1c4dlFk/VT0";

  return (
    <div className="static-page main-content">
      <div className="static-card card">
        <h1>About LearnHub</h1>

        <img src={imageUrl} alt="A tree representing growth and learning" className="about-image" />

        <p>Welcome to LearnHub, your go-to platform for interactive and engaging online learning!</p>
        <p>Our mission is to provide high-quality educational content in a soothing and distraction-free environment. We believe that learning should be an enjoyable and accessible experience for everyone.</p>
        <p>Whether you're looking to master a new programming language, understand complex concepts, or simply boost your productivity with our study tools, LearnHub is designed to support your journey.</p>
        <p>We are constantly expanding our course catalog and refining our features to ensure you have the best possible learning experience. Happy learning!</p>
      </div>
    </div>
  );
}

export default AboutPage;