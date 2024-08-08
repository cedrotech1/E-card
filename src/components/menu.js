import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button, Nav } from 'react-bootstrap';
import '../css/main2.css';
import { Link, useNavigate } from 'react-router-dom'; 
const LandingPage = () => {
  const [show, setShow] = useState(false);

  const sidebarStyles = {
    // backgroundColor: '#b6b5b5',
    borderRadius: '6px',
    fontFamily:'cursive',
    fontSize:'20px',
    textDecoration: 'none',
    color: 'black',
  };

  return (
    <>
      <div className={`col-md-3 d-none d-md-block ${show ? 'sidebar-shift' : ''}`}>
        <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="membery">
              <center>
                <img src="/assets/img/images (3).png" className="img-fluid imagex" alt="" style={{ height: '3cm' }} />
              </center>
              <h5 style={{ textAlign: 'center', fontFamily: 'monospace', textTransform: '', fontWeight: 'bold' }}>Visitor</h5>
              <p style={{ textAlign: 'center', fontFamily: 'monospace',padding:'0.2cm' }}>
               create account to became ! our customer and access all features of this system !!
              </p>
            </div>
            <center>
            <Nav className="flex-column">
          <Link to="/" style={sidebarStyles}>
            Home
          </Link>
          <Link to="/contact" style={sidebarStyles}>
            Contact
          </Link>
          <Link to="/about" style={sidebarStyles}>
            About
          </Link>
        </Nav>
              <div className="d-flex justify-content-center">
                <a href="./login" className="btn-get-started" style={sidebarStyles}>
                  Login
                </a>
              </div>
            </center>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <header
        id="header"
        className="header d-flex align-items-center"
        style={{
          marginBottom:'0cm',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: '#ffffff', // Set the desired background color
          // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
        }}
      >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <img src="assets/img/LOGO.png" className="img-fluid mylogo" alt="" data-aos="zoom-out" data-aos-delay="100" style={{height:'3cm'}}/>
          </a>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a href="/" style={sidebarStyles}>Home</a>
              </li>
              <li>
                <a href="contact" style={sidebarStyles}>Contact</a>
              </li>
              <li>
                <a href="about" style={sidebarStyles}>About</a>
              </li>
              <li>
                <a href="login" style={sidebarStyles}>Login</a>
              </li>
              
            </ul>
          </nav>

          <Button className='bx' variant="" onClick={() => setShow(!show)} style={{ backgroundColor: 'whitesmoke', borderRadius: '6px', fontFamily: 'monospace', color: 'black' }}>
            ☰
          </Button>
        </div>
      </header>
    </>
  );
};

export default LandingPage;
