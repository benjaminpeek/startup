import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
      <div className='body bg-dark text-light'>
        <header>
			<div class="logo">
				<a href="index.html"><img src="images/moms-kitchen_logo.svg" alt="logo" /></a>
			</div>

			<nav>
				<a href="index.html">Home</a>
				<a href="profile.html">Profile</a>
				<a href="explore.html">Explore</a>
				<a href="about.html">About</a>
			</nav>
		</header>
  
        <main>App components go here</main>
  
        <footer>
			<a href="https://simon.benjaminpeek.com" target="_blank">Simon</a>
			<a href="https://github.com/benjaminpeek/startup" target="_blank">Author's GitHub</a>
		</footer>
      </div>
    );
  }