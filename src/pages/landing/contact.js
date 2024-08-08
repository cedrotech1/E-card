import React from 'react';

import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; // Importing icons from the 'react-icons' library
import '../../css/main2.css';
import Footer from "../../components/footer";

import Menu from "../../components/menu";

const LandingPage = () => {
  return (
    <>
      <Menu />

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">

          <div className="section-header">

            {/* Uncomment below if you want to include the commented-out content */}
            {/* <h2>Contact</h2>
      <p>Nulla dolorum nulla nesciunt rerum facere sed ut inventore quam porro nihil id ratione ea sunt quis dolorem dolore earum</p> */}
          </div>

          <div className="row gx-lg-0 gy-4">

            <div className="col-lg-4" style={{ fontFamily: 'monospace' }}>

              <div className="info-container d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'white', fontFamily: 'monospace' }}>
                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                  <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}>
                    <BiMap className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} />
                  </i>
                  <div>
                    <h4>Location:</h4>
                    <p>UTB university student, home kicukiro center! </p>
                  </div>
                </div>

                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                  <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                  <div>
                    <h4>Email:</h4>
                    <p>shemalain@gmail.com</p>
                  </div>
                </div>

                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                  <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiPhone className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                  <div>
                    <h4>Call:</h4>
                    <p>+250 0783 945 908</p>
                  </div>
                </div>

                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>

                  <div>
                    {/* <div id="my-map-canvas" style={{ height: '100%', width: '100%', maxWidth: '100%' }}> */}
                    <iframe style={{ height: '100%', width: '100%', border: '0' }} frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=UTB&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                    {/* </div> */}
                  </div>
                </div>
              </div>
</div>

{/* <div style="max-width:100%;list-style:none; transition: none;overflow:hidden;width:500px;height:500px;">
  <div id="gmap-canvas" style="height:100%; width:100%;max-width:100%;">
    <iframe style="height:100%;width:100%;border:0;" frameborder="0"
     src=""></iframe></div><a class="our-googlemap-code" href="https://www.bootstrapskins.com/themes" id="get-map-data">premium bootstrap themes</a><style>#gmap-canvas img{max-height:none;max-width:none!important;background:none!important;}</style></div>

        */}

            <div className="col-lg-8">
              <form action="" method="post" role="form" className="myform">

                <div className="row" style={{ paddingTop: '1cm' }}>
                  <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                </div>
                <div className="form-group mt-3" style={{ paddingTop: '1cm' }}>
                  <textarea className="form-control" name="message" rows="7" placeholder="Message" required></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div className="text-center">
                  <button type="submit" style={{padding:'0.2',width:'100%',borderRadius:'0.3CM',backgroundColor:'whitesmoke',color:'gray'}}>Send Message</button>
                  </div>
              </form>
            </div>

          </div>

        </div>
      </section>
      {/* <section> */}
      <br />
      {/* footer */}
      <Footer />
      {/* footer */}




      <a href="#" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <script src="assets/js/main.js"></script>

    </>
  );
};

export default LandingPage;
