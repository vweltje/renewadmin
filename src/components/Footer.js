import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import FooterForm from './FooterForm'

import './Footer.css'

export default ({ globalSettings, socialSettings, navLinks }) => (
  <footer className="Footer">
    <Image
      background
      src="/images/footerBackground.png"
      alt="footer background"
      className="BackgroundOverlay"
    />
    <div className="container taCenter">
      <div className="FooterBox">
        <div className="FooterNav">
          <div className="FooterNavItems">
            <ul>
              <li className="ListHeading">Info</li>
              <li>
                <Link to="/">Privacy</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
            </ul>
            <ul>
              <li className="ListHeading">Services</li>
              <li>
                <Link to="/">Account payable</Link>
              </li>
              <li>
                <Link to="/about-us">account receivable</Link>
              </li>
              <li>
                <Link to="/">Payrol</Link>
              </li>
              <li>
                <Link to="/about-us">Reconciliations</Link>
              </li>
            </ul>
            <ul>
              <li className="ListHeading" />
              <li>
                <Link to="/">BAS</Link>
              </li>
              <li>
                <Link to="/about-us">PAYG</Link>
              </li>
              <li>
                <Link to="/">Superannuation</Link>
              </li>
              <li>
                <Link to="/about-us">month end</Link>
              </li>
            </ul>
            <ul>
              <li className="ListHeading">Contact</li>
              <li>
                <Link to="/">0467392135</Link>
              </li>
              <li>
                <Link to="/about-us">demo@email.com</Link>
              </li>
            </ul>
          </div>
          <p>© Copyright {new Date().getFullYear()} renew admin</p>
        </div>
        <div className="FooterFormBox">
          <FooterForm name="Quick Contact" />
          <ul>
            <li className="ListHeading">Follow us</li>
            <li>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
              >
                <svg width="16" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.555.246a6.46 6.46 0 0 1-2.085.816A3.237 3.237 0 0 0 11.075 0C9.263 0 7.794 1.507 7.794 3.365c0 .264.028.52.084.766-2.727-.14-5.145-1.479-6.764-3.517A3.426 3.426 0 0 0 .67 2.308c0 1.167.579 2.197 1.46 2.8a3.23 3.23 0 0 1-1.488-.42v.042c0 1.631 1.132 2.992 2.634 3.3a3.203 3.203 0 0 1-1.482.059c.417 1.336 1.628 2.31 3.065 2.335A6.481 6.481 0 0 1 0 11.82a9.137 9.137 0 0 0 5.03 1.511c6.038 0 9.338-5.127 9.338-9.574 0-.146-.003-.293-.008-.436a6.727 6.727 0 0 0 1.636-1.742 6.399 6.399 0 0 1-1.884.53A3.357 3.357 0 0 0 15.555.246"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <svg width="9" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.946 5.333v-2.11C1.946 2.803 1.846 0 6.04 0H9v3.2H6.43c-.402 0-.643.183-.643.534v1.6H9l-.643 3.2H5.786V16h-3.84V8.533H0v-3.2h1.946z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://plus.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Google Plug"
              >
                <svg width="25" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.359 4.444h1.778v2.668h2.667v1.776h-2.667v2.668h-1.778V8.888h-2.666V7.112h2.666V4.444zM7.913 9.778V6.222h8.001V8a8 8 0 0 1-8 8C3.494 16 0 12.419 0 8c0-4.419 3.495-8 7.913-8a7.96 7.96 0 0 1 5.191 1.92L10.57 4.444a4.4 4.4 0 0 0-2.657-.888 4.444 4.444 0 1 0 4.073 6.222H7.913z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </li>
          </ul>
          <p>
            Digitally Crafted by{' '}
            <a
              href="https://thriveweb.com.au/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Thrive
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
)
