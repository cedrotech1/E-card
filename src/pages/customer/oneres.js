
import Menu from '../../components/customerM';
import Footer from '../../components/footer';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; // Importing icons from the 'react-icons' library
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/loading'; 

const LandingPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantCategories, setrestaurantCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  
  useEffect(() => {
    
    const fetchRestaurants = async () => {
      if (!id) {
        console.error('Restaurant ID is missing.');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Restaurent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();  
        if (data.success) {
          const ResArray = Array.isArray(data.data) ? data.data : [];
          const filteredRes = ResArray.find(rest => rest.id === Number(id));
          
          if (filteredRes) {
           
console.log(filteredRes)
            setRestaurants([filteredRes]);
            setrestaurantCategories(filteredRes.restaurantCategories);
            console.log(restaurantCategories);
          } else {
            console.error('Restaurant not found with ID:', id);
          }
          setLoading(false);
          
        } else {
          // console.error('Failed to fetch restaurants:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setLoading(false);
      }
    };
  
    fetchRestaurants();
  }, [id]); 
  

  const handleView = (id) => {
    navigate(`../details/${id}`);
  };


  return (
    <>
      <Menu />

      {loading ?<> <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '6cm', // Use 100% of the viewport height
    }}>
      <div>
        <LoadingSpinner />
      </div>
    </div></>: <>

      {Array.isArray(restaurants) && restaurants.length > 0 ? (
      
      <section id="hero" className="hero" style={{marginTop:'1.5cm'}}>
        {restaurants.map((restaurants, index) => (
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
              <h5 style={{ fontSize: '35px', marginBottom: '0.5cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'cursive' }}>
                <b style={{ color: '#f38a7a' }}>{restaurants.name} Restaurent</b>
              </h5>
              <p style={{ marginBottom: '0.5cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'cursive' }}>
              {restaurants.description}
              </p>

              <p style={{ marginBottom: '0.5cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'cursive', marginTop: '1cm' }}>

                <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>
                &nbsp; <span>  {restaurants.email}</span><br />
                <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiPhone className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                &nbsp; <span> {restaurants.phone}</span><br />

                <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiMap className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                &nbsp; <span>{restaurants.address}
                </span>


              </p>



            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              {/* <img src="/assets/img/breakfast from bed-pana.svg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" style={{height:'auto',width:'100%',borderRadius:'7px'}} /> */}
              {restaurants.image!==null && restaurants.image!=='null' ? (
                                        <img src={restaurants.image} className="img-fluid" alt="" style={{ borderRadius: '10px', marginBottom: '0.5cm',width:'15cm'  }}  />                                  
                                        ) : (
                                        <img src='/assets/img/rest.jpg' className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm',width:'100%' }} />
                                        )}
            </div>
          </div>
        </div> ))}
      </section>
      
     ) : (
      <section id="hero" className="hero" style={{ height: '90vh' }}>
      <div className="container position-relative">
        <div className="row gy-5" data-aos="fade-in">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{ marginTop: '4cm', fontFamily: 'cursive' }}>
            <h2 className='welcame' style={{ fontSize: '45px', marginBottom: '0cm', marginTop: '-5cm', fontFamily: 'cursive' }}>
              404
            </h2>
            <p style={{ marginBottom: '1cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'cursive',textAlign:'justfy' }}>
          there is no registered restaurent yet ! <br/>
           sorry !!
            </p>

          </div>
          <div className="col-lg-6 order-1 order-lg-2" style={{ marginTop: 'cm', fontFamily: 'cursive',color:'white' }}>
            <img src="/assets/img/Oops! 404 Error with a broken robot-amico.svg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" />
          </div>
        </div>
      </div>
    </section>
                  )} 

{Array.isArray(restaurants) && restaurants.length > 0 ? (
<>
{Array.isArray(restaurantCategories) && restaurantCategories.length > 0 ? (

      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <div className="col-lg-12 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{marginBottom:'1cm' }}>
            <h6 style={{ fontSize: '28px', marginBottom: '0.5cm', marginTop: '0cm',textAlign:'center', fontStyle: 'bold', fontFamily: 'cursive' }}>
              <i>Meal card categories</i>
            </h6>
            <p style={{ fontFamily: '',fontStyle:'italic',   textAlign:'center', marginLeft: '0cm' }}>
            Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.
            </p>
          </div>
          <div className="row gy-4">
            {restaurantCategories.map((category, index) => (
              <div onClick={() => handleView(category.id)} key={index} className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                <div className="member"style={{padding:"0.3cm"}}>
                {category.image!==null && category.image!=='null' ? (
                                        <img src={category.image} className="img-fluid" alt="" style={{ borderRadius: '10px', marginBottom: '0.5cm',width:'9cm'  }}  />                                  
                                        ) : (
                                        <img src='/assets/img/images (4).jpeg' className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm',width:'100%' }} />
                                        )}
                  {/* <img src='/assets/img/images (4).jpeg' className="img-fluid" alt="" style={{ height: 'auto', width: '100%', borderRadius: '7px' }} /> */}
                  <h4 style={{ textAlign: 'justify', fontFamily: 'cursive', textTransform: 'uppercase',color:'gray' }}>{category.name}</h4>
                  <p style={{ textAlign: 'justify', fontFamily: 'cursive', marginLeft: '0cm' }}>{category.description}</p>
                  <p style={{ fontFamily: 'cursive', marginTop: '-0.5cm', textAlign: 'justify', fontSize: '20px' }}>
                    Price: {category.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
          ) : (
            <section id="hero" className="hero" style={{ height: '90vh' }}>
            <div className="container position-relative">
              <div className="row gy-5" data-aos="fade-in">
                <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start" style={{ marginTop: '4cm', fontFamily: 'cursive' }}>
                  <h2 className='welcame' style={{ fontSize: '45px', marginBottom: '0cm', marginTop: '-5cm', fontFamily: 'cursive' }}>
                    404
                  </h2>
                  <p style={{ marginBottom: '1cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'cursive',textAlign:'justfy' }}>
                there is no registered restaurent categories yet ! <br/>
                 sorry !!
                  </p>
      
                </div>
                <div className="col-lg-6 order-1 order-lg-2" style={{ marginTop: 'cm', fontFamily: 'cursive',color:'white' }}>
                  {/* <img src="/assets/img/Oops! 404 Error with a broken robot-amico.svg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" /> */}
                </div>
              </div>
            </div>
          </section>
                        )}

                       </> ) : (
                          <></>
                        )}
</>}
      <Footer />


    </>
  );
};

export default LandingPage;
