import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const LandingPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        address: '',
        image:'',
        
    });

    const { id } = useParams();
    const [formDataImage, setFormDataImage] = useState({ image: null,  });
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const [selectedUser, setSelectedUser] = useState([]);
    const [ID, setID] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');
    const [categories, setCategory] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showFileUploadModal, setShowFileUploadModal] = useState(false);
    const handleTogglePasswordModal = () => { setShowPasswordModal(!showPasswordModal); };
    const handleClosePasswordModal = () => { setShowPasswordModal(false);  };
    const handleToggleFileUploadModal = () => { setShowFileUploadModal(!showFileUploadModal);  };
    const handleCloseFileUploadModal = () => {setShowFileUploadModal(false); };
    useEffect(() => {
        const fetchRestaurant = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/categories/one/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            const data = await response.json();
            if (data.success) {
              const restaurantCategories = data.data;
              setFormData({
                name: restaurantCategories.name || '',
                description: restaurantCategories.description  || '',
                price: restaurantCategories.price  || '',
                status: restaurantCategories.status  || '',

            });
            setImage(restaurantCategories.image)

              console.log(restaurantCategories)
            } else {
              console.error('Failed to fetch Restaurant:', data.message);
            }
          } catch (error) {
            console.error('Error fetching Restaurant:', error);
          }
        };
    
        fetchRestaurant();
      }, []); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };



    const handleChangeProfile = (e) => {
        setFormDataImage({
            ...formDataImage,
            [e.target.name]: e.target.files[0],
        });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const res = await response.json();
                toast.success(res.message);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                window.location.reload();
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                toast.error(errorData.message);
            }
        } catch (error) {
            console.error('Error updating user profile', error);
            setError('Failed to update user profile. Please try again later.');
        }
    };

 

    const handleSubmitProfile = async (e) => {
        e.preventDefault();

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('image', formDataImage.image);

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/categories/${id}`, {
                method: 'PUT',
                headers: {Authorization: `Bearer ${token}`, },
                body: formDataUpload,
                            
            });

            if (response.ok) {
                const res = await response.json();
                toast.success(res.message);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                window.location.reload();
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                toast.error(errorData.message);
            }
        } catch (error) {
            console.error('Error updating profile picture', error);
            setError('Failed to update profile picture. Please try again later.');
        }
    };
    // console.log(formData.image)
    // console.log(formData);

    return (
        <>

            <section id="contact" className="contact" style={{ marginTop: 'cm' }}>
                <div className="container" data-aos="fade-up">
                    <div className="row gx-lg-0 gy-4">
                        <div className="col-lg-4" style={{ fontFamily:'cursive' }}>
                            <div className="info-container d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'white', fontFamily:'cursive' }}>
                                <div className="info-itemx d-flex">
                                <div>
                                {image!==null && image!=='null' ? (
                                        <img src={image} className="img-fluid" alt="" style={{ borderRadius: '10px', marginBottom: '0.5cm',width:'9cm'  }} onClick={handleToggleFileUploadModal} />                                  
                                        ) : (
                                        <img src='/assets/img/images (4).jpeg' className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm',width:'9cm' }} onClick={handleToggleFileUploadModal} />
                                        )}
                                        </div>
                                </div>

                                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                                    <div>
                                        <h4 style={{ textAlign: 'center' }}> <center>TITLE:&nbsp;&nbsp;{formData.name} &nbsp; </center> </h4>
                                    </div>
                                </div>
                                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                                    <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}>
                                        <BiMap className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} />
                                    </i>
                                    <div>
                                        <h4>Price:</h4>
                                        <p>{formData.price} RWF</p>
                                    </div>
                                </div>

                                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                                    {/* <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i> */}
                                    <div>
                                        <h4>description</h4>
                                        <p style={{textAlign:'justify',fontFamily:'cursive'}}>{formData.description}</p>
                                    </div>
                                </div>

                       
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <form onSubmit={handleSubmit} className="myform">
                                <h3 style={{ marginBottom: '1cm' }} >CARD CATEGORY INFORMATION</h3>
                                <div className="row" style={{ paddingTop: '0cm' }}>
                                    <div className="col-md-6 form-group">
                                        <span>Name</span>
                                        <input type="text" name="name" className="form-control" id="name" value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <span>price</span>
                                        <input type="text" className="form-control" name="price" id="address" value={formData.price} onChange={handleChange} />
                                    </div>
                                    
                                </div>
                                <div className="form-group mt-3">
                          <span>description</span>
                          <textarea type="text" className="form-control" name="description" value={formData.description} id="email" style={{backgroundColor:'whitesmoke'}} placeholder="............." onChange={handleChange} />
                        </div>
                            
                       
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="form-control" style={{ borderRadius: '10PX', backgroundColor: 'darkblue' }}>
                                        Edit profile
                                    </button>
                                </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        

            <Modal show={showFileUploadModal} onHide={handleCloseFileUploadModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitProfile} className="myform">
                        <div className="row" style={{ paddingTop: '0cm' }}>
                            <div className="form-group mt-3">
                                <input type="file" className="form-control" name="image" id="image" onChange={handleChangeProfile} />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="form-control">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <ToastContainer />
        </>
    );
};

export default LandingPage;
