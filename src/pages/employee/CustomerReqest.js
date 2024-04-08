import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button, Nav } from 'react-bootstrap';
import '../../css/main2.css';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; // Importing icons from the 'react-icons' library
import Menu from "../../components/MenuDeskTop";
import Menu2 from "../../components/MenuMobile";
const Dashboard = () => {
  const [show, setShow] = useState(false);




  return (
    <body className='mybody'>
      <div className="dashboard">
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
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                          <h5 style={{ fontSize: '35px', marginBottom: '0.5cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace' }}>
                            <b>Kiza restaurent</b>
                          </h5>
                          <p style={{ marginBottom: '0.5cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace' }}>
                            Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                          </p>

                          <p style={{ marginBottom: '0.5cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace', marginTop: '1cm' }}>

                            <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>
                            &nbsp; <span>  cedrickhakuzimana@gmail.com</span><br />
                            <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiPhone className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                            &nbsp; <span> 07853435654</span><br />

                            <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiMap className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                            &nbsp; <span>huye innovation hub ! training center!
                            </span>


                          </p>
                          <div className="d-flex justify-content-center justify-content-lg-start">
                            <a
                              href="register"
                              className="btn-get-startedx"
                              style={{
                                backgroundColor: '#b1c8dd',
                                borderRadius: '6px',
                                width: '4.5cm',
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                color: 'black',
                                fontSize: '20px', height: '1cm'
                              }}
                            >
                              approve
                            </a>
                            <a
                              href="restoAdmin"
                              className="glightbox btn-watch-video d-flex align-items-center"
                              style={{
                                backgroundColor: '#da8a7e',
                                borderRadius: '6px',
                                width: '4.5cm',
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                color: 'white',
                                fontSize: '20px', height: '1cm'
                              }}
                            >
                              &nbsp; &nbsp; rejecting
                            </a>
                          </div>


                        </div>
                        <div className="col-lg-6 order-1 order-lg-2">
                          <img src="assets/img/features-2.png" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" />

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
