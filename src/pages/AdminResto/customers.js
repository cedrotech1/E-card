import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button, Nav } from 'react-bootstrap';
import '../../css/main2.css';

import Menu from "../../components/MenuDeskTop";
import Menu2 from "../../components/MenuMobile";

const Dashboard = () => {
  const [show, setShow] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

                  {/* Button to open the modal */}
                  <div style={{ textAlign: 'right' }}>
                    <Button
                      variant=""
                      onClick={handleToggleModal}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        textDecoration: 'none',
                        padding: '0.2cm',
                        width: '4cm',
                        marginTop: '-2cm',
                        color: 'black',
                        height: 'auto',
                      }}
                    >
                      Add users
                    </Button>
                  </div>

                  {/* Modal component */}
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Employees</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form action="" method="post" role="form" className="myform">
                        {/* <h4 style={{fontFamily:'Abel',backgroundColor:'',border:'0px',height:'auto',borderTopLeftRadius:'0.5cm',borderTopRightRadius:'0.5cm',color:'black',textAlign:'',padding:''}}>register as customer form</h4> */}


                        <div className="row" style={{ paddingTop: '0cm' }}>
                          <div className="col-md-6 form-group">
                            <span>First name</span>
                            <input type="text" name="name" className="form-control" id="name" placeholder="Cedrick" required style={{ marginTop: '0.1cm', backgroundColor: 'whitesmoke', border: '0px', height: '1.2cm' }} />
                          </div>
                          <div className="col-md-6 form-group mt-3 mt-md-0">
                            <span>Last Name</span>
                            <input type="email" className="form-control" name="email" id="email" placeholder="Hakuzimana" required style={{ marginTop: '0.1cm', backgroundColor: 'whitesmoke', border: '0px', height: '1.2cm' }} />
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <span>Email</span>

                          <input style={{ marginTop: '0.3cm', backgroundColor: 'whitesmoke', border: '0px', height: '1.2cm' }} type="text" className="form-control" name="email" id="email" placeholder="cedrick@gmail.com" required />
                        </div>

                        <div className="form-group mt-3">
                          <span>Phone</span>

                          <input style={{ marginTop: '0.3cm', backgroundColor: 'whitesmoke', border: '0px', height: '1.2cm' }} type="text" className="form-control" name="email" id="email" placeholder="0784366616" required />
                        </div>

                        <div className="form-group mt-3">
                          <span>Password</span>

                          <input style={{ marginTop: '0.3cm', backgroundColor: 'whitesmoke', border: '0px', height: '1.2cm' }} type="text" className="form-control" name="email" id="email" placeholder="*************" required />
                        </div>
                        {/* <br/> */}

                        <div className="row" style={{ paddingTop: '0.3cm' }}>
                          <div className="col-md-6 form-group">
                            <span>Gender</span>
                            <input type="text" name="name" className="form-control" id="name" placeholder="male" required style={{ marginTop: '0.3cm', backgroundColor: 'whitesmoke', border: '0px', height: '1.2cm' }} />
                          </div>
                          <div className="col-md-6 form-group mt-3 mt-md-0">
                            <span>Address</span>
                            <input type="email" className="form-control" name="email" id="email" placeholder="huye/ngoma" required style={{ marginTop: '0.3cm', backgroundColor: 'whitesmoke', border: '0px', height: '1.2cm' }} />
                          </div>
                        </div>


                        <div className="text-center"><button type="submit" className="form-control" style={{ marginTop: '1.6cm', backgroundColor: '#4c56ad', color: 'white', borderRadius: ' 10px' }}>create account</button></div>
                      </form>
                    </Modal.Body>

                  </Modal>

                  <section id="team" className="team" style={{ marginTop: '-2cm' }}>
                    <div className="container" data-aos="fade-up">
                      <div className="row">
                        <div className="" data-aos="fade-up" data-aos-delay="100">
                          <div className="row member">

                            <div className=" col-xl-12 col-md-12" style={{ padding: '0.4cm' }}>
                              <h3 style={{ textAlign: 'justify' }}>LISTE OF EMPLOYEES</h3>
                              {/* table-borderless */}



                              <p style={{ textAlign: 'justify', marginTop: '0cm' }}>
                                <table class="table table-hover ">
                                  <thead >
                                    <tr style={{ backgroundColor: 'red', marginTop: '0cm' }}>
                                      <th scope="col">#</th>
                                      <th scope="col">First</th>
                                      <th scope="col">Last</th>
                                      <th scope="col">Handle</th>
                                      <th scope="col">Last</th>
                                      <th scope="col">Handle</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th scope="row">1</th>
                                      <td>Mark</td>
                                      <td>Otto</td>
                                      <td>@mdo</td>
                                      <td>Otto</td>
                                      <td>@mdo</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">2</th>
                                      <td>Jacob</td>
                                      <td>Thornton</td>
                                      <td>@fat</td>
                                      <td>Otto</td>
                                      <td>@mdo</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">3</th>
                                      <td colspan="2">Larry the Bird</td>
                                      <td>@twitter</td>
                                      <td>Otto</td>
                                      <td>@mdo</td>
                                    </tr>

                                    <tr>
                                      <th scope="row">3</th>
                                      <td colspan="2">Larry the Bird</td>
                                      <td>@twitter</td>
                                      <td>Otto</td>
                                      <td>@mdo</td>
                                    </tr>

                                    <tr>
                                      <th scope="row">3</th>
                                      <td colspan="2">Larry the Bird</td>
                                      <td>@twitter</td>
                                      <td>Otto</td>
                                      <td>@mdo</td>
                                    </tr>
                                  </tbody>
                                </table>  </p>



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
