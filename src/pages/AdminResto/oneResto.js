import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);

  const userProfile = {
    name: 'John Doe',
    username: 'john_doe',
    profilePictureUrl: 'http://res.cloudinary.com/dzl8xve8s/image/upload/v1706905292/Card/nmgtevfnkiuwj33tfoqi.png',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    address: '123 Main St, Cityville',
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Button variant="primary" onClick={handleOpenModal}>
        View Profile
      </Button>


    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modal Header</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="" data-aos="fade-up" data-aos-delay="100">
              <div className="row memberx" style={{padding:"0.4cm"}}>
                <div className=" col-xl-6 col-md-6 d-flex">
                  <img src="assets/img/Writer's block-rafiki.svg" className="img-fluid" alt="" style={{ height: 'auto' }} />

                </div>
                <div className=" col-xl-6 col-md-6" style={{ padding: '0.5cm' }}>
                  <h3 style={{ textAlign: 'justify' }}>how our system work?


                  </h3>




                  <p style={{ textAlign: 'justify', marginTop: '1cm' }}>
                    Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                    Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                    Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                    Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                    Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                    Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                    Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                    Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                    Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
                  </p>
                  <div className="d-flex justify-content-center justify-content-lg-start">

                    <a
                      href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                      className="glightbox btn-watch-video d-flex align-items-center"
                      style={{ backgroundColor: 'whitesmoke', borderRadius: '6px', width: '4cm', textAlign: 'center', padding: '0.2cm', marginTop: '0.5cm' }}
                    >
                      &nbsp;  &nbsp;  &nbsp;  &nbsp;
                      View more
                    </a>
                  </div>
                </div>
              </div>


            </div>



          </div>
        </div>
      </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

    </>
  );
};

export default UserProfile;
