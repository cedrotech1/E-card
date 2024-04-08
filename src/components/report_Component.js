import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { BarLoader } from 'react-spinners';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [report, setreport] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchreport = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/report`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setreport(data.data);
          console.log(data.data)
        } else {
          console.error('Failed to fetch report:', data.message);
          console.log('hggggggggggggggg')
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching report:', error);
        setLoading(false);
      }
    };

    fetchreport();
  }, [token]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (loading) {
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red; // You can customize the color here
    `;

    return (
      <div className="loading-container">
        <BarLoader css={override} size={150} />
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const { role } = user;

  return (
    <div>
      {role === 'superadmin' && (
        <>
          {report && (

            <div className="row">

              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                <div className="row member">

                  <div className=" col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke' }}>

                    <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                      {report.admin.users}
                    </h1>
                  </div>
                  <div className=" col-xl-7  col-md-6 statistic-info">
                    <h5>users</h5>

                    <p>
                      number of users in our system

                    </p>
                    <div className="d-flex justify-content-center justify-content-lg-start">
                    </div>
                  </div>

                </div>

              </div>


              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                <div className="row member">

                  <div className=" col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke' }}>

                    <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                      {report.admin.restaurants}
                    </h1>
                  </div>
                  <div className=" col-xl-7  col-md-6 statistic-info">
                    <h5>restaurents</h5>
                    <p>
                      number of users in our system
                    </p>
                    <div className="d-flex justify-content-center justify-content-lg-start">
                    </div>
                  </div>

                </div>

              </div>
              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                <div className="row member">
                  <div className=" col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke' }}>
                    <h1 style={{ fontSize: '73px', fontFamily: 'cursive' }}>
                      {report.resto.actives}
                    </h1>
                  </div>
                  <div className=" col-xl-7  col-md-6 statistic-info">
                    <h5>Active Employees</h5>
                    <p>
                      we have only
                      &nbsp;{report.resto.actives}
                      &nbsp; active
                    </p>
                    <div className="d-flex justify-content-center justify-content-lg-start">
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                <div className="row member">
                  <div className=" col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke' }}>
                    <h1 style={{ fontSize: '73px', fontFamily: 'cursive' }}>
                      {report.resto.disactives}
                    </h1>
                  </div>
                  <div className=" col-xl-7  col-md-6" style={{ margin: '0cm' }}>
                    <h5 style={{ textAlign: 'justify' }}>Disactiveted Employees</h5>
                    <p style={{ textAlign: 'justify', fontFamily: 'sans-serif' }}>
                      we have only
                      &nbsp;{report.resto.disactives}
                      &nbsp; disactive
                    </p>
                    <div className="d-flex justify-content-center justify-content-lg-start">
                    </div>
                  </div>
                </div>

              </div>


              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                <div className="row member">

                  <div className=" col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke' }}>

                    <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                      {/* {report.admin.users} */}
                      ..
                    </h1>
                  </div>
                  <div className=" col-xl-7  col-md-6" style={{ margin: '0cm' }}>
                    <h5 style={{ textAlign: 'justify' }}>.......</h5>

                    <p style={{ textAlign: 'justify', fontFamily: 'sans-serif' }}>
                      number of .... in our system

                    </p>
                    <div className="d-flex justify-content-center justify-content-lg-start">
                    </div>
                  </div>

                </div>

              </div>







            </div>


          )}
        </>
      )}

      {role === 'restaurentadmin' && (
        <>
          {report && (
            <div className="row">
              <section id="team" className="team" style={{ marginTop: '-2cm', backgroundColor: 'whitesmoke' }}>
      <div className="container" data-aos="fade-up" style={{ backgroundColor: 'whitesmoke' }}>
        <div className="row">
          <div className="" data-aos="fade-up" data-aos-delay="100">
            <div className="row member">
              <div className=" col-xl-12 col-md-12" style={{ padding: '0.4cm' }}>
                <input
                  placeholder='report start day...'
                  variant=""
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    textDecoration: 'none',
                    padding: '0.2cm',
                    width: '4cm',
                    marginTop: '0cm',
                    marginBottom: '1cm',
                    height: 'auto',
                    width: '6cm',
                    border: '0px',
                    outline: 'none',
                  }}
                />
                <input
                  placeholder='report end day...'
                  variant=""
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    textDecoration: 'none',
                    padding: '0.2cm',
                    width: '4cm',
                    marginTop: '0cm',
                    marginBottom: '1cm',
                    height: 'auto',
                    width: '6cm',
                    border: '0px',
                    outline: 'none',
                  }}
                />
                <p style={{ textAlign: 'justify', marginTop: '0cm' }}>
                  <table class="table table-sm table-hover table-borderless ">
                 
                              <thead>
                                <tr>
                                  <th style={{ backgroundColor: 'whitesmoke' }} scope="col">#</th>
                                  <th style={{ backgroundColor: 'whitesmoke' }} scope="col">names</th>
                                  <th style={{ backgroundColor: 'whitesmoke' }} scope="col">category</th>
                                  <th style={{ backgroundColor: 'whitesmoke' }} scope="col">plates</th>
                                  <th style={{ backgroundColor: 'whitesmoke' }} scope="col">date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>    <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>    <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>    <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>    <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <th scope="row">2</th>
                                  <td>Jacob</td>
                                  <td>Thornton</td>
                                  <td>@fat</td>
                                  <td>@fat</td>
                                </tr>
                                <tr>
                                  <th scope="row">3</th>
                                  <td colspan="2">Larry the Bird</td>
                                  <td>@twitter</td>
                                  <td>@fat</td>
                                </tr>
                              </tbody>
                           

                  </table>
                </p>
                <div className="cardx" style={{ width: '18rem', marginTop: '2rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">Total Amount</h5>
                    <p className="card-text">$310.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
