// import './App.css';
import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../../components/loading'; 

import 'react-toastify/dist/ReactToastify.css'
function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
   
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise((resolve) => setTimeout(resolve, 2000));


        await navigate(`../code/${formData.email}`);

      
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error creating account', error);
      toast.error('Failed to create account. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>

<section id="herofm" className="herofm" style={{ marginTop: '3cm' }}>
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-1 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
            </div>
            <div className="col-lg-5 order-2 order-lg-1  flex-column justify-content-center  text-lg-start loginForm">

              <form onSubmit={handleSubmit} className="myform">
                <h4 ></h4>
               
                <br/>
                <div className="form-group mt-3">
                  <span>Email</span>

                  <input type="text" className="form-control" name="email" id="email" placeholder="cedrick@gmail.com" onChange={handleChange} style={{outline: 'none'}} />
                </div>
                <br/>

             
                

                <div className="text-center">
                <button type="submit" style={{color:'black'}} className={`form-control ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? 'loading...' : 'get code'}
            </button>
                  </div>
              </form>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 d-flex align-items-center justify-content-center loginImg">
              <img src="assets/img/Secure login-bro.svg" className="img-fluid loginImg" alt="" data-aos="zoom-out" data-aos-delay="100" />
            </div>

          </div>
        </div>
      </section>
      <ToastContainer />




    </>
  );
}

export default App;
