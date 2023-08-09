import React, { useState } from 'react';
import logo from './logo1.jpg.png';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './Header';
import Header from './Navbar';
import Accom from './Accom';
import AccomPost from './AccomPost';


const AgentPage = () => {
    const [isNavOpen, setNavOpen] = useState(false);
    const [places, setPlaces] = useState([]);
  
    const toggleNav = () => {
      setNavOpen((prevState) => !prevState);
    };
  
    // Helper function to round the rating to the nearest half-star
    const roundToHalfStar = (rating) => {
      return Math.round(rating * 2) / 2;
    };
  
    // Fetch places from the API and populate the places state
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://localhost:7125/api/Agency');
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchPlaces(); // Call fetchPlaces to populate places state
    }, []);

  

  return (
    <div>
      <section>
        <Header/>
      </section>
    <section className="feature" id="feature">
    <h1 className="heading">Popular Places</h1>
      <h3 className="title">See the most featured places</h3>

      <div className="card-container">
  {places.map((place) => {
    const rating = roundToHalfStar(parseFloat(place.agency_Rating)); // Parse the rating and round it to the nearest half-star
    return (
      <div className="card" key={place.agency_Id}>
        <img src={`https://localhost:7125/uploads/images/${place.tourImagePath}`} alt="" />
        <div className="info">
          <h3>{place.agency_Name}</h3>
          {/* Assuming Agency_Rating is a number, we can display stars based on that */}
          <div className="stars">
            {Array.from({ length: 5 }, (_, index) => (
              <i
                className={`fas fa-star${index + 1 <= rating ? '' : '-half'}`}
                key={index}
              ></i>
            ))}
          </div>
          <p>
            {place.tour_place}, where {place.tour_place === 'Goa' ? 'the sun, sand, and sea come together' : 'the mountains meet the skies'}, creating a scenic escape for the soul.
          </p>
          {/* Display rate_for_day with the Indian Rupee symbol */}
          {/* <p>₹{place.rate_for_day}</p> */}
          <a href="#">
            <button className="btn">Visit now!</button>
          </a>
        </div>
      </div>
    );
  })}
</div>
    </section>
   <center>
    <a href="/Agentpost"><button className="btn">Post It</button></a> 
 
    </center> 
   
    
   
    <div>
      <div>
      <Accom agencyId={1}/>
      </div>
      <div><AccomPost/></div>
      
    
        <style>
            {`
             @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap');
             @import '~@fortawesome/fontawesome-free/css/all.min.css';
             
             :root{
               --red:#9900ff;
             }
             
            
             
             *::selection{
               background:var(--red);
               color:#fff;
             }
            *{
                margin: 0;
                padding: 0;
                color: #131418;
                font-family: sans-serif;
                letter-spacing: 1px;
                font-weight: 300;
            }
            body{
                overflow-x: hidden;
            }
            nav{
                height: 6rem;
                width: 100vw;
                background-color: #131418;
                box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
                display: flex;
                position: fixed;
                z-index: 10;
            }
            
            /*Styling logo*/
            .logo{
                padding:1vh 1vw;
                text-align: center;
            }
            .logo img {
                height: 5rem;
                width: 8rem;
            }
            
            /*Styling Links*/
            .nav-links{
                display: flex;
                list-style: none; 
                width: 88vw;
                padding: 0 0.7vw;
                justify-content: space-evenly;
                align-items: center;
                text-transform: uppercase;
            }
            .nav-links li a{
                text-decoration: none;
                margin: 0 0.7vw;
            }
            .nav-links li a:hover {
                color: #61DAFB;
            }
            .nav-links li {
                position: relative;
            }
            .nav-links li a::before {
                content: "";
                display: block;
                height: 3px;
                width: 0%;
                background-color: #61DAFB;
                position: absolute;
                transition: all ease-in-out 250ms;
                margin: 0 0 0 10%;
            }
            .nav-links li a:hover::before{
                width: 80%;
            }
            
            /*Styling Buttons*/
            .login-button{
                background-color: transparent;
                border: 1.5px solid #f2f5f7;
                border-radius: 2em;
                padding: 0.6rem 0.8rem;
                margin-left: 2vw;
                font-size: 1rem;
                cursor: pointer;
            
            }
            .login-button:hover {
                color: #131418;
                background-color: #f2f5f7;
                border:1.5px solid #f2f5f7;
                transition: all ease-in-out 350ms;
            }
            .join-button{
                color: #131418;
                background-color: #61DAFB;
                border: 1.5px solid #61DAFB;
                border-radius: 2em;
                padding: 0.6rem 0.8rem;
                font-size: 1rem;
                cursor: pointer;
            }
            .join-button:hover {
                color: #f2f5f7;
                background-color: transparent;
                border:1.5px solid #f2f5f7;
                transition: all ease-in-out 350ms;
            }
            
            /*Styling Hamburger Icon*/
            .hamburger div{
                width: 30px;
                height:3px;
                background: #f2f5f7;
                margin: 5px;
                transition: all 0.3s ease;
            }
            .hamburger{
                display: none;
            }
            
            /*Stying for small screens*/
            @media screen and (max-width: 800px){
                nav{
                    position: fixed;
                    z-index: 3;
                }
                .hamburger{
                    display:block;
                    position: absolute;
                    cursor: pointer;
                    right: 5%;
                    top: 50%;
                    transform: translate(-5%, -50%);
                    z-index: 2;
                    transition: all 0.7s ease;
                }
                .nav-links{
                    position: fixed;
                    background: #131418;
                    height: 100vh;
                    width: 100%;
                    flex-direction: column;
                    clip-path: circle(50px at 90% -20%);
                    -webkit-clip-path: circle(50px at 90% -10%);
                    transition: all 1s ease-out;
                    pointer-events: none;
                }
                .nav-links.open{
                    clip-path: circle(1000px at 90% -10%);
                    -webkit-clip-path: circle(1000px at 90% -10%);
                    pointer-events: all;
                }
                .nav-links li{
                    opacity: 0;
                }
                .nav-links li:nth-child(1){
                    transition: all 0.5s ease 0.2s;
                }
                .nav-links li:nth-child(2){
                    transition: all 0.5s ease 0.4s;
                }
                .nav-links li:nth-child(3){
                    transition: all 0.5s ease 0.6s;
                }
                .nav-links li:nth-child(4){
                    transition: all 0.5s ease 0.7s;
                }
                .nav-links li:nth-child(5){
                    transition: all 0.5s ease 0.8s;
                }
                .nav-links li:nth-child(6){
                    transition: all 0.5s ease 0.9s;
                    margin: 0;
                }
                .nav-links li:nth-child(7){
                    transition: all 0.5s ease 1s;
                    margin: 0;
                }
                li.fade{
                    opacity: 1;
                }
            }
            /*Animating Hamburger Icon on Click*/
            .toggle .line1{
                transform: rotate(-45deg) translate(-5px,6px);
            }
            .toggle .line2{
                transition: all 0.7s ease;
                width:0;
            }
            .toggle .line3{
                transform: rotate(45deg) translate(-5px,-6px);
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
          background:var(--red);
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
          height:111%;
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
};

export default AgentPage;
