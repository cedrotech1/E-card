import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../components/loading';
import Menu from "../../components/MenuDeskTop";
import Menu2 from "../../components/MenuMobile";

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
  const [loading2, setLoading2] = useState(false);
  const token = localStorage.getItem('token');
  const [EmployeesAdmin, setEmployeesAdmin] = useState([]);

  const { id } = useParams();
  const [resid, setResId] = useState('');
  const [use, setuse] = useState({
    one: 0,
    two: 0,
    three: 0,
  });

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/one/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          // Get all cards
          const allCards = data.data;
          setCards(allCards);
          console.log(allCards)

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
  }, [token]);


  let x;
  if (Cards.duration === "1 month") {
    x = 60 - Cards.times;
  }
  if (Cards.duration === "2 month") {
    x = 120 - Cards.times;
  }
  console.log(Cards.duration)
  console.log(x)

  // console.log(use.one)
  let a = Math.max(use.one, use.two, use.three);

  console.log(a);

  const imageSources = Array.from({ length: Cards.times }, (_, index) => `/assets/img/check.png`);
  const imageSources2 = Array.from({ length: x }, (_, index) => `/assets/img/not1.png`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let x = '0';
    if (use) {
      try {
        setLoading2(true);
        // console.log(use)

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/use/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            use: Number(a)

          }),
        });

        if (response.ok) {
          const res = await response.json();
          toast.success(res.message);
          await new Promise(resolve => setTimeout(resolve, 3000)); // Adjust the delay time as needed
          setLoading2(false);
          window.location.reload();
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
      toast.error('chose duration plz !!');
      console.log("error")
    }
  };


  const handleChange = (e) => {
    setuse(e.target.value);

    console.log(use)
    //   setError(null);
  };
  const [formData, setFormData] = useState({
    userid: 1,
    category: 1,
    use: 0,
    status: 'active',
  });

  // State to manage the checkbox values


  // Event handler to update the checkbox state on checkbox change
  const handleCheckboxChange = (checkboxName) => {
    setuse((prevValues) => ({
      one: checkboxName === '1' ? 1 : 0,
      two: checkboxName === '2' ? 2 : 0,
      three: checkboxName === '3' ? 3 : 0,
    }));
  };
  return (
    <body className='mybody'>
      <div className="dashboardx" style={{ backgroundColor: 'whitesmoke' }}>
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
                      </div>
                    </div>
                  </section>
                  {loading ?<> <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3cm', // Use 100% of the viewport height
      }}>
        <div>
          <LoadingSpinner />
        </div>
      </div></>: <>
                
                  <section id="hero" className="hero" style={{ backgroundColor: 'whitesmoke', padding: '0cm', marginTop: '-0.7cm' }}>
                    <div className="container position-relative">
                      <div className="row gy-5" data-aos="fade-in">
                        <div className="col-lg-5 order-1 order-lg-1 flex-column justify-content-center text-center text-lg-start" style={{ backgroundColor: '', padding: '0.7cm', marginTop: '0.5cm', borderRadius: '4px' }}>
                          <div className="col-xl-12 col-md-12" data-aos="fade-up" data-aos-delay="200" style={{ backgroundColor: 'white', paddingTop: '0.5cm', padding: '0.3cm', borderRadius: '20px' }} >
                            {Cards.cardUser && (<div className="member" style={{ padding: '0.3cm' }}>
                              {Cards.cardUser.image && Cards.cardUser.image !== 'null' ? (
                                <img src={Cards.cardUser.image} className="img-fluid" alt="" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '11cm' }} />

                              ) : (
                                <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '9cm' }} />

                              )}
                              <h4 style={{ textAlign: 'center', fontFamily: 'monospace', textTransform: 'uppercase', marginTop: '0.3cm' }}>
                                {Cards.cardUser.firstname} &nbsp;{Cards.cardUser.lastname}
                              </h4>


                              <p style={{ marginBottom: '0.5cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace', marginTop: '0.3cm', textAlign: 'center' }}>

                                <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: '' }}><BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>
                                &nbsp; <span>  {Cards.cardUser.email}</span><br />
                                {/* <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: '' }}><BiMap className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i> */}
                                <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: '' }}><BiPhone className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                                &nbsp; <span> {Cards.cardUser.phone}</span>




                              </p>

                            </div>)}
                          </div>
                        </div>
                        <div className="col-lg-7 order-1 order-lg-2">
                          <div className="col-xl-12" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0cm', marginTop: '0.5cm' }}>
                            <div className="row member">
                              <div className=" col-xl-12  col-md-12" style={{ margin: '0cm' }}>
                                <div className="">
                                  <section id="team" className="team" style={{ marginTop: '-2cm' }}>
                                    <div className="container" data-aos="fade-up">
                                      <div className="row">

                                        <div className="col-xl-12" data-aos="fade-up" data-aos-delay="100">
                                          <div className="row member">

                                            <div className=" col-xl-6 col-md-6" style={{ backgroundColor: 'white', padding: '0.5cm' }}>

                                              <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center', color: 'green' }}>
                                                <i style={{ color: 'red' }}>{x}</i>
                                                /60 </h1>
                                            </div>
                                            <div className=" col-xl-6  col-md-6" style={{ margin: '0cm', padding: '0.2cm' }}>
                                              <h5 style={{ textAlign: 'center' }}>Card standing</h5>

                                              <p style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
                                                she/he has been used  {Cards.times}/60 means its remains  {Math.floor(Cards.times / 60 * 100)}%,
                                              </p>
                                              <div className="d-flex justify-content-center justify-content-lg-start">


                                              </div>
                                            </div>

                                          </div>

                                        </div>

                                      </div>
                                    </div>
                                  </section>


                                  <form onSubmit={handleSubmit} className="myform">
                                    {/* <h4>Meal card</h4> */}

                                    <div className="checkbox-container">
                                      {/* Checkbox 1 */}

                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={use.one > 0}
                                          onChange={() => handleCheckboxChange('1')}
                                        />
                                        For 1
                                      </label>

                                      {/* Checkbox 2 */}
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={use.two > 0}
                                          onChange={() => handleCheckboxChange('2')}
                                        />
                                        For 2
                                      </label>

                                      {/* Checkbox 3 */}
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={use.three > 0}
                                          onChange={() => handleCheckboxChange('3')}
                                        />
                                        For 3
                                      </label>

                                      {/* Display the checked checkbox value */}
                                      {/* <p>Checked checkbox value: {Object.values(use).reduce((acc, val) => acc + val, 0) || 'None'}</p> */}
                                    </div>

                                    <div className="text-center">
                                      <button type="submit" className={`form-control ${loading ? 'loading' : ''}`} disabled={loading2}>
                                  {loading2 ? <LoadingSpinner /> : 'save'}
                                </button>
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


                  </>}

                  
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
