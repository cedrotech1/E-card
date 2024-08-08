import React from 'react';
import '../css/main2.css'

const LandingPage = () => {
  return (
    <>
    <div className="container-fluid">
      <div className="row footerx" style={{ display: 'flex', alignItems: 'flex-end', fontFamily: 'monospace' }}>
        <div className="col-lg-4 order-1 order-lg-2 text-center">
          <ul className="text-lg-left">
            <li>quick access:</li>
            <li className="help">Help</li>
            <li className="help2">More</li>
            <li className="help3">about us</li>
          </ul>
        </div>
        <div className="col-lg-4 order-1 order-lg-2 text-center">
          <ul>
            <li>Info.Support.About</li>
            <li>Terms of Use . Privacy Policy</li>
          </ul>
        </div>
        <div className="col-lg-4 order-1 order-lg-2 text-center text-lg-right d-flex justify-content-center justify-content-lg-end">
          <ul>
          <li> 
  <a href="tel:+0783945908">0783 945 908</a>
</li>

            <li>Shema Alain Voltaire</li>
            <li>Owner and developer </li>
          </ul>
        </div>
      </div>
      </div>
    </>
  );
};

export default LandingPage;
