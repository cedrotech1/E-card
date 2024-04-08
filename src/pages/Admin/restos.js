
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button, Nav } from 'react-bootstrap';
import '../../css/main2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from "../../components/MenuDeskTop";
import Statistics from "../../components/statistics-component";
import Menu2 from "../../components/MenuMobile";
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; 
import LoadingSpinner from '../../components/loading'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => { setShowModal(!showModal);  };
  const handleCloseModal = () => {setShowModal(false);  };
  const [Cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/restaurent/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setCards(data.data);
          console.log(data.data)
        } else {
          console.error('Failed to fetch restaurants:', data.message);
        }

        // Set loading to false after fetching data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  console.log(Cards)
  const handleView = (CardId) => {
    navigate(`../resto_cate_view/${CardId}`);
     };





  const [value, setFilterValue] = useState('');
  const handleFilter = (e) => {
    setFilterValue(e.target.value);
    // setError(null);
  };
  
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/restaurent/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (data.success) {
          // Ensure that 'Cards' is an array before filtering
          const CardsArray = Array.isArray(data.data) ? data.data : [];
  
          const filteredCards = CardsArray.filter(Card =>
            (Card.address.toLowerCase().includes(value.toLowerCase()) ||
            Card.name.toLowerCase().includes(value.toLowerCase()) ||
            Card.description.toLowerCase().includes(value.toLowerCase()) ||
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




  return (
    <body className='mybody' >
      <div className="dashboard" style={{backgroundColor:'whitesmoke'}}>
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
                {!show && (
                  <div className="col-md-2 d-none d-md-block d-md-blockx">
                    <Menu />
                  </div>
                )}
                <div className={`col-md-10 ${show ? 'content-shift' : ''}`}>

                <section id="team" className="team">
                    <div className="container" data-aos="fade-up" style={{marginLeft:'-0.2cm'}}>
                      <div className="row">

                        {/* menu bars */}
                        <div className="col-12 d-md-none">
                          <Button variant="" onClick={() => setShow(!show)}>
                            ☰
                          </Button>
                        </div>


             <Statistics/>


                      </div>
                    </div>
                  </section>
                  {loading ? (<> <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0cm', // Use 100% of the viewport height
    }}>
      <div>
        <LoadingSpinner />
      </div>
    </div></>):(<>
                  <div className="row" style={{backgroundColor:'whitesmoke'}}>
                    <div className="col-xl-3 col-md-3" style={{ padding: '0.4cm' }}>

                      <input
                        placeholder='Filter here...'
                        variant=""
                        onChange={handleFilter}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          fontFamily: 'monospace',
                          textDecoration: 'none',
                          padding: '0.2cm',
                          width: '4cm',
                          marginTop: '0cm',
                          marginBottom: '1cm',
                          // color: 'black',
                          height: 'auto',
                          width: '6cm',
                          border: '0px',
                          outline: 'none',

                        }}
                      />



                    </div>
                    <div className="col-xl-5 col-md-5" style={{ padding: '0.4cm' }}>
                    <h4 style={{ textAlign: 'center', paddingBottom: '0.5cm', color: 'gray' }}>LIST OF CARD RESTAURENTS </h4>

                    </div>
                 
                  </div>

             


                  <section id="team" className="team" style={{ backgroundColor: 'whitesmoke',marginTop:'-2cm' }}>
  <div className="container" data-aos="fade-up">
    <div className="row gy-4">
      {Cards.length > 0 ? (
            Cards.map((restaurant) => (
              <div onClick={() => handleView(restaurant.id)} key={restaurant.id} className="col-xl-4 col-md-6 " data-aos="fade-up" data-aos-delay={100 * restaurant.id} style={{ padding: '' }}>
                <div className="member col-xl-12" style={{padding:'0.3cm' }}>
                {restaurant.image!==null ? (
                  <img src={restaurant.image} className="img-fluid" alt="" style={{ borderRadius: '10px', marginBottom: '0.5cm',width:'9CM' }} />
                ) : (
                  <img src='/assets/img/rest.jpg' className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '100%' }}/>
                )}
                  <h4 style={{ textAlign: 'justify' }}>{restaurant.name}</h4>
    
                  <p style={{ textAlign: 'justify' }}>
                    {restaurant.description}
                    <p style={{ textAlign: 'center', fontStyle: 'italic', fontPalette: '13px', backgroundColor: 'whitesmoke',border:'1px solid lightgray', padding: '0.4cm', marginTop: '20px', borderRadius: '6px' }}>
                      <BiMap className="" style={{ color: 'black' }} />&nbsp;&nbsp;{restaurant.address} <br />
                      <BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} />&nbsp;&nbsp;{restaurant.email} <br />
                      <BiPhone />&nbsp;&nbsp;{restaurant.phone}
                    </p>
                  </p>
                </div>
              </div>
            ))
      ) : (
        <div className="col-12 text-center">
          <h4 style={{ textAlign: 'center', paddingBottom: '0.5cm', color: 'gray',border:'4PX SOLID lightgray',padding:'1cm' }}>{value ? 'NO MATCHING DATA FOUND' : 'NO DATA AVAILABLE'}</h4>
        </div>
      )}
    </div>
  </div>
</section>
</>)}



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
