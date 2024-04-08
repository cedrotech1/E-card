import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from "../../components/MenuDeskTop";
import Menu2 from "../../components/MenuMobile";
import '../../css/main2.css';
import LoadingSpinner from '../../components/loading';



const Dashboard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [Cards, setCards] = useState([]);
  const [Error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [CustomersAdmin, setCustomersAdmin] = useState([]);

  const [formData, setFormData] = useState({
    userid: 1,
    category: 1,
    times: 60,
    status: 'active',
    duration: '1 month'
  });
  const [value, setFilterValue] = useState('');
  const [times, setTimes] = useState(60);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (times != 0) {
      if (CustomersAdmin.length == 1) {
        if (Cards.length == 1) {
          setFormData({
            userid: CustomersAdmin[0].id,
            category: Cards[0].id,
            times: times,
            status: 'active',
            duration: '1 month'
          });

          if (formData.userid !== 1) {
            // console.log(times)
            // console.log(formData)

            try {
              const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/add`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  ...formData,
                  // duration: x

                }),
              });

              if (response.ok) {
                const res = await response.json();
                toast.success(res.message);
              } else {
                const errorData = await response.json();
                setError(errorData.message);
                toast.error(errorData.message);
              }
            } catch (error) {
              console.error('Error creating card', error);
              setError('Failed to create card. Please try again later.');
            }

          } else {
            toast.error("no !!");
          }




        } else {
          toast.error("choose one category");
        }

      } else {
        toast.error("choose one customer");
      }
    } else {
      toast.error('chose duration plz !!');
      console.log("error")
    }
  };
  const handleChange = (e) => { setTimes(e.target.value); };



  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/categories/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {

          setCards(data.data);
          console.log(data);


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
  }, []);


  const handleFilter = (e) => {
    setFilterValue(e.target.value);
    setError(null);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/categories/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          const CardsArray = Array.isArray(data.data) ? data.data : [];
          const filteredCards = CardsArray.filter(Card =>
          (Card.price.toLowerCase().includes(value.toLowerCase()) ||
            Card.name.toLowerCase().includes(value.toLowerCase()) ||
            Card.status.toLowerCase().includes(value.toLowerCase()))
          );
          setCards(filteredCards);
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

  useEffect(() => {
    const fetchCustomersAdmin = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setCustomersAdmin(data.users);
          // console.log(data.users);
        } else {
          console.error('Failed to fetch CustomersAdmin:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CustomersAdmin:', error);
        setLoading(false);
      }
    };
    fetchCustomersAdmin();
  }, []);
  const [value1, setFilterValue1] = useState('');
  const handleFilter1 = (e) => {
    setFilterValue1(e.target.value);
    setError(null);
  };
  useEffect(() => {
    const fetchCustomersAdmin = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          const usersArray = Array.isArray(data.users) ? data.users : [];
          const filteredUsers = usersArray.filter(user =>
            (user.firstname.toLowerCase().includes(value1.toLowerCase()) ||
              user.lastname.toLowerCase().includes(value1.toLowerCase()) ||
              user.email.toLowerCase().includes(value1.toLowerCase()) ||
              user.phone.toLowerCase().includes(value1.toLowerCase())) &&
            user.role !== 'CustomerAdmin'
          );
          setCustomersAdmin(filteredUsers);
        } else {
          console.error('Failed to fetch CustomersAdmin:', data.message);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching CustomersAdmin:', error);
        setLoading(false);
      }
    };
    fetchCustomersAdmin();
  }, [value1]);
  const handleView = (id) => {

    navigate(`../emplyoyee_meal_card/${id}`);
    // console.log(id)
  };

  return (
    <body className='mybody' >
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
                    <div className="container" data-aos="fade-up" style={{ marginLeft: '-0.2cm' }}>
                      <div className="row">

                        {/* menu bars */}
                        <div className="col-12 d-md-none">
                          <Button variant="" onClick={() => setShow(!show)}>
                            ☰
                          </Button>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section id="team" className="team" style={{ backgroundColor: 'whitesmoke', marginTop: '-4.5cm' }}>
                    <div className="container position-relative">
                      <div className="row gy-5" data-aos="fade-in">

                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{ marginTop: '0cm', fontFamily: 'monospace' }}>
                          <div className="row" style={{ marginBottom: '0.5cm' }}>


                            <div className="col-xl-6 col-md-6" style={{ padding: '0.4cm' }}>

                              <input
                                placeholder='Filter customers...'
                                variant=""
                                onChange={handleFilter1}

                                style={{
                                  backgroundColor: 'white',
                                  borderRadius: '6px',
                                  fontFamily: 'monospace',
                                  textDecoration: 'none',
                                  padding: '0.2cm',
                                  // width: '4cm',
                                  marginTop: '1.4cm',
                                  marginBottom: '0.5cm',
                                  // color: 'black',
                                  outline: 'none',
                                  height: 'auto',
                                  width: '13.5cm',
                                  border: '0px',
                                }}
                              />



                            </div>
                            <div className="col-xl-6 col-md-6" >
                              {/* <h6 style={{ textAlign: 'center', paddingBottom: '0.5cm', color: 'gray' }}>LIST OF CARD CUSTOMERS </h6> */}

                            </div>

                          </div>
                          <div className="row gy-4">
                             {loading ?  <div style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '1cm', // Use 100% of the viewport height
                            }}>
                              <div>
                                <LoadingSpinner />
                              </div>
                            </div>: <>


                              {
                                CustomersAdmin.length > 0 ? (
                                  CustomersAdmin.map((Customer) => (
                                    <div onClick={() => handleView(Customer.id)} key={Customer.id} className="col-xl-6 col-md-6 " data-aos="fade-up" data-aos-delay={100 * Customer.id} style={{ marginTop: '-0.1cm', marginBottom: '0.5cm' }}>
                                      <div className="member col-xl-12" style={{ padding: '0.3cm' }}>
                                        {Customer.image && Customer.image !== 'null' ? (
                                          <img src={Customer.image} className="img-fluid" alt="" style={{ borderRadius: '', marginBottom: '0.5cm', width: '11cm' }} />

                                        ) : (
                                          <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '9cm' }} />

                                        )}
                                        <h4 style={{ textAlign: 'center' }}>{Customer.firstname} &nbsp;{Customer.lastname}</h4>
                                        <p style={{ textAlign: 'center', fontStyle: 'italic', fontPalette: '13px', backgroundColor: 'whitesmoke', padding: '0.4cm', marginTop: '20px', borderRadius: '6px' }}>
                                          <BiMap className="" style={{ color: 'black' }} />&nbsp;&nbsp;{Customer.address} <br />
                                          <BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} />&nbsp;&nbsp;{Customer.email} <br />
                                          <BiPhone />&nbsp;&nbsp;{Customer.phone}
                                        </p>



                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-12 text-center">
                                    <h4 style={{ textAlign: 'center', paddingBottom: '0.5cm', color: 'gray', border: '4PX SOLID lightgray', padding: '1cm' }}>{value ? 'NO MATCHING DATA FOUND' : 'NO DATA AVAILABLE'}</h4>
                                  </div>
                                )}

                            </>}

                          </div>

                        </div>
                        <div className="col-lg-6 order-1 order-lg-2" style={{ marginTop: '1.6cm', fontFamily: 'monospace', color: 'white' }}>
                          {/* <img src="assets/img/breakfast from bed-pana.svg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" /> */}
                          <div className="row member" style={{ marginTop: '2cm' }}>
                            <div className="col-xl-6 col-md-6 d-flex">
                              <img src='/assets/img/card.png' className="img-fluid" alt="" />
                            </div>
                            <div className="col-xl-6 col-md-6" style={{}}>
                              <form onSubmit={handleSubmit} className="myform">
                                <h4>Meal card</h4>

                                <div className="form-group mt-3">
                                  <label htmlFor="duration">Duration</label>
                                  <select
                                    className="form-control"
                                    name="times"
                                    id="duration"
                                    onChange={handleChange}
                                  >
                                    <option value="0">......CHOSE</option>
                                    <option value="60">One month</option>

                                    {/* Add more options as needed */}
                                  </select>
                                </div>

                                <div className="text-center">
                                  <button type="submit" className="form-control" style={{ marginTop: '0.5cm' }}>
                                    save
                                  </button>
                                </div>
                              </form>

                            </div>
                          </div>


                        </div>
                      </div>
                    </div>
                  </section>


                  <section id="team" className="team" style={{ backgroundColor: 'whitesmoke', marginTop: '-1cm' }}>
                    <div className="container position-relative">
                      <div className="row gy-5" data-aos="fade-in">

                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{ marginTop: '0cm', fontFamily: 'monospace' }}>
                          <div className="row" style={{ marginBottom: '0.5cm' }}>


                            <div className="col-xl-6 col-md-6" style={{ padding: '0cm' }}>

                              <input
                                placeholder='Filter category...'
                                variant=""

                                onChange={handleFilter}
                                // value={value1}
                                style={{
                                  backgroundColor: 'white',
                                  borderRadius: '6px',
                                  fontFamily: 'monospace',
                                  textDecoration: 'none',
                                  padding: '0.2cm',
                                  marginTop: '-0.5cm',
                                  // marginBottom: '1cm',
                                  // color: 'black',
                                  height: 'auto',
                                  width: '13.5cm',
                                  border: '0px',
                                  outline: 'none',

                                }}
                              />



                            </div>
                            <div className="col-xl-6 col-md-6" style={{ padding: '0cm' }}>
                            </div>

                          </div>
                          <div className="row gy-4">

                            {loading ? <> <div style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '1cm', // Use 100% of the viewport height
                            }}>
                              <div>
                                <LoadingSpinner />
                              </div>
                            </div></> : <>

                              {Cards.length > 0 ? (
                                Cards.map((category, index) => (
                                  <div key={index} className="col-xl-6 col-md-6" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                                    <div className="member" style={{ padding: '0.3cm' }}>
                                      <img src='/assets/img/images (4).jpeg' className="img-fluid" alt="" style={{ height: 'auto', width: '100%', borderRadius: '7px' }} />
                                      <h4 style={{ textAlign: 'center', fontFamily: 'monospace', textTransform: 'uppercase' }}>{category.name}</h4>
                                      {/* <p style={{ textAlign: 'center', fontFamily: 'cursive', marginLeft: '0cm' }}>{category.description}</p> */}
                                      <p style={{ fontFamily: 'monospace', marginTop: '-0.5cm', textAlign: 'center', fontSize: '20px' }}>
                                        Price: {category.price}
                                      </p>
                                      <p style={{ fontFamily: 'monospace', marginTop: '-0.6cm', textAlign: 'center', fontSize: '16px' }}>
                                        <i> status: {category.status}</i>
                                      </p>

                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="col-12 text-center">
                                  <h4 style={{ textAlign: 'center', paddingBottom: '0.5cm', color: 'gray', border: '4PX SOLID lightgray', padding: '1cm' }}>{value ? 'NO MATCHING DATA FOUND' : 'NO DATA AVAILABLE'}</h4>
                                </div>
                              )}
                            </>}
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
      <ToastContainer />
    </body>
  );
};

export default Dashboard;


