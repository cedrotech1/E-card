
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button, Nav } from 'react-bootstrap';
import '../../css/main2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faCheck,faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Statistics from "../../components/statistics-component";
import LoadingSpinner from '../../components/loading'; 
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


  const [restaurantsAdmin, setRestaurantsAdmin] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantsAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          // Ensure that 'users' is an array before filtering
          const usersArray = Array.isArray(data.users) ? data.users : [];
          const filteredUsers = usersArray.filter(user => user.role === 'restaurentadmin');

          setRestaurantsAdmin(filteredUsers);

          console.log(filteredUsers);
        } else {
          console.error('Failed to fetch restaurantsAdmin:', data.message);
        }

        // Set loading to false after fetching data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurantsAdmin:', error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    fetchRestaurantsAdmin();
  }, []);


  const handleView = (userId) => {
    // Handle view logic
    console.log(`View user with ID: ${userId}`);
  };

  const handleModify = (userId) => {
    // Handle modify logic
    console.log(`Modify user with ID: ${userId}`);
  };
  const handleDeactivate = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/deactivate/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error(`Failed to activate user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  const handleActivate = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/activate/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error(`Failed to activate user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  // ...

const renderActivationButton = (userId, userStatus) => {
  const buttonStyle = {
    backgroundColor: 'white',
    border: '0px',
  };

  if (userStatus === 'active') {
    return (
      <button onClick={() => handleDeactivate(userId)} style={buttonStyle}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    );
  } else if (userStatus === 'inactive') {
    return (
      <button onClick={() => handleActivate(userId)} style={buttonStyle}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
    );
  } else {
    return null;
  }
};
{Array.isArray(restaurantsAdmin) && restaurantsAdmin.length > 0 ? (
  restaurantsAdmin.map((user, index) => (
    <tr key={user.id}>
      <th scope="row">{index + 1}</th>
      <td>{user.firstname} {user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.status}</td>
      <td>
        <button onClick={() => handleView(user.id)} style={{ backgroundColor: 'white', border: '0px' }}>
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button onClick={() => handleModify(user.id)} style={{ backgroundColor: 'white', border: '0px' }}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {renderActivationButton(user.id, user.status)}
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6">No data available</td>
  </tr>
)}
// ...

  


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
                    <div className="container" data-aos="fade-up">
                      <div className="row">

                        {/* menu bars */}
                        <div className="col-12 d-md-none">
                          <Button variant="" onClick={() => setShow(!show)}>
                            ☰
                          </Button>
                        </div>


                        <Statistics />


                      </div>
                    </div>
                  </section>

                  {/* Button to open the modal */}
                  <div style={{ textAlign: 'right',marginBottom:'1cm' }}>
                    <input
                    placeholder='Filter here...'
                      variant=""
                      onClick={handleToggleModal}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        textDecoration: 'none',
                        padding: '0.2cm',
                        width: '4cm',
                        marginTop: '0cm',
                        // color: 'black',
                        height: 'auto',
                        width:'6cm',
                        border:'0px',
                      
                      }}
                    />
                    
                   
                  </div>

                  {/* Modal component */}
                
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
                  <section id="team" className="team" style={{ marginTop: '-2cm' }}>
  <div className="container" data-aos="fade-up">
    <div className="row">
      <div className="" data-aos="fade-up" data-aos-delay="100">
        <div className="row member">

          <div className="col-xl-12 col-md-12" style={{ padding: '0.4cm' }}>
            <h4 style={{ textAlign: 'justify',paddingBottom:'0.5cm',color:'gray' }}>LIST OF OUR RESTAURENT ADMINS</h4>

            {Array.isArray(restaurantsAdmin) && restaurantsAdmin.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr style={{ backgroundColor: '', marginTop: '0cm' }}>
                    <th scope="col" style={{  backgroundColor: 'whitesmoke', marginTop: '0cm',borderTopLeftRadius:'10px' }} >#</th>
                    <th scope="col" style={{  backgroundColor: 'whitesmoke', marginTop: '0cm' }}>image</th>
                    <th scope="col" style={{  backgroundColor: 'whitesmoke', marginTop: '0cm' }}>Names</th>
                    <th scope="col" style={{  backgroundColor: 'whitesmoke', marginTop: '0cm' }}>Email</th>
                    <th scope="col" style={{  backgroundColor: 'whitesmoke', marginTop: '0cm' }}>Phone</th>
                    <th scope="col" style={{  backgroundColor: 'whitesmoke', marginTop: '0cm' }}>status</th>
                    <th scope="col" style={{  backgroundColor: 'whitesmoke', marginTop: '0cm',borderTopRightRadius:'10px'  }}>modify</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantsAdmin.map((user, index) => (
                    <tr key={user.id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                      {user.image && user.image !== 'null' ? (
                                            <img src={user.image} className="img-fluid" alt="" style={{ borderRadius: '10px', marginBottom: '0.3cm', width: '2cm' }}  />

                                        ) : (
                                            <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.3cm', width: '2cm' }}/>

                                        )}
                        
                        </td>
                      <td>{user.firstname} {user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.status}</td>
                      <td>
                        {/* <button onClick={() => handleView(user.id)} style={{ backgroundColor: 'white', border: '0px' }}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button onClick={() => handleModify(user.id)} style={{ backgroundColor: 'white', border: '0px' }}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button> */}
                        {renderActivationButton(user.id, user.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <p>No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
)}

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
