import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Photo from '../src/source/photo.jpg';
import Photo1 from '../src/source/photo2.jpg';
import Photo3 from '../src/source/photo3.jpg';
import riverVideo from '../src/source/river.mp4';
import Rishikesh from '../src/source/Rishikesh.jpg';
import User1 from '../src/source/User1.jpeg';
import User2 from '../src/source/User2.png';
import User3 from '../src/source/User3.jpeg';
import about_us from '../src/source/about_us.png';
import egypt from '../src/source/egypt.jpg';
import kerela from '../src/source/kerela.jpg';
import rajasthan from '../src/source/rajasthan.jpg';
import travelling from '../src/source/travelling.png';
import varanasi from '../src/source/varanasi.jpg';
import axios from 'axios';
import FeedBack from './Feedback';
import Header from './Navbar';

const GalleryItem = ({ imageSrc, title, description }) => {
  return (
    <div className="box">
      <div className="image">
        <img src={imageSrc} alt="" />
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
        {/* <a href="#">
          <button className="btn">explore!</button>
        </a>  */}
        <a href="/tourpac"><button className="btn">explore!</button></a> 
      </div>
    </div>
  );
};


const roundToHalfStar = (rating) => {
  return Math.round(rating * 2) / 2;
};

const Home = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [galleryData, setGalleryData] = useState([]);
  const [places, setPlaces] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const token =localStorage.getItem('userToken');

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('https://localhost:7125/api/Agency');
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7125/api/AdminPosts',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }); // Change the URL here
        setGalleryData(response.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchPlaces(); // Call fetchPlaces to populate places state

    // Fetch the feedback data from the API
    fetch('https://localhost:7125/api/FeedBacks')
      .then((response) => response.json())
      .then((data) => setFeedbackData(data))
      .catch((error) => console.error('Error fetching feedback data:', error));
  }, []);

    

  return (
    
   
    <div>
      <Header/>
      <section className="home" id="home">
        <div className="video-container">
          <video src={riverVideo} muted loop autoPlay></video>
        </div>
        <div className="content">
          <h1>explore.</h1>
          <h3>its time to travel</h3>
          <div className="form-container">
          </div>
        </div>
        
      </section>
    <section className="feature" id="feature">
        <h1 className="heading">popular places</h1>
        <h3 className="title">see the most featured places</h3>

        <div className="card-container">

          <div className="card">
            <img src={Photo} alt="" />
            <div className="info">
              <h3>tour 1-Manali</h3>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>Manali, where the mountains meet the skies, creating a scenic escape for the soul.</p>
              <a href="#"><button className="btn">visit now!</button></a>
            </div>
          </div>

          <div className="card">
            <img src={Photo1} alt="" />
            <div className="info">
              <h3>tour 2- Goa</h3>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>Goa, where the sun, sand, and sea come together to create a paradise on earth.</p>
              <a href="#"><button className="btn">visit now!</button></a>
            </div>
          </div>
          <div className="card">
            <img src={Photo3} alt="" />
            <div className="info">
              <h3>tour 3-Bali</h3>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half"></i>
              </div>
              <p>Bali, where the beauty of nature and rich cultural heritage come together in perfect harmony.</p>
              <a href="#"><button className="btn">visit now!</button></a>
            </div>
          </div>
        </div>
      </section>
      
    <section className="gallery" id="gallery">
      <h1 className="heading">our gallery</h1>
      <h3 className="title">explore the most visited places</h3>

      <div className="box-container">
        {galleryData.map((item) => (
          <GalleryItem
            key={item.place_Id} // Assuming that "place_Id" is the unique identifier for each place
            imageSrc={`https://localhost:7125/uploads/images/${item.placeImagePath}`} // Change the imageSrc prop
            title={item.place_name} // Change the title prop
            description={`${item.place_name} -  The perfect getaway for nature enthusiasts. Surround yourself with lush greenery and enjoy outdoor activities all year round in ${item.place_name}.`} // Concatenating the place_name with additional content
          />
        ))}
      </div>
    </section>
    <section className="review" id="review">
      <h1 className="heading">customers review</h1>
      <h3 className="title">what people say about us</h3>
      <div className="box-container">
        {feedbackData &&
          feedbackData.map((feedback) => (
            <div className="box" key={feedback.feedBack_id}>
              <i className="fas fa-quote-left"></i>
              <p>{feedback.feedBack_area}</p>
              <div className="user">
                <div className="info">
                  <div className="stars">
                    {/* Display star rating based on feedbackRating */}
                    {Array.from({ length: 5 }, (_, index) => (
                      <i
                        className={`fas fa-star${
                          index + 1 <= roundToHalfStar(feedback.feedBack_rating) ? '' : '-half'
                        }`}
                        key={index}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        <FeedBack/>
      </div>
    </section>
      <section className="about" id="about">
        <h1 className="heading">about us</h1>
        <h3 className="title">explore the world with us</h3>
        <div className="row">
          <div className="image">
            <img src={travelling} alt="" />
          </div>
          <div className="content">
            <h3>why choose us?</h3>
            <p>Choose TravelAir for personalized travel experiences, innovative solutions, flexibility, cost-effectiveness, and a passionate team. Experience memorable and enjoyable trips with TravelAir.</p>
            <a href="#"><button className="btn">Read more</button></a>
          </div>
        </div>
        <div className="box-container">
          <div className="box">
            <i className="fas fa-map"></i>
            <h3>travel guide</h3>
          </div>
          <div className="box">
            <i className="fas fa-users"></i>
            <h3>24 x 7 service</h3>
          </div>
          <div className="box">
            <i className="fas fa-hotel"></i>
            <h3>hotel booking</h3>
          </div>
        </div>
      </section>
      <section className="contact" id="contact">
      <h1 className="heading">contact us</h1>
      <h3 className="title">book your tickets now</h3>

      <form action="">
        <div className="inputBox">
          <input type="text" placeholder="first name" />
          <input type="text" placeholder="last name" />
        </div>

        <div className="inputBox">
          <input type="email" placeholder="email" />
          <input type="number" placeholder="phone" />
        </div>

        <textarea name="" id="" cols="30" rows="10" placeholder="message"></textarea>

        <input type="submit" value="message" className="btn" />
      </form>
    </section>
     <section className="footer">
      <div className="box">
        <h3>explore.</h3>
        <p>TravelAir: Where Adventure Awaits And Memories Are Made.</p>
      </div>

      <div className="box">
        <h3>share</h3>
        <a href="https://www.linkedin.com/in/keerthana-rajendran-69a66a1b9">Linkedin</a>
        <a href="#">twitter</a>
        <a href="https://instagram.com/keer_thanaaa?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D">instagram</a>
        <a href="https://github.com/keerthana-kanini">github</a>
      </div>

      <div className="box">
        <h3>links</h3>
        <a href="#">home</a>
        <a href="#">feature</a>
        <a href="#">about</a>
        <a href="#">gallery</a>
        <a href="#">review</a>
        <a href="#">contact</a>
      </div>

    </section>
    <div>
    <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap');
        @import '~@fortawesome/fontawesome-free/css/all.min.css';
        
        :root{
          --red:#9900ff;
        }
        
        *{
          font-family: 'Roboto', sans-serif;
          margin:0; padding: 0;
          box-sizing: border-box;
          border:none; outline: none;
          text-decoration: none;
          text-transform: capitalize;
          font-weight: 400;
          transition:.2s linear;
        }
        
        *::selection{
          background:var(--red);
          color:#fff;
        }
        
        html{
          font-size: 62.5%;
          overflow-x: hidden;
        }
        
        .nav-toggle{
          transform: translateX(-30rem);
        }
        
        .btn{
          height:3.5rem;
          width: 15rem;
          background: var(--red);
          color:#fff;
          border-radius: .5rem;
          font-size: 1.7rem;
          cursor: pointer;
          margin:1rem 0;
          box-shadow: 0 .3rem .5rem var(--red);
          opacity: .7;
        }
        
        .btn:hover{
          opacity: 1;
        }
        
        .heading{
          text-align: center;
          padding:.5rem 1rem;
          padding-top: 2rem;
          font-size: 3.5rem;
          color:var(--red);
          text-transform: uppercase;
        }
        
        .title{
          text-align: center;
          padding:0rem 1rem;
          font-size: 2.5rem;
          color:#666;
          font-weight: 300;
        }
        
        header .menu{
          position: fixed;
          top:1.5rem; right:2rem;
          font-size: 3.5rem;
          color:var(--red);
          background:#ffff;
          box-shadow: 0 .1rem .3rem rgba(0,0,0,.3);
          padding:.3rem 1.4rem;
          cursor: pointer;
          z-index: 1000;
          overflow: hidden;
        }
        
        header .navbar{
          height: 100vh;
          width:30rem;
          position: fixed;
          top:0; right:0;
          background:#111;
          display: none;
        }
        
        header .navbar ul{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: column;
          height:100%;
          list-style: none;
        }
        
        header .navbar ul li{
          margin:1.4rem;
          animation:fadeIn .2s linear backwards;
          animation-delay: calc(.3s * var(--i));
        }
        
        @keyframes fadeIn{
          0%{
            transform: translateY(-8rem);
            opacity: 0;
          }
        }
        
        header .navbar ul li a{
          font-size: 3rem;
          color:#fff;
        }
        
        header .navbar ul li a:hover{
          color:var(--red);
        }
        
        .fa-times{
          transform:rotate(180deg) skew(-180deg);
        }
        
        .home{
          position: relative;
          min-height: 100vh;
          z-index: 0;
        }
        
        .home .video-container video{
          position: absolute;
          top:0; left: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          z-index: -1;
        }
        
        .home .content{
          min-height: 100vh;
          width: 45rem;
          background:rgba(255,255,255,.1);
          backdrop-filter: blur(.5rem);
          text-align: center;
          padding:2rem 3rem;
        }
        
        .home .content h1{
          font-size: 4rem;
          padding-top: 4vh;
          color:#fff;
          text-transform: uppercase;
        }
        
        .home .content h3{
          font-size: 3rem;
          color:#eee;
          font-weight: lighter;
        }
        
        .home .content .form-container form{
          width: 100%;
          background:#fff;
          padding: 1rem 2rem;
          margin-top: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 .3rem .5rem rgba(0,0,0,.3);
        }
        
        .home .content .form-container form h3{
          font-size: 2.5rem;
          padding:2rem 1rem;
          color:#333;
          font-weight: 400;
          text-transform: uppercase;
        }
        
        .home .content .form-container form span{
          font-size: 2rem;
          display: block;
          padding:1.4rem 0;
          color:var(--red);
          text-align: left;
        }
        
        .home .content .form-container form input{
          height:3.5rem;
          width: 100%;
          padding:0 1rem;
          font-size: 1.5rem;
          background:#eee;
        }
        
        .home .content .form-container form .btn{
          width: 15rem;
          background-color: var(--red);
          margin:1.5rem 0;
        }
        
        .feature{
          background: #2C3A47;
        }
        
        .feature .title{
          color:#eee;
        }
        
        .feature .card-container{
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          padding:2rem 0;
        }
        
        .feature .card-container .card{
          height:45rem;
          width:30rem;
          margin:2rem 1rem;
          position: relative;
          overflow: hidden;
        }
        
        .feature .card-container .card img{
          height:100%;
          width:100%;
          object-fit: cover;
        }
        
        .feature .card-container .card .info{
          height:100%;
          width: 100%;
          position: absolute;
          bottom:-100%; left: 0;
          background:linear-gradient(transparent, #000);
          padding: 0 2rem;
          padding-top: 85%;
        }
        
        .feature .card-container .card:hover .info{
          bottom:0%;
        }
        
        .feature .card-container .card .info h3{
          font-size: 3rem;
          color:#fff;
        }
        
        .feature .card-container .card .info .stars i{
          font-size: 1.5rem;
          color:var(--red);
          padding:1rem 0;
        }
        
        .feature .card-container .card .info p{
          font-size: 1.5rem;
          color:#eee;
        }
        
        .feature .card-container .card .info .btn{
          box-shadow: none;
        }
        
        .about .row{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80%;
          margin:2rem auto;
          padding:2rem;
        }
        
        .about .row .image img{
          height:90vh;
          width:70vw;
         
        }
        
        .about .row .content h3{
          font-size: 3rem;
          color:var(--red);
        }
        
        .about .row .content p{
          font-size: 1.7rem;
          color:#666;
          padding:1rem 0;
        }
        
        .about .box-container{
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .about .box-container .box{
          margin:2rem;
          height:15rem;
          width:25rem;
          border-radius: 1rem;
          background:var(--red);
          text-align: center;
          color: #fff;
        }
        
        .about .box-container .box i{
          font-size: 5rem;
          margin:2rem 0;
        }
        
        .about .box-container .box h3{
          font-size: 2rem;
        }
        
        .gallery{
          background:#f9f9f9;
        }
        
        .gallery .box-container{
          padding:4rem 0;
        }
        
        .gallery .box-container .box{
          width:75%;
          margin:4rem auto;
          border-radius: .5rem;
          box-shadow: 0 .3rem .5rem rgba(0,0,0,.3);
          display: flex;
          align-items: center;
          overflow: hidden;
          background:#fff;
        }
        
        
        .gallery .box-container .box .image{
          height: 25rem;
          width:50%;
        }
        
        .gallery .box-container .box .image img{
          height: 100%;
          width:100%;
          object-fit: cover;
        }
        
        .gallery .box-container .box .content{
          height: 100%;
          width:50%;
          padding:2rem;
        }
        
        .gallery .box-container .box:nth-child(even){
          flex-flow: row-reverse;
        }
        
        .gallery .box-container .box:nth-child(even) .content{
          text-align: right;
        }
        
        .gallery .box-container .box .content h3{
          color:var(--red);
          font-size: 3rem;
        }
        
        .gallery .box-container .box .content p{
          color:#666;
          font-size: 1.5rem;
          padding:1rem 0;
        }
        
        .review .box-container{
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          padding:2rem 0;
        }
        
        .review .box-container .box{
          width: 30rem;
          text-align: center;
          padding: 0 2rem;
          margin:4rem 1.5rem;
          box-shadow: 0 .3rem .5rem rgba(0,0,0,.3);
        }
        
        .review .box-container .box i{
          font-size: 3rem;
          margin-top: -3rem;
          color:var(--red);
          opacity: .4;
        }
        
        .review .box-container .box p{
          color:#666;
          font-size: 1.3rem;
          padding:2rem 0;
        }
        
        .review .box-container .box .user{
          display: flex;
          align-items: center;
          text-align: left;
          padding:.5rem 0;
          border-top: -0.1rem solid #3334;
        }
        
        .review .box-container .box .user img{
          height:4rem;
          width:4rem;
          border-radius: 50%;
          object-fit: cover;
          margin:.8rem 1rem;
        }
        
        .review .box-container .box .user .info h3{
          color:var(--red);
          font-size: 1.8rem;
        }
        
        .review .box-container .box .user .info span{
          color:#666;
          font-size: 1.5rem;
        }
        
        .newsletter{
          background:var(--red);
          padding:3rem;
        }
        
        .newsletter .box{
          width: 100%;
          padding:2rem;
          text-align: center;
          border-radius: 1rem;
          background:#f9f9f9;
        }
        
        .newsletter .box h1{
          color:var(--red);
          font-size: 4rem;
        }
        
        .newsletter .box p{
          color:#666;
          font-size: 1.8rem;
        }
        
        .newsletter .box form{
          background:#eee;
          width:60%;
          margin:2rem auto;
          padding:.5rem 0;
          height:5rem;
          border-radius: 5rem;
        }
        
        .newsletter .box form input[type="email"]{
          width: 71%;
          background:none;
          padding:.5rem;
          font-size: 1.5rem;
        }
        
        .newsletter .box form .btn{
          height:90%;
          width: 26%;
          border-radius: 5rem;
          margin:.1rem 0;
          box-shadow: none;
        }
        
        .contact{
          background: #2C3A47;
        }
        
        .contact .title{
          color:#eee;
        }
        
        .contact form{
          width:80%;
          text-align: center;
          padding:4rem 0;
          margin:0 auto;
        }
        
        .contact form .inputBox{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        
        .contact form .inputBox input{
          width: 49%;
          height:4rem
        }
        
        .contact form input, textarea{
          padding:0 1rem;
          font-size: 1.7rem;
          margin:1rem 0;
          color:#333;
        }
        
        .contact form textarea{
          padding:1rem;
          height:20rem;
          resize: none;
          width: 100%;
        }
        
        .contact form .btn{
          box-shadow: none;
          color:#fff;
          opacity: 1;
        }
        
        .contact form .btn:hover{
          opacity: .8;
        }
        
        .footer{
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          padding:2rem 0;
        }
        
        .footer .box{
          width:30rem;
          margin:2rem;
          text-align: center;
        }
        
        .footer .box:nth-child(1){
          text-align: left;
        }
        
        .footer .box h3{
          font-size: 3rem;
          color:var(--red);
          padding:1rem 0;
        }
        
        .footer .box p{
          color:#666;
          font-size: 1.5rem;
        }
        
        .footer .box a{
          color:#666;
          font-size: 2rem;
          display: block;
          padding:.2rem 0;
        }
        
        .footer .box a:hover{
          text-decoration: underline;
        }
        .footer .credit{
          width: 85%;
          padding-top: 1rem;
          font-size: 2rem;
          color:#666;
          text-align: center;
          border-top: .2rem solid #3333;
        }
        .footer .credit span{
          color:var(--red);
        }
        /* media queries  */
        
        @media (max-width:500px){
        
          html{
            font-size: 50%;
          }
        
          .home .content{
            width: 100%;
          }
        
          .contact form{
            width: 90%;
          }
        
          .contact form .inputBox input{
            width: 100%;
          }
        }
        
        @media (max-width:768px){
        
          html{
            font-size: 55%;
          }
        
          .about .row{
            flex-flow: column;
            width:90%;
          }
        
          .about .row .image img{
            width: 90vw;
          }
        
          .gallery .box-container .box{
            flex-flow: column;
            width: 90%;
          }
        
          .gallery .box-container .box:nth-child(even){
            flex-flow: column;
          }
        
          .gallery .box-container .box .image{
            width: 100%;
          }
        
          .gallery .box-container .box .content{
            width: 100%;
          }
        
          .gallery .box-container .box:nth-child(even) .content{
            text-align: left;
          }
        
          .newsletter .box form{
            width: 100%;
          }
        
        } 
          
        `}
      </style>
    </div>
    </div>
    
  );
}

export default Home;