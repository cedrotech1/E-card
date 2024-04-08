import React from 'react';
import Menu from "../../components/customerM";
import Footer from "../../components/footer";

const categories = [
  {
    title: 'Vip category',
    image: 'assets/img/hero-img.svg',
    description: 'Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.',
    link: 'https://www.example.com', // replace with the actual link
  },
  // Add more category objects as needed
];

const LandingPage = () => {
  return (
    <>
      <Menu />
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <div className="row">
            {categories.map((category, index) => (
              <div key={index} className="col-xl-6" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: index % 2 === 1 ? '0.3cm' : '0.5cm' }}>
                <div className="row member">
                  <div className="col-xl-5 col-md-6 d-flex">
                    <img src={category.image} className="img-fluid" alt="" />
                  </div>
                  <div className="col-xl-7 col-md-6" style={{ padding: '0cm' }}>
                    <h3 style={{ textAlign: 'justify' }}>{category.title}</h3>
                    <p style={{ textAlign: 'justify', marginTop: '0cm' }}>{category.description}</p>
                    <div className="d-flex justify-content-center justify-content-lg-start">
                      <a
                        href={category.link}
                        className="glightbox btn-watch-video d-flex align-items-center"
                        style={{ backgroundColor: 'whitesmoke', borderRadius: '6px', width: '4cm', textAlign: 'center', padding: '0.2cm', marginTop: '0.1cm' }}
                      >
                        &nbsp; &nbsp; &nbsp; &nbsp; restaurent
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* footer */}
 
        <Footer />
    
      
      {/* footer */}
      <script src="assets/js/main.js"></script>
    </>
  );
};

export default LandingPage;
