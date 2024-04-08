import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button, Nav } from 'react-bootstrap';
import '../../css/main2.css';
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { BarLoader } from 'react-spinners';
import {  BiFile } from 'react-icons/bi';

import Menu from "../../components/MenuDeskTop";
import Menu2 from "../../components/MenuMobile";
const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => { setShowModal(!showModal); };
  const handleCloseModal = () => { setShowModal(false); };

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [report, setreport] = useState(null);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchreport = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/report`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setreport(data.data);
          console.log(data.data);
        } else {
          console.error('Failed to fetch report:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching report:', error);
        setLoading(false);
      }
    };
    fetchreport();
  }, [token]);

  useEffect(() => {
    if (report) {
      const totalPrice = report.reduce((sum, reportItem) => sum + parseInt(reportItem.price), 0);
      setTotal(totalPrice);
    }
  }, [report]);
   useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const [value, setFilterValue] = useState('');
  const handleFilter = (e) => { setFilterValue(e.target.value); };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/report`, {
          headers: {  Authorization: `Bearer ${token}`,  },  });
        const data = await response.json();
        if (data.success) {
          const CardsArray = Array.isArray(data.data) ? data.data : [];
          const filteredCards = CardsArray.filter(Card =>
          (Card.date.toLowerCase().includes(value.toLowerCase()) || Card.status.toLowerCase().includes(value.toLowerCase()))     );
          setreport(filteredCards);
          const totalPrice = report.reduce((sum, report) => sum + parseInt(report.price), 0);
          setTotal(totalPrice)
        } else {
          console.error('Failed to fetch Cards:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Cards:', error);
        setLoading(false);
      }
    };

    fetchCards();
  }, [value]);


  const [start, setStart] = useState('');
  const handleFilter1 = (e) => { setStart(e.target.value); };
  const [end, setEnd] = useState('');
  const handleFilter2 = (e) => { setEnd(e.target.value); };

  if (loading) {
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red; 
    `;

    return (
      <div className="loading-container">
        <BarLoader css={override} size={150} />
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>;
  }

  // console.log(start)
  // console.log(end)

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log(start);
    console.log(end);

    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/card/Mreport/${start}/${end}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          const CardsArray = Array.isArray(data.data) ? data.data : [];
          setreport(CardsArray);
        } else {
          console.error('Failed to fetch Cards:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Cards:', error);
        setLoading(false);
      }
    };
    fetchCards();
  };
  return (
    <body className='mybody'>
      <div className="dashboard" style={{ backgroundColor: 'whitesmoke' }}>
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar (visible on medium devices and larger) */}
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
                        <div className="col-12 d-md-none" style={{ marginBottom: '2cm' }}>
                          <Button variant="" onClick={() => setShow(!show)}>
                            ☰
                          </Button>
                        </div>
                        <section id="team" className="team" style={{ marginTop: '0cm', backgroundColor: 'whitesmoke', padding: '5px',borderRadius:'0.2cm' }}>
                        <div className="row ">
                        <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{backgroundColor:'white'}}>
                                <div className="row">

                                  <div className=" col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke' ,marginLeft:'0'}}>

                                   <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'justfy' }}>
                                    <BiFile />
                                    </h1>
                                  </div>
                                  <div className=" col-xl-6  col-md-6" style={{ margin: '0cm' }}>
                                    <h5 style={{ textAlign: 'justify' }}>day report</h5>

                                    <p style={{ textAlign: 'justify', fontFamily: 'sans-serif' }}>
                                    <input
                                    placeholder='day report'
                                    onChange={handleFilter}
                                    variant=""
                                    type='date'
                                    style={{
                                      backgroundColor: 'white',
                                      borderRadius: '6px',
                                      fontFamily: 'monospace',
                                      textDecoration: 'none',
                                      // padding: '0.2cm',
                                      // width: '3cm',
                                      // // marginTop: '0cm',
                                      marginTop:'0.3cm',
                                      // // marginBottom: '1cm',
                                      // height: 'auto',
                                      // // width: '6cm',
                                      border: '0px',
                                      outline: 'none',
                                    }}
                                  />

                                    </p>
                                    <div className="d-flex justify-content-center justify-content-lg-start">
                                    </div>
                                  </div>

                                </div>

                              </div>
                              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100"  style={{backgroundColor:'white'}} >
                                <div className="row ">

                                  <div className=" col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke' }}>

                                    <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                                    <BiFile />
                                    </h1>
                                  </div>
                                  <div className=" col-xl-7  col-md-6" style={{ margin: '0cm' }}>
                                    <h5 style={{ textAlign: 'justify' }}>month report from</h5>

                                    <p style={{ textAlign: 'justify', fontFamily: 'sans-serif' }}>
                                    <input
                                    placeholder='report start day...'
                                    variant=""
                                    type='date'
                                    onChange={handleFilter1}
                                    style={{
                                      backgroundColor: 'white',
                                      borderRadius: '6px',
                                      fontFamily: 'monospace',
                                      textDecoration: 'none',
                                      // padding: '0.2cm',
                                      //  margin:'2cm',
                                      marginTop: '0.3cm',
                                      // // marginBottom: '1cm',
                                      // height: 'auto',
                                      // // width: '3cm',
                                      border: '0px',
                                      outline: 'none',
                                    }}
                                  />

                                    </p>
                                    <div className="d-flex justify-content-center justify-content-lg-start">
                                    </div>
                                  </div>

                                </div>

                              </div>

                              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100"  style={{backgroundColor:'white'}}>
                                <div className="row ">

                                  <div className=" col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke' }}>

                                    <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                                    <BiFile />
                                    </h1>
                                  </div>
                                  <div className=" col-xl-7  col-md-6" style={{ margin: '0cm' }}>
                                  <h5 style={{ textAlign: 'justify' }}>month report to</h5>

                                    <p style={{ textAlign: 'justify', fontFamily: 'sans-serif' }}>
                                   
                                    <input
                                          placeholder='report end day...'
                                          variant=""
                                          type='date'
                                          onChange={handleFilter2}
                                          style={{
                                            backgroundColor: 'white',
                                            borderRadius: '6px',
                                            fontFamily: 'monospace',
                                            textDecoration: 'none',
                                            // padding: '0.2cm',
                                            // // width: '3cm',
                                            marginTop: '-0.5cm',
                                            // // marginBottom: '1cm',
                                            // margin:'2cm',

                                            // height: 'auto',
                                            // width: '3cm',
                                            border: '0px',
                                            outline: 'none',
                                          }}
                                        />
                                         <form onSubmit={handleSubmit} className="" style={{marginTop:'0cm'}}>
                                            <button type="submit" className="form-control">
                                          get report
                                        </button>
                                        </form>

                                    </p>
                                    <div className="d-flex justify-content-center justify-content-lg-start">
                                    </div>
                                  </div>

                                </div>

                                </div> </div>
                              </section>
                        {report && (

                          <section id="team" className="team" style={{ marginTop: '0cm', backgroundColor: 'white', padding: '5px',borderRadius:'0.2cm' }}>


                            <div className="row" style={{padding:'0.3cm',borderRadius:'0.8cm'}}>


                         


                              {/* <div className=" col-xl-4 col-md-4" style={{ padding: '0cm' }}>
                                  day report <br />
                                  <input
                                    placeholder='day report'
                                    onChange={handleFilter}
                                    variant=""
                                    type='date'
                                    style={{
                                      backgroundColor: 'white',
                                      borderRadius: '6px',
                                      fontFamily: 'monospace',
                                      textDecoration: 'none',
                                      // padding: '0.2cm',
                                      // width: '3cm',
                                      // // marginTop: '0cm',
                                      // margin:'2cm',
                                      // // marginBottom: '1cm',
                                      // height: 'auto',
                                      // // width: '6cm',
                                      border: '0px',
                                      outline: 'none',
                                    }}
                                  />
                                </div>




                                <div className=" col-xl-4 col-md-4" style={{ padding: '0cm' }}>
                                  from date <br />
                                  <input
                                    placeholder='report start day...'
                                    variant=""
                                    type='date'
                                    onChange={handleFilter1}
                                    style={{
                                      backgroundColor: 'white',
                                      borderRadius: '6px',
                                      fontFamily: 'monospace',
                                      textDecoration: 'none',
                                      // padding: '0.2cm',
                                      //  margin:'2cm',
                                      // // marginTop: '0cm',
                                      // // marginBottom: '1cm',
                                      // height: 'auto',
                                      // // width: '3cm',
                                      border: '0px',
                                      outline: 'none',
                                    }}
                                  />
                                </div>

                                <div className=" col-xl-4 col-md-4 col-sx-4" style={{ padding: '0cm' }}>
                                  <form onSubmit={handleSubmit} className="myform">
                                    <div className="row" style={{ padding: '0cm' }}>
                                      <div className=" col-xl-8 col-md-8">
                                        up to date <br />
                                        <input
                                          placeholder='report end day...'
                                          variant=""
                                          type='date'
                                          onChange={handleFilter2}
                                          style={{
                                            backgroundColor: 'white',
                                            borderRadius: '6px',
                                            fontFamily: 'monospace',
                                            textDecoration: 'none',
                                            // padding: '0.2cm',
                                            // // width: '3cm',
                                            // // marginTop: '0cm',
                                            // // marginBottom: '1cm',
                                            // margin:'2cm',

                                            // height: 'auto',
                                            // width: '3cm',
                                            border: '0px',
                                            outline: 'none',
                                          }}
                                        />

                                      </div>
                                      <div className=" col-xl-4 col-md-4">

                                        <button type="submit" className="form-control">
                                          get report
                                        </button>

                                      </div>
                                    </div>
                                  </form>
                                </div> */}


                              <div style={{ textAlign: 'justify', marginTop: '0.3cm' }}>
                                {report && report.length > 0 ? (<>
                                  <table className="table table-sm table-hover table-borderless">
                                    <thead>
                                      <tr>
                                        <th style={{ backgroundColor: 'whitesmoke' }} scope="col">#</th>
                                        <th style={{ backgroundColor: 'whitesmoke' }} scope="col">names</th>
                                        <th style={{ backgroundColor: 'whitesmoke' }} scope="col">category</th>
                                        <th style={{ backgroundColor: 'whitesmoke' }} scope="col">price</th>
                                        <th style={{ backgroundColor: 'whitesmoke',textAlign:'center' }} scope="col">plates</th>
                                        <th style={{ backgroundColor: 'whitesmoke' }} scope="col">date</th>
                                        <th style={{ backgroundColor: 'whitesmoke' }} scope="col">time</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {report.map((report, index) => (
                                        <tr key={report.id}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{report.customernames}</td>
                                          <td>{report.categoryname}</td>
                                          <td>{report.price}&nbsp;Rwf</td>
                                          <td style={{textAlign:'center'}}>{report.plates}</td>
                                          <td>{report.date}</td>
                                          <td>{report.time}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                  <div className="cardx" style={{ width: '18rem', marginTop: '2rem' }}>
                                    <div className="card-body">
                                      <h5 className="card-title">Total Amount</h5>
                                      <p className="card-text">{total} Rwf</p>
                                    </div>
                                  </div>
                                </>
                                ) : (
                                  <>No report fount at {value}</>
                                )}
                              </div>

                            </div>




                          </section>

                        )}
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
