import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button } from 'react-bootstrap';
import '../../css/main2.css';
import Menu from "../../components/employeeeMenu";
import Menu2 from "../../components/employeeMenu2";
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; // Importing icons from the 'react-icons' library

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    For1: false,
    For2: false,
    For3: false,
  });

  // Function to handle checkbox changes
  const handleCheckboxChange = (task) => {
    setCheckboxes((prevCheckboxes) => ({
      For1: task === 'For1' ? !prevCheckboxes.For1 : false,
      For2: task === 'For2' ? !prevCheckboxes.For2 : false,
      For3: task === 'For3' ? !prevCheckboxes.For3 : false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', checkboxes);
  };

  const imageSources = Array.from({ length: 15 }, (_, index) => `assets/img/check.png`);


  const imageSources2 = Array.from({ length: 15 }, (_, index) => `assets/img/not1.png`);


  return (
    <body className='mybody'>
      <div className="dashboardx">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar (visible on medium devices and larger) */}
            <div className={`col-md-3 d-none d-md-block ${show ? 'sidebar-shift' : ''}`}>
              <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className="membery">
                    <center> <img src="assets/img/profile.png" className="img-fluid imagex" alt="" style={{ height: '3cm' }} /></center>
                    <h5 style={{ textAlign: 'center', fontFamily: 'monospace', textTransform: '', fontWeight: 'bold' }}>H.Cedrick</h5>

                    <p style={{ textAlign: 'center', fontFamily: 'monospace', marginBottom: '1cm' }}>
                      Sed autem laudantium dolores.
                    </p>


                  </div>
                  <center>
                    <Menu2 />
                    <center>
                      <div className="d-flex justify-content-center ">
                        <a href="register" className="btn-get-started" style={{ backgroundColor: '#b6b5b5', borderRadius: '6px', fontFamily: 'monospace', textDecoration: 'none', padding: '0.2cm', width: '4cm', marginTop: '3cm', color: 'black' }}>
                          logout
                        </a>
                      </div>
                    </center>
                  </center>
                </Offcanvas.Body>
              </Offcanvas>
            </div>

            {/* Main Content */}
            <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 allcontent">
              <div className="row">
                {/* Sidebar Trigger Button (visible on small devices) */}


                {/* Sidebar (visible on medium devices and larger when Offcanvas is closed) */}
                {!show && (
                  <div className="col-md-2 d-none d-md-block d-md-blockx">
                    {/* Your menu items go here */}
                    <Menu />
                  </div>
                )}

                {/* Your dashboard content goes here */}

                <div className={`col-md-10 ${show ? 'content-shift' : ''}`}>

                  <section id="team" className="team">
                    <div className="container" data-aos="fade-up">
                      <div className="row">

                        {/* menu bars */}
                        <div className="col-12 d-md-none">
                          <Button variant="" onClick={() => setShow(!show)}>
                            ☰
                          </Button>
                        </div>


                        <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                          <div className="row member">

                            <div className=" col-xl-4 col-md-6 d-flex" style={{ backgroundColor: 'whitesmoke' }}>

                              <h1 style={{ fontSize: '40px' }}>23</h1>
                            </div>
                            <div className=" col-xl-7  col-md-6" style={{ margin: '0.1cm' }}>
                              <h5 style={{ textAlign: 'justify' }}>Employees</h5>

                              <p style={{ textAlign: 'justify', fontFamily: 'sans-serif' }}>
                                Sed autem laudantium dolores.

                              </p>
                              <div className="d-flex justify-content-center justify-content-lg-start">


                              </div>
                            </div>

                          </div>

                        </div>


                        <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                          <div className="row member">

                            <div className=" col-xl-4 col-md-6 d-flex" style={{ backgroundColor: 'whitesmoke' }}>


                            </div>
                            <div className=" col-xl-7  col-md-6" style={{ margin: '0.1cm' }}>
                              <h5 style={{ textAlign: 'justify' }}>Employees</h5>

                              <p style={{ textAlign: 'justify', fontFamily: 'sans-serif' }}>
                                Sed autem laudantium dolores.

                              </p>
                              <div className="d-flex justify-content-center justify-content-lg-start">


                              </div>
                            </div>

                          </div>

                        </div>








                        <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                          <div className="row member">

                            <div className=" col-xl-4 col-md-6 d-flex" style={{ backgroundColor: 'whitesmoke' }}>


                            </div>
                            <div className=" col-xl-7  col-md-6" style={{ margin: '0cm' }}>
                              <h5 style={{ textAlign: 'justify' }}>Employees</h5>

                              <p style={{ textAlign: 'justify', fontFamily: 'sans-serif' }}>
                                Sed autem laudantium dolores.

                              </p>
                              <div className="d-flex justify-content-center justify-content-lg-start">
                              </div>
                            </div>
                          </div>
                        </div>





                      </div>
                    </div>
                  </section>


                  <section id="hero" className="hero">
                    <div className="container position-relative">
                      <div className="row gy-5" data-aos="fade-in">
                        <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{ backgroundColor: '', padding: '0.7cm', marginTop: '-0.5cm' }}>

                        <div className="col-xl-11 col-md-12 d-flex" data-aos="fade-up" data-aos-delay="200" style={{ backgroundColor: 'whitesmoke', padding: '0.5cm', borderRadius: '10px' }} >
                            <div className="member">
                              <img src="assets/img/pic.png" className="img-fluid" alt="" style={{ borderRadius: '10px' }} />
                              <h4 style={{ textAlign: 'center', fontFamily: 'monospace', textTransform: 'uppercase', marginTop: '0.3cm' }}>CEDRICK Hakuzimana</h4>

                              <p style={{ marginBottom: '0.5cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace', marginTop: '0.3cm', textAlign: 'center' }}>

                                <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: '' }}><BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>
                                &nbsp; <span>  cedrickhakuzimana@gmail.com</span><br />
                                <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: '' }}><BiMap className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                            
                                &nbsp; <span>huye innovation hub !
                                </span><br />
                                <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: '' }}><BiPhone className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                                &nbsp; <span> 07853435654</span>




                              </p>

                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7 order-1 order-lg-2">
                          <div className="col-xl-12" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                            <div className="row member">
                              <div className=" col-xl-12  col-md-12" style={{ margin: '0cm' }}>
                                <div className="">
                                  {imageSources.map((src, index) => (
                                    <img key={index} src={src} className="img-fluid" alt="" style={{ height: '1.5cm', marginRight: '5px', marginBottom: '5px' }} />
                                  ))}

                                  {imageSources2.map((src, index) => (
                                    <img key={index} src={src} className="img-fluid" alt="" style={{ height: '1.2cm', marginRight: '5px', marginBottom: '5px' }} />
                                  ))}
                                     
                                      
                                  <form onSubmit={handleSubmit} >
                                    <div className="d-flex justify-content-start" style={{ marginTop: '1cm', backgroundColor: '' }}>
                                      <div className="form-check form-check-inline">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="For1"
                                          checked={checkboxes.For1}
                                          onChange={() => handleCheckboxChange('For1')}
                                        />
                                        <label className="form-check-label" htmlFor="For1">For 1</label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="For2"
                                          checked={checkboxes.For2}
                                          onChange={() => handleCheckboxChange('For2')}
                                        />
                                        <label className="form-check-label" htmlFor="For2">For 2</label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="For3"
                                          checked={checkboxes.For3}
                                          onChange={() => handleCheckboxChange('For3')}
                                        />
                                        <label className="form-check-label" htmlFor="For3">For 3</label>
                                      </div> <br/>
                                    
                                    </div>

                                    
                                    <div className="mt-3">
                                      
                                    <div className="">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder='PIN'
                                          style={{border:'0px',backgroundColor:'whitesmoke',width:'6cm'}}
                                          
                                          
                                        
                                        />
                                       
                                      </div>
                                      <button type="submit" className="btn" style={{ backgroundColor: 'whitesmoke', borderRadius: '6px', width: '6cm', textAlign: 'center', padding: '', marginTop: '0.5cm', textDecoration: 'none' }}>Submit</button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '3cm', backgroundColor: '' }}>
                            <div className="row member">
                              <div className=" col-xl-12  col-md-6" style={{ margin: '0cm' }}>
                                <div className="col-xl-12" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                                  <div className="row member">
                                    <div className=" col-xl-12  col-md-12" style={{ margin: '0cm' }}>
                                      <div className="d-flex justify-content-center justify-content-lg-start">

                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-center justify-content-lg-start">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

    </body>
  );
};

export default Dashboard;
