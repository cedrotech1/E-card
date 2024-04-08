import React, { useEffect, useState } from 'react';
import '../../css/main2.css';
import LoadingSpinner from '../../components/loading'; 
import Menu from '../../components/customerM';
import Footer from '../../components/footer';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; // Importing icons from the 'react-icons' library
import { useNavigate, useParams } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Cards, setCards] = useState([]);
  const [reports, setReport] = useState([]);

  const token = localStorage.getItem('token');
  const [EmployeesAdmin, setEmployeesAdmin] = useState([]);

  let { id } = useParams();
  const [myid, setMy] = useState();



  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const ID = parsedUser.id;
      setMy(ID);

      const fetchCards = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/one/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.data) {
            const allCards = data.data;
            const allreport = data.data.report;
            setCards([allCards]);
            setReport(allreport);

            console.log(allCards)
            // console.log(allreport)
            console.log(reports)
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
    } else {
      console.error('User information not found in local storage');
    }
  }, [token]);



  const handleView = (id) => {
    navigate(`../history/${id}`);
  };
  return (
    <>
      <Menu />

      {loading ? (
      <> <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5cm', // Use 100% of the viewport height
      }}>
        <div>
          <LoadingSpinner />
        </div>
      </div></>
      ) : (<> 
      {Array.isArray(Cards) && Cards.length > 0 ? (
      <section id="hero" className="hero"  style={{marginTop:'2cm'}}>
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
              <h5 style={{ fontSize: '35px', fontStyle: 'bold' }}>
                <b>REPORT OF   <span className='apart' style={{ color: '#f38a7a' }}>MY CARD USEGE</span> </b>
              </h5>
              <p style={{ fontFamily: 'monospace' }}>
                this report of your meal card ! that shows your meal card usage day to day !! and usage percent according to card statistics


              </p>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
            </div>
          </div>
        </div>
      </section>
        ) : (
          <>

          </>
        
                      )}

      {Array.isArray(Cards) && Cards.length > 0 ? (
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <div className="row gy-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              Cards.map((card) => (
                <div onClick={() => handleView(card.id)} key={card.id} className="col-xl-4 col-md-12 " data-aos="fade-up" data-aos-delay={100 * card.id} style={{ padding: '' }}>
                  <div className="member col-xl-12" style={{padding:"0.4cm"}}>
                    <img src='/assets/img/card7.png' className="img-fluid" alt="" style={{ height: 'auto', padding: '0px', width: '100%', borderRadius: '7px' }} />
                    {/* <h4 style={{ textAlign: 'justify' }}>{restaurant.name}</h4> */}
                    {card.cardUser && (
                      <div>
                        {/* <strong>User:</strong> {card.cardUser.firstname} {card.cardUser.lastname} <br /> */}
                        <strong>Restaurant:</strong> {card.categories.resto.name}<br />
                        <strong>Card category:</strong> {card.categories.name}<br />
                        <strong>Duration:</strong> {card.times} times remain<br />
                        <strong>Date:</strong> {card.createdAt}

                        <p style={{ fontSize: '20px', marginTop: '-1cm' }}>
                          <br />
                          CARD USAGE REMAIN &nbsp;
                          {Cards.length > 0 && typeof Cards[0] !== 'undefined' && Cards[0].times ? (
                            // Your calculation here
                            Math.floor((Number(Cards[0].times) / 60) * 100)
                          ) : (
                            <p>?%</p>
                          )}
                          %
                        </p>
                      </div>
                    )}

                    <p style={{ textAlign: 'justify' }}>

                      <p style={{ textAlign: 'center', fontStyle: 'italic', fontPalette: '13px', backgroundColor: '#faead1', padding: '0.4cm', marginTop: '27px', borderRadius: '6px' }}>
                        <BiMap className="" style={{ color: 'black' }} />&nbsp;&nbsp;{card.address} <br />
                        <BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} />&nbsp;&nbsp;obina@gmail.com <br />
                        <BiPhone />&nbsp;&nbsp;07854635367
                      </p>
                    </p>
                  </div>
                </div>
              ))
            )}

            {loading ? (
              <p>Loading...</p>
            ) : (
              Cards.map((card) => (
                <div onClick={() => handleView(card.id)} key={card.id} className="col-xl-8 col-md-12 " data-aos="fade-up" data-aos-delay={100 * card.id} style={{ padding: '' }}>
                  <div className="member col-xl-12">
                    {Array.isArray(reports) && reports.length > 0 ? (
                      <table className="table table-hover">
                        <thead>
                          <tr style={{ Color: 'red', backgroundColor: '#faead1', marginTop: '0cm' }}>
                            <th style={{ Color: 'red', backgroundColor: '#faead1', marginTop: '0cm' }} scope="col">#</th>
                            <th style={{ Color: 'red', backgroundColor: '#faead1', marginTop: '0cm' }} scope="col">Date AND Time</th>


                            <th style={{ Color: 'red', backgroundColor: '#faead1', marginTop: '0cm' }} scope="col">plates</th>
                            <th style={{ Color: 'red', backgroundColor: '#faead1', marginTop: '0cm' }} scope="col">status</th>

                          </tr>
                        </thead>
                        <tbody>
                          {reports.map((report, index) => (
                            <tr key={report.id}>
                              <th scope="row">{index + 1}</th>
                              <td>{report.date} & {report.time} </td>

                              <td>{report.plates} plates</td>
                              <td>{report.status}</td>

                            </tr>

                          ))}
                          <br />
                          {/* Total plates usege: 23 <br/>
                                    usege percent: 23% */}
                        </tbody>
                      </table>
                    ) : (
                      <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                        <p>card is not used atleast once !!</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}




          </div>
        </div>
      </section>
      ) : (
        <section id="hero" className="hero" style={{ height: '10cm' }}>
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{ marginTop: '4cm', fontFamily: 'monospace' }}>
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
                    )}

</>)}
      <div style={{ marginTop: '2cm', fontFamily: 'monospace' }}>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;


// const filteredCategories = restaurant.restaurantCategories.filter(category => category.restaurent === restaurant.id);
// setRestaurantCategories(filteredCategories);