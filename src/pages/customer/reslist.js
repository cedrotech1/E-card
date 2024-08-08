import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/loading'; 
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/customerM';
import Footer from '../../components/footer';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; // Importing icons from the 'react-icons' library

const LandingPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

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
    navigate(`../one/${id}`);
  };
  return (
    <>
      <Menu />
      

      <section id="hero" className="hero"  style={{marginTop:'1cm'}}>
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
              <h5 style={{ fontSize: '35px', fontStyle: 'bold'}}>
                <b>LIST OF ALL <span className='apart' style={{color:'#f38a7a'}}>RESTAURENT</span> </b>
              </h5>
              <p style={{ fontFamily: 'monospace' }}>
                list of all restaurent in system, click on one and view all information of restaurent and its coresponding categories of cards
              </p>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              {/* Uncomment and add the appropriate path for your image */}
                {/* <img src="assets/img/hero-img.svg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" /> */}
               
            </div>
          </div>
        </div>
      </section>
      {loading ?<> <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4cm', // Use 100% of the viewport height
    }}>
      <div>
        <LoadingSpinner />
      </div>
    </div></>: <>

      {Array.isArray(restaurants) && restaurants.length > 0 ? (

<section id="team" className="team">
  <div className="container" data-aos="fade-up">
    <div className="row gy-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        restaurants.map((restaurant) => (
          <div onClick={() => handleView(restaurant.id)} key={restaurant.id} className="col-xl-4 col-md-6 " data-aos="fade-up" data-aos-delay={100 * restaurant.id} style={{ padding: '' }}>
            <div className="team member col-xl-12" style={{padding:"0.3cm"}}>
            {restaurant.image!==null ? (
              <img src={restaurant.image} className="img-fluid" alt="" style={{ borderRadius: '10px', marginBottom: '0.5cm',width:'9CM' }} />
            ) : (
              <img src='/assets/img/rest.jpg' className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '100%' }}/>
            )}
              <h4 style={{ textAlign: 'justify' }}>{restaurant.name}</h4>

              <p style={{ textAlign: 'justify',fontFamily:'arial' }}>
                {restaurant.description}
                <p style={{ textAlign: 'center', fontStyle: 'italic', fontPalette: '13px', backgroundColor: '#faead1', padding: '0.3cm', marginTop: '20px', borderRadius: '6px' }}>
                  <BiMap className="" style={{ color: 'black' }} />&nbsp;&nbsp;{restaurant.address} <br />
                  <BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} />&nbsp;&nbsp;{restaurant.email} <br />
                  <BiPhone />&nbsp;&nbsp;{restaurant.phone}
                </p>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</section>
    ) : (
      <section id="hero" className="hero" style={{ height: '90vh' }}>
      <div className="container position-relative">
        <div className="row gy-5" data-aos="fade-in">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{ marginTop: '4cm', fontFamily: 'monospace' }}>
            <h2 className='welcame' style={{ fontSize: '45px', marginBottom: '0cm', marginTop: '-5cm', fontFamily: 'monospace' }}>
              404
            </h2>
            <p style={{ marginBottom: '1cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace',textAlign:'justfy' }}>
          there is no registered restaurent yet ! <br/>
           sorry !!
            </p>

          </div>
          <div className="col-lg-6 order-1 order-lg-2" style={{ marginTop: 'cm', fontFamily: 'monospace',color:'white' }}>
            <img src="/assets/img/Oops! 404 Error with a broken robot-amico.svg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" />
          </div>
        </div>
      </div>
    </section>
                  )}

</>}
      <Footer />
    </>
  );
};

export default LandingPage;


// const filteredCategories = restaurant.restaurantCategories.filter(category => category.restaurent === restaurant.id);
// setRestaurantCategories(filteredCategories);