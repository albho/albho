import React from 'react';
import { Link } from 'gatsby';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

import {
  navbar_container,
  navbar,
  navbar_link,
  theme_toggler_button,
} from '../../../styles/layout/navbar.module.scss';

const NavBar = () => {
  return (
    <div className={navbar_container}>
      <nav className={navbar}>
        <Link className={navbar_link} to="/">
          Home
        </Link>
        <Link className={navbar_link} to="/blog">
          Blog
        </Link>
        <Link className={navbar_link} to="/apps">
          Apps
        </Link>
        <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <button
              className={theme_toggler_button}
              onClick={e => {
                toggleTheme(theme === 'dark' ? 'light' : 'dark');
              }}
            >
              {theme === 'dark' ? (
                <i class="fa-solid fa-sun"></i>
              ) : (
                <i class="fa-solid fa-moon"></i>
              )}
            </button>
          )}
        </ThemeToggler>
      </nav>
    </div>
  );
};

export default NavBar;
