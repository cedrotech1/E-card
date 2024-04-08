
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button, Nav } from 'react-bootstrap';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; // Importing icons from the 'react-icons' library
import '../../css/main2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faCheck, faTimes,faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../../components/loading'; // Import the LoadingSpinner component



import Menu from "../../components/MenuDeskTop";

import Statistics from "../../components/statistics-component";
import Menu2 from "../../components/MenuMobile";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showModal1, setShowModal1] = useState(false);

  const handleToggleModal1 = () => {
    setShowModal1(!showModal1);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };



  const [Restaurent, setRestaurent] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [selectedUser, setSelectedUser] = useState([]);
  const [ID, setID] = useState();
  const [rest,SetResto]=useState('');
  const [obj,SetObj]=useState('');



  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const resto = parsedUser.restaurents;
      SetResto(resto)
      SetObj(parsedUser)
    } else {
      console.error('User information not found in local storage');
    }
  }, []);
  useEffect(() => {
    const fetchRestaurent = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/restaurent/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          const datarray = Array.isArray(data.data) ? data.data : [];
        
          setRestaurent(datarray);
          console.log(datarray);
        } else {
          console.error('Failed to fetch Restaurent:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Restaurent:', error);
        setLoading(false);
      }
    };

    fetchRestaurent();
  }, []);


  const handleView = (userId) => {
    setID(userId)
    console.log(`View user with ID: ${userId}`);
  };
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    phone: '',
    email: '',
 
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/restaurent/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        console.log(formData)

        // console.log(res.restaurant.id)
        const updatedUser = { ...obj, restaurents:res.restaurant.id };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // window.location.reload();
        navigate(`/resto_dash`);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error creating account', error);
      setError('Failed to create account. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    setError(null);
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
                
                  {/* <center> */}
                    <Menu2 />
                  
                  {/* </center> */}
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
                )}       <div className="col-12 d-md-none" style={{marginTop:'1cm'}}>
                          <Button variant="" onClick={() => setShow(!show)}>
                            ☰
                          </Button>
                        </div> 


                     
                         { !rest ? (
                <div className={`col-md-10 ${show ? 'content-shift' : ''}`}>

                  <section id="team" className="team teamb" >
                    <div className="container" data-aos="fade-up" style={{marginLeft:'-0.2cm'}}>
                  
                         <div className="row">

                        {/* menu bars */}
                   
                        <Statistics />
                      </div>
                    </div>
                  </section>

                  <div className="row" style={{ backgroundColor: 'whitesmoke',marginTop:'-3cm' }}>
                    <div className="col-xl-4 col-md-4" style={{ padding: '0.4cm' }}>
                    </div>
                    <div className="col-xl-4 col-md-4" style={{ padding: '0.4cm' }}>
                      {/* <h4 style={{ textAlign: 'justify', paddingBottom: '0.5cm', color: 'gray', padding: '0.3cm' }}>OUR RESTAURENT </h4> */}

                    </div>
                    <div className="col-xl-4 col-md-4" style={{ padding: '0.4cm' }}>
                      <div style={{ textAlign: 'right', marginBottom: '0.4cm' }}>
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
                            // marginTop: '-2cm',
                            color: 'black',
                            height: 'auto',
                          }}
                        >
                          Add Restaurent
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Restaurent</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleSubmit} className="myform">
                        <div className="row" style={{ paddingTop: '0cm' }}>
                        
                        </div>
                       


                        <div className="row" style={{ paddingTop: '0.3cm' }}>
                          <div className="col-md-6 form-group">
                            <span>name</span>
                            <input type="text" name="name" className="form-control" id="name" placeholder="restaurent name" onChange={handleChange} />
                          </div>
                          <div className="col-md-6 form-group mt-3 mt-md-0">
                            <span>Address</span>
                            <input type="text" className="form-control" name="address" id="address" placeholder="huye/ngoma" onChange={handleChange} />
                          </div>
                        </div>

                        <div className="row" style={{ paddingTop: '0.3cm' }}>
                          <div className="col-md-6 form-group">
                            <span>phone</span>
                            <input type="text" name="phone" className="form-control" id="name" placeholder="phone" onChange={handleChange} />
                          </div>
                          <div className="col-md-6 form-group mt-3 mt-md-0">
                            <span>email</span>
                            <input type="text" className="form-control" name="email" id="address" placeholder="ouremail@gmail.com" onChange={handleChange} />
                          </div>
                        </div>

                        <div className="form-group mt-3" style={{ paddingTop: '1cm' }}>
                            <textarea className="form-control" name="description" rows="7" placeholder="description"  style={{backgroundColor:'whitesmoke'}}></textarea>
                          </div>
                        <div className="text-center">
                          <button type="submit" className="form-control">
                            Save
                          </button>
                        </div>
                        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                      </form>
                    </Modal.Body>

                  </Modal>

              
              
                </div>
):(
  <>
   <div className={`col-md-10 ${show ? 'content-shift' : ''}`}>
   <section id="team" className="team teamb" >
                    <div className="container" data-aos="fade-up" style={{marginLeft:'-0.2cm'}}>
                  
                         <div className="row">

                        {/* menu bars */}
                   
                        <Statistics />
                      </div>
                    </div>
                  </section>
                  <section id="team" className="team">
  <div className="container" data-aos="fade-up">
    <div className="row gy-4">
      {loading ? (<> <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0cm', // Use 100% of the viewport height
    }}>
      <div>
        <LoadingSpinner />
      </div>
    </div></> ) : (
        Restaurent.map((restaurant) => (
          <div onClick={() => handleView(restaurant.id)} key={restaurant.id} className="col-xl-4 col-md-6 " data-aos="fade-up" data-aos-delay={100 * restaurant.id} style={{padding:"0.2cm",marginTop:"-3cm"}}>
          <Link to="/resto_view">
            <div className="memberx col-xl-12" style={{backgroundColor:'white',padding:'0.5cm'}}>
             
            {restaurant.image!==null ? (
                                        <img src={restaurant.image} className="img-fluid" alt="" style={{ marginTop:'1.7cm',borderRadius: '10px', marginBottom: '0.5cm',width:'9cm' }}  />                                  
                                        ) : (
                                        <img src='assets/img/images (3).jpeg' className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm',width:'9cm' }}  />
                                        )}
              <h4 style={{ textAlign: 'justify' }}>{restaurant.name}</h4>

              <p style={{ textAlign: 'justify' }}>
                {restaurant.description}
                <p style={{ textAlign: 'center', fontStyle: 'italic', fontPalette: '13px', backgroundColor: 'whitesmoke',border:'1px solid lightgray', padding: '0.4cm', marginTop: '20px', borderRadius: '6px' }}>
                  <BiMap className="" style={{ color: 'black' }} />&nbsp;&nbsp;{restaurant.address} <br />
                  <BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} />&nbsp;&nbsp;{restaurant.email}<br />
                  <BiPhone />&nbsp;&nbsp;{restaurant.phone}
                </p>
              </p>
            </div>
            </Link>
          </div>
        ))
      )}
    </div>
  </div>
</section>
     </div>
  </>

)
} 








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
