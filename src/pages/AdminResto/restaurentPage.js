import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button, Nav } from 'react-bootstrap';
import '../../css/main2.css';
import Resto from "./viewResto";
import Statistics from "../../components/statistics-component";

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
      <div className="dashboard" style={{backgroundColor:'whitesmoke'}}>
        <div className="container-fluid">
          <div className="row">
            <div className={`col-md-3 d-none d-md-block ${show ? 'sidebar-shift' : ''}`}>
              <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  
                    <Menu2 />
                
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 allcontent">
              <div className="row">
                {!show && (
                  <div className="col-md-2 d-none d-md-block d-md-blockx">
                    <Menu />
                  </div>
                )}
                <div className={`col-md-10 ${show ? 'content-shift' : ''}`}>
                  <section id="team" className="team">
                    <div className="container" data-aos="fade-up">
                      <div className="row">
                        <div className="col-12 d-md-none">
                          <Button variant="" onClick={() => setShow(!show)}>
                            ☰
                          </Button>
                        </div>
                        <Statistics />
                        <Resto />
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
