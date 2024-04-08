import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/main2.css';
import LoadingSpinner from '../../components/loading'; // Import the LoadingSpinner component


const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); 
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, {
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

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        const role = res.user.role;
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (role === 'customer') {
          await navigate('../list');
        } else if (role === 'superadmin') {
          await navigate('../admin_dash');
        } else if (role === 'restaurentadmin') {
          await navigate('../resto_dash');
        } else if (role === 'employee') {
          await navigate('../emplyoyee_customers');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error creating account', error);
      setError('Failed to create an account. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
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
                <h4 >Login form</h4>
               
                <br/>
                <div className="form-group mt-3">
                  <span>Email</span>

                  <input type="text" className="form-control" name="email" id="email" placeholder="cedrick@gmail.com" onChange={handleChange} style={{outline: 'none'}} />
                </div>
                <br/>

                <div className="form-group mt-3">
                  <span>password</span>
                  <input type="password" oninput="maskPassword()" className="form-control" name="password" id="subject" placeholder="************" onChange={handleChange} />
                </div>
                <div className="form-group mt-3">
                <Link to='login'> <b style={{textAlign:'center',color:'red'}}>forgot password</b></Link> 
                  {/* <input type="password" oninput="maskPassword()" className="form-control" name="password" id="subject" placeholder="************" onChange={handleChange} /> */}
                </div>

                <div className="text-center">
                <button type="submit" style={{color:'black'}} className={`form-control ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Login'}
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

      <br />





      <a href="#" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <script src="assets/js/main.js"></script>
      <ToastContainer />

    </>
  );
};

export default LandingPage;
