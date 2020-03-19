import React from 'react';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (


  <footer>
    <div >
      <img 
      className="footer-image"
        src="https://freebookbuggie.files.wordpress.com/2018/08/cropped-bookbuggie_main1.jpg"
        alt="the book buggie image"
        width="700px"
        
      />
    </div>
    <div className="footer-copy">
    &copy; The Free Book Buggie
    </div>
  </footer>



);

export default Footer;
