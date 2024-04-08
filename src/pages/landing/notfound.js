import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main2.css';
import Menu from '../../components/menu';
import Footer from '../../components/footer';

const LandingPage = () => {


  return (
    <>
      {/* <Menu /> */}



      <section id="hero" className="hero" style={{ height: '100vh' }}>
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{ marginTop: '0cm', fontFamily: 'monospace' }}>
              <h2 className='welcame' style={{ fontSize: '45px', marginBottom: '0cm', marginTop: '', fontFamily: 'monospace' }}>
                404
              </h2>
              <p style={{ marginBottom: '1cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace',textAlign:'justfy' }}>
             This page not found ! in our pages ! <br/>
             sorry ! 
              </p>


          



            </div>
            <div className="col-lg-6 order-1 order-lg-2" style={{ marginTop: 'cm', fontFamily: 'monospace',color:'white' }}>
              <img src="/assets/img/Oops! 404 Error with a broken robot-amico.svg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" />
            </div>
          </div>
        </div>
      </section>
      

      <script src="assets/js/main.js"></script>
    </>
  );
};

export default LandingPage;
