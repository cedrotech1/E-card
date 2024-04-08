

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { BiUser, BiCog, BiFile } from 'react-icons/bi';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import { GiHotMeal } from 'react-icons/gi';

const LandingPage = () => {
  // ... (your existing code)
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

  const restaurentadmin = [
    { name: 'Dashboard', icon: <BsHouseDoor />, to: '/resto_statistics' },
    { name: 'Our card', icon: <GiHotMeal />, to: '/resto_card' },
    { name: 'Employee', icon: <BiUser />, to: '/resto_dash' },
    { name: 'Our Info', icon: <BiFile />, to: '/resto_AddResto' },
    { name: 'Settings', icon: <BiCog />, to: '/settings' },
    { name: 'report', icon: <BiFile />, to: '/resto_report_view' },
  ];

  const employee = [
    { name: 'Dashboard', icon: <BsHouseDoor />, to: '/emplyoyee_customers' },
    { name: 'clients', icon: <BiUser />, to: '/emplyoyee_customers' },
    { name: 'Settings', icon: <BiCog />, to: '/settings' },
  ];

  const superadmin = [
    { name: 'Dashboard', icon: <BsHouseDoor />, to: '/admin_statistics' },
    { name: ' Restaurent', icon: <BsHouseDoor />, to: '/admin_restourent' },
    { name: ' Admins', icon: <BiUser />, to: '/admin_dash' },
    { name: 'Settings', icon: <BiCog />, to: '/settings' },
  ];

  const restaurent = [
    { name: 'add restaurent', icon: <BsHouseDoor />, to: '/resto_AddResto' },
    { name: 'Settings', icon: <BiCog />, to: '/settings' },
  ];

  // Choose the appropriate menu based on the user's status
  const getMenu = () => {
    switch (obj.role) {
      case 'restaurentadmin':
        return rest ? restaurentadmin : restaurent;
      case 'employee':
        return employee;
      case 'superadmin':
        return superadmin;
      default:
        return [];
    }
  };
  // console.log(status)

  return (
    <>
     <div className="col-md-2 d-none d-md-block d-md-blockx" 
      style={{
          marginBottom:'0cm',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}>
      <div className="membery">
      <div className="membery">
        <center>
        <Link to="/settings">
            {obj.image && obj.image!=='null'? (
              <img src={obj.image} className="img-fluid" alt="" style={{ borderRadius: '100%', marginBottom: '0.5cm', height: '3cm', width: '3cm' }} />
            ) : (
              <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '100%', marginBottom: '0.5cm', height: '3cm', width: '3cm' }} />
            )}
          </Link>
          <h5>{obj.firstname} {obj.lastname}</h5>
          <p className='titlex'>
          <p style={{fontStyle:'italic',fontSize:'14px'}}>{obj.role}</p>
          </p>
        </center>
      </div>
        <>
          <center>
            <Nav className="flex-row">
              {getMenu().map((menuItem, index) => (
                <Link key={index} to={menuItem.to} className="nav-link" style={{textTransform:'Capitalize',fontFamily:'monospace',fontStyle:'italic',textAlign:''}}>
                  {menuItem.icon} {menuItem.name}
                </Link>
              ))}
            </Nav>
            <div className="d-flex justify-content-center">
              <Link to="/logout" className="btn-get-started1">
                Logout
              </Link>
            </div>
          </center>
        </>
      </div>
      </div>
    </>
  );
};

export default LandingPage;
