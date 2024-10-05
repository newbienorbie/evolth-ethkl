import React, { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import "./Header.styles.css";

export default function Header() {
  // hamburger
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className='navbar'>
        <div className='logo'>
          <a href='/'>
            <img
              src='/logo.png'
              alt='Logo'
            />
          </a>
        </div>

        <nav className={isOpen ? "nav-links open" : "nav-links"}>
          <ul>
            <li>
              <a href='#about'>About Us</a>
            </li>
            <li>
              <a href='#contact'>Contact Us</a>
            </li>
            <li>
              <a href='#faq'>FAQ</a>
            </li>
          </ul>
        </nav>

        <div className='right-menu'>
          <div
            className='hamburger'
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
    </>
  );
}
