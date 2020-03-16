import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <h2>
        Welcome to the Free Book Buggie Administration Application
      </h2>
      <p>if you're looking for the free book buggie website 
        you can find it here: https://thefreebookbuggie.org/</p>
      <p>If you are an admin you can access your admin tools and 
        register a new volunteer by logging in.</p>
    </div>
  </div>
);

export default AboutPage;
