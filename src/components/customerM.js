import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import '../css/main2.css';

const LandingPage = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [rest,SetResto]=useState('');
  const [obj,setObj]=useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const userStatus = parsedUser.status;
      const userimage = parsedUser.image;
      const resto = parsedUser.restaurents;
      setObj(parsedUser)
      setStatus(userStatus);
      setImage(userimage)
      SetResto(resto)
    } else {
      console.error('User information not found in local storage');
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [navigate]);


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
              <Link to="/profile">
            {obj.image && obj.image!=='null'? (
              <img src={obj.image} className="img-fluid" alt="" style={{ borderRadius: '100%', marginBottom: '0.5cm', height: '3cm', width: '3cm' }} />
            ) : (
              <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '100%', marginBottom: '0.5cm', height: '3cm', width: '3cm' }} />
            )}
          </Link>
              </center>
              <h5>{obj.firstname} {obj.lastname}</h5>
          <p className='titlex'>
          <p style={{fontStyle:'italic',fontSize:'14px'}}>{obj.role}</p>
          </p>
            </div>
            <center>
              <Nav className="flex-column">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/list" className="nav-link">Restaurent</Link>
                <Link to="/mycards" className="nav-link">My Cards</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
              
              </Nav>
              <div className="d-flex justify-content-center">
                <Button  className="btn-get-started" style={{ backgroundColor: '#b6b5b5', borderRadius: '6px', fontFamily: 'monospace', textDecoration: 'none', padding: '0.2cm', width: '4cm', marginTop: '3cm', color: 'black' }}>
                <Link to="/logout" style={{ color: 'black', fontFamily: 'monospace', fontSize: '20px' }}>logout</Link>
                </Button>
              </div>
            </center>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <header
        id="header"
        className="header d-flex align-items-center"
        style={{
          marginBottom:'3cm',
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
          <Link to="/" className="logo d-flex align-items-center">
            <img src="/assets/img/LOGO.png" className="img-fluid mylogo" alt="" data-aos="zoom-out" data-aos-delay="100" />
          </Link>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link to="/" style={{ color: 'black', fontFamily: 'monospace', fontSize: '20px' }}>Home</Link>
              </li>
              <li>
                <Link to="/list" style={{ color: 'black', fontFamily: 'monospace', fontSize: '20px' }}>Restaurent</Link>
              </li>
              <li>
                <Link to="/mycards" style={{ color: 'black', fontFamily: 'monospace', fontSize: '20px' }}>MyCards</Link>
              </li>
              <li>
                <Link to="/profile" style={{ color: 'black', fontFamily: 'monospace', fontSize: '20px' }}>Profile</Link>
              </li>
              <li>
                <span  style={{ color: 'black', fontFamily: 'monospace', fontSize: '20px', cursor: 'pointer' }}>
                <Link to="/logout" style={{ color: 'black', fontFamily: 'monospace', fontSize: '20px' }}>logout</Link>
                </span>
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
