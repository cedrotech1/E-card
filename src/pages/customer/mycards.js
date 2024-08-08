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
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/card/mycard/${ID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            const allCards = data.Cardses;
            setCards(allCards);
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
  


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/restaurent/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setRestaurants(data.data);
        } else {
          console.error('Failed to fetch restaurants:', data.message);
        }

        // Set loading to false after fetching data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleView = (id) => {
    navigate(`../history/${id}`);
  };
  return (
    <>
      <Menu />
      <section id="hero" className="hero"  style={{marginTop:'2cm'}}>
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
              <h5 style={{ fontSize: '35px', fontStyle: 'bold'}}>
                <b>LIST OF  <span className='apart' style={{color:'#f38a7a'}}>MY CARDS</span> </b>
              </h5>
              <p style={{ fontFamily: 'monospace' }}>
               {/* liste of all my cards */}
              </p>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">

            </div>
          </div>
        </div>
      </section>

<section id="team" className="team" style={{marginTop:'-1.5cm'}}>
  <div className="container" data-aos="fade-up">
    <div className="row gy-4">
      {loading ? (
      <> <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3cm', // Use 100% of the viewport height
      }}>
        <div>
          <LoadingSpinner />
        </div>
      </div></>
      ) : (
        Cards.map((card) => (
          <div onClick={() => handleView(card.id)} key={card.id} className="col-xl-4 col-md-6 " data-aos="fade-up" data-aos-delay={100 * card.id} style={{ padding: '' }}>
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
                                    </div>
                                  )}

              <p style={{ textAlign: 'justify' }}>
              
                <p style={{ textAlign: 'center', fontStyle: 'italic', fontPalette: '13px', backgroundColor: '#faead1', padding: '0.4cm', marginTop: '20px', borderRadius: '6px' }}>
                  <BiMap className="" style={{ color: 'black' }} />&nbsp;&nbsp;{card.address} <br />
                  <BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} />&nbsp;&nbsp;obina@gmail.com <br />
                  <BiPhone />&nbsp;&nbsp;07854635367
                </p>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</section>



      <Footer />
    </>
  );
};

export default LandingPage;


// const filteredCategories = restaurant.restaurantCategories.filter(category => category.restaurent === restaurant.id);
// setRestaurantCategories(filteredCategories);