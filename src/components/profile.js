import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi';
import { Modal, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import LoadingSpinner from './loading';

const LandingPage = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
        image: '',
    });
    const [loading, setLoading] = useState(true);

    const [formData1, setFormData1] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [formDataImage, setFormDataImage] = useState({
        image: null,
    });

    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    const [selectedUser, setSelectedUser] = useState({});
    const [ID, setID] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showFileUploadModal, setShowFileUploadModal] = useState(false);

    const handleTogglePasswordModal = () => {
        setShowPasswordModal(!showPasswordModal);
    };

    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
    };

    const handleToggleFileUploadModal = () => {
        setShowFileUploadModal(!showFileUploadModal);
    };

    const handleCloseFileUploadModal = () => {
        setShowFileUploadModal(false);
    };

    useEffect(() => {
        setLoading(true);
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setStatus(parsedUser.status);
            setFormData({
                firstname: parsedUser.firstname || '',
                lastname: parsedUser.lastname || '',
                email: parsedUser.email || '',
                phone: parsedUser.phone || '',
                gender: parsedUser.gender || '',
                address: parsedUser.address || '',
                image: parsedUser.image || '',
            });
            setLoading(false);
            setID(parsedUser.id);
            setSelectedUser(parsedUser);
            setImage(parsedUser.image);
        } else {
            console.error('User information not found in local storage');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

    const handleChange1 = (e) => {
        setFormData1({
            ...formData1,
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
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/update/${ID}`, {
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
                const updatedUser = { ...selectedUser, ...formData };
                localStorage.setItem('user', JSON.stringify(updatedUser));

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

    const handleSubmit1 = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/changePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData1,
                }),
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
            console.error('Error changing password', error);
            setError('Failed to change password. Please try again later.');
        }
    };

    const handleSubmitProfile = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formDataUpload = new FormData();
            formDataUpload.append('image', formDataImage.image);

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/update/${ID}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataUpload,
            });

            if (response.ok) {
                const res = await response.json();
                toast.success(res.message);

                const updatedUser = { ...selectedUser, image: res.user.image };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setImage(res.user.image);

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

    return (
        <>
            {/* {loading ? <LoadingSpinner /> : <> */}

            <section id="contact" className="contact" style={{ marginTop: '-2cm' }}>
                <div className="container-fluid" data-aos="fade-up">
                    <div className="row gx-lg-0 gy-4">
                        <div className="col-lg-4" style={{ fontFamily: 'cursive' }}>
                            <div className="info-container d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'white', fontFamily: 'arial' }}>
                                <div className="info-itemx d-flex">
                                    <div>
                                        {formData.image && formData.image !== 'null' ? (
                                            <img src={image} className="img-fluid" alt="" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '11cm' }} onClick={handleToggleFileUploadModal} />

                                        ) : (
                                            <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '9cm' }} onClick={handleToggleFileUploadModal} />

                                        )}
                                    </div>


                                </div>

                                {/* <div className="info-item d-flex" style={{ backgroundColor: 'white', color: 'black' }}> */}
                                <p style={{ fontFamily: 'arial', color: 'green', marginTop: '-0.3cm', marginBottom: 'cm', marginRight: '0.2cm', textAlign: 'center' }}>
                                    <FaInfoCircle style={{ color: 'green' }} /> Click to your profile pic to edit !
                                </p>
                                {/* </div> */}

                                <div className="info-item " style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                                    <div>
                                        <h4 style={{ textAlign: 'center' }}>{formData.firstname} &nbsp;{formData.lastname}  </h4>
                                    </div>
                                </div>
                                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                                    <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}>
                                        <BiMap className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} />
                                    </i>
                                    <div>
                                        <h4>Location:</h4>
                                        <p>{formData.address}</p>
                                    </div>
                                </div>

                                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                                    <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>
                                    <div>
                                        <h4>Email:</h4>
                                        <p>{formData.email}</p>
                                    </div>
                                </div>

                                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                                    <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiPhone className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>
                                    <div>
                                        <h4>Call:</h4>
                                        <p>{formData.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <form onSubmit={handleSubmit} className="myform">
                                <h3 style={{ marginBottom: '1cm' }} >CHANGE PROFILE</h3>
                                <div className="row" style={{ paddingTop: '0cm' }}>
                                    <div className="col-md-6 form-group">
                                        <span>First name</span>
                                        <input type="text" name="firstname" className="form-control" id="firstname" value={formData.firstname} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <span>Last Name</span>
                                        <input type="text" className="form-control" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <span>Email</span>
                                    <input type="text" className="form-control" name="email" id="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="form-group mt-3">
                                    <span>Phone</span>
                                    <input type="text" className="form-control" name="phone" id="phone" value={formData.phone} onChange={handleChange} />
                                </div>
                                <div className="row" style={{ paddingTop: '0.3cm' }}>
                                    <div className="col-md-6 form-group">
                                        <span>Gender</span>
                                        <input type="text" name="gender" className="form-control" id="gender" value={formData.gender} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <span>Address</span>
                                        <input type="text" className="form-control" name="address" id="address" value={formData.address} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="form-control" style={{ borderRadius: '10PX', backgroundColor: 'darkblue' }} disabled={loading}>
                                        {loading ? <LoadingSpinner /> : ' Edit profile'}
                                    </button>
                                </div>
                                <div className="row" style={{ backgroundColor: '' }}>
                                    <div className="col-xl-4 col-md-4" style={{ padding: '0.4cm' }}></div>
                                    <div className="col-xl-4 col-md-4" style={{ padding: '0.4cm' }}></div>
                                    <div className="col-xl-4 col-md-4" style={{}}>
                                        <div style={{ textAlign: 'right', marginTop: '-1cm' }}>
                                            <Button
                                                variant=""
                                                onClick={handleTogglePasswordModal}
                                                style={{
                                                    backgroundColor: 'whitesmoke',
                                                    borderRadius: '6px',
                                                    fontFamily: 'arial',
                                                    textDecoration: 'none',
                                                    padding: '0.2cm',
                                                    width: '5cm',
                                                    color: 'black',
                                                    height: 'auto',
                                                    fontSize: '15px'
                                                }}
                                            >
                                                CHANGE PASSWORD
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* </>} */}

            <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit1} className="myform">
                        <div className="row" style={{ paddingTop: '0cm' }}>
                            <div className="form-group mt-3">
                                <span>old password</span>
                                <input type="password" className="form-control" name="oldPassword" id="password" placeholder="*********" onChange={handleChange1} />
                            </div>
                            <div className="form-group mt-3">
                                <span>new password</span>
                                <input type="password" className="form-control" name="newPassword" id="password" placeholder="*********" onChange={handleChange1} />
                            </div>
                            <div className="form-group mt-3">
                                <span>confirm password</span>
                                <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="*********" onChange={handleChange1} />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="form-control" disabled={loading}>
                                    {loading ? <LoadingSpinner /> : ' Edit '}
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>


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
                            <div>
                                <p style={{ fontFamily: 'cursive', color: 'green', margin: '0.5cm 0', marginBottom: '-1cm', marginRight: '0.2cm', textAlign: 'center' }}>
                                    <FaInfoCircle style={{ color: 'green' }} /> Please upload passport image
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="form-control" disabled={loading}>
                                    {loading ? <LoadingSpinner /> : ' apload'}
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
