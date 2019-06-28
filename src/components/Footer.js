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
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/how-it-works/">How It Works</Link>
              </li>
              <li>
                <Link to="/contact/">Contact Us</Link>
              </li>
            </ul>
            <ul>
              <li className="ListHeading">Services</li>
              <li>
                <Link to="/services/account-payable/">Account Payable</Link>
              </li>
              <li>
                <Link to="/services/sales-invoicing/">Sales Invoicing</Link>
              </li>
              <li>
                <Link to="/services/compliance-bas/">Compliance - BAS</Link>
              </li>
              <li>
                <Link to="/services/payroll-solutions/">Payroll Solutions</Link>
              </li>
              <li>
                <Link to="/services/superannuation/">Superannuation</Link>
              </li>
              <li>
                <Link to="/services/work-flow-efficiency/">
                  Work Flow Efficiency
                </Link>
              </li>
            </ul>
            <ul>
              <li className="ListHeading">Contact</li>
              <li>
                <a href="tel:0499074555">0499074555</a>
              </li>
              <li>
                <a href="mailto:info@renewadmin.com">info@renewadmin.com</a>
              </li>
            </ul>
          </div>
          <p>© Copyright {new Date().getFullYear()} renew admin</p>
        </div>
        <div className="FooterFormBox">
          <ul>
            <li className="ListHeading">Quick Contact</li>
          </ul>
          <FooterForm name="Quick Contact" />

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
