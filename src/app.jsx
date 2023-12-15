import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Explore } from './explore/explore';
import { About } from './about/about';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className='body bg-dark text-light'>sub components here</div>
  </BrowserRouter>
);

export default function App() {
    return (
      <div className='body bg-dark text-light'>
        <header>
			<div className="logo">
				<a href="index.html"><img src="images/moms-kitchen_logo.svg" alt="logo" /></a>
			</div>

			<nav className='navbar fixed-top navbar-dark'>
                <div className='navbar-brand'>
                    Mom's Kitchen<sup>&reg;</sup>
                </div>
                <menu className='navbar-nav'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to=''>
                            Login
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='profile'>
                            Profile
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='explore'>
                            Explore
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='about'>
                            About
                        </NavLink>
                    </li>
                </menu>
            </nav>
		</header>
  
        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/profile' element={<Profile />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
  
        <footer>
			<a href="https://simon.benjaminpeek.com" target="_blank">Simon</a>
			<a href="https://github.com/benjaminpeek/startup" target="_blank">Author's GitHub</a>
		</footer>
      </div>
    );
  }

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }