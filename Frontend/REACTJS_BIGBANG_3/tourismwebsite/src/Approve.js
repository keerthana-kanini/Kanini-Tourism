import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admincard from './Admincard';
import GalleryPost from './GalleryPost';
import Navbar from './Header';


export default function Approve() {
 
    const [place_name, setplace_name] = useState('');
  const [placeImagePath, setplaceImagePath] = useState(null);


  const handlePlaceNameChange = (e) => {
    setplace_name(e.target.value);
  };
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setplaceImagePath(file); // Save the selected image file to state
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('place_name', place_name);
    postData.append('placeImagePath', placeImagePath);
    postData.append('adminRegister.admin_Id', '2');

      // Send the POST request using Axios
      axios
      .post('https://localhost:7125/api/AdminPosts', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Handle success, if needed
        console.log('Data successfully posted:', response.data);
      })
      .catch((error) => {
        // Handle error, if needed
        console.error('Error posting data:', error);
      });
  };
    const [approvedAgents, setApprovedAgents] = useState([]);

    useEffect(() => {
      fetchApprovedAgents();
    }, []);
  
    const fetchApprovedAgents = () => {
      fetch('https://localhost:7125/api/AgentRegisters/Approved')
        .then(response => response.json())
        .then(data => {
          setApprovedAgents(data);
        })
        .catch(error => {
          console.error('Error fetching approved agents:', error);
        });
    };
  const [travelAgents, setTravelAgents] = useState([]);

  useEffect(() => {
    fetchTravelAgents();
  }, []);

  const fetchTravelAgents = () => {
    fetch('https://localhost:7125/api/AdminRegisters/UnapprovedTravelAgents')
      .then(response => response.json())
      .then(data => {
        setTravelAgents(data);
      })
      .catch(error => {
        console.error('Error fetching travel agents:', error);
      });
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`https://localhost:7125/api/AdminRegisters/UpdateApprovalStatus/${id}`, "Approved", {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchApprovedAgents();
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.put(`https://localhost:7125/api/AdminRegisters/UpdateApprovalStatus/${id}`, "Declined", {
        headers: { 'Content-Type': 'application/json' }
      });
  
      // Update the status of the declined agent in the travelAgents state
      setTravelAgents(prevAgents =>
        prevAgents.map(agent =>
          agent.agent_Id === id ? { ...agent, status: 'Declined' } : agent
        )
      );
  
      // Find the declined agent from travelAgents and add it to approvedAgents
      const declinedAgent = travelAgents.find(agent => agent.agent_Id === id);
      if (declinedAgent) {
        setApprovedAgents(prevApprovedAgents => [...prevApprovedAgents, declinedAgent]);
      }
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };
  
  

  const renderTravelAgents = () => {
    if (travelAgents.length === 0) {
      return <div className="no-requests">No travel agents to approve</div>;
    }

    return travelAgents.map(agent => (
      <div>
      <div className="agent-card" key={agent.agent_Id}>
        <div className="agent-card__content">
          <h2>{agent.agent_Name}</h2>
          <p><b>Status: </b>{agent.status}</p>
        </div>
        <div className="agent-card__actions">
          <button className="agent-card__button" onClick={() => handleApprove(agent.agent_Id)}>
            Approve
          </button>
          <button className="agent-card__button" onClick={() => handleDecline(agent.agent_Id)}>
            Decline
          </button>
        </div>
      </div>
      </div>
    ));
  };

 
 
  return (
    <div>
      <section>
        <Navbar/>
        </section>
        <div>
       
      <center><h1>Travel Agents Request</h1></center><br></br>
      <div id="travelAgentsContainer">{renderTravelAgents()}</div>
      <div>
     <h1>Approved Agents</h1>
<div className="card-container">
  {approvedAgents &&
    approvedAgents.map((agent) => (
      <div key={agent.agent_Id} className="card">
        <h2>{agent.agent_Name}</h2>
        <p>Status: {agent.status}</p>
        {agent.agencies && (
          <div>
            <p>Agencies:</p>
            <ul>
              {agent.agencies.map((agency) => (
                <li key={agency.agency_Id}>{agency.agency_Name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
</div>

    </div>
    <br/>
   <div>
    <Admincard/>
    </div>
    <div>
      <GalleryPost/>
      </div>

      </div>
  
      <style>
        {`
          
  .agent-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    width: 300px;
    max-width: 100%;
  }
  
  .agent-card__content {
    margin-bottom: 16px;
  }
  
  .agent-card h2 {
    margin-top: 0;
  }
  
  .agent-card p {
    margin-bottom: 8px;
  }
  
  .agent-card__button {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .agent-card__button:hover {
    background-color: #45a049;
  }
  
  .no-requests {
    text-align: center;
    color: #999;
    font-style: italic;
  }
#travelAgentsContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.agent-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  max-width: 100%;
}

.agent-card h2 {
  margin-top: 0;
}

.agent-card p {
  margin-bottom: 8px;
}

.agent-card__actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.agent-card__button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.agent-card__button:hover {
  background-color: #45a049;
}

.agent-card__button--decline {
  background-color: #f44336;
}

.agent-card__button--decline:hover {
  background-color: #d32f2f;
} 
:root {
  --color-blue: #023c88;
  --color-blue-lighter-1: #00b3d6;
  --color-blue-lighter-2: #49cae4;
  --color-gray-light: #f9fafb;
  --color-gray-dark: #e9ecef;
  --section-padding: clamp(4rem, 10vw, 12rem) 0rem;
  --two-col-layout: 2;
  --three-col-layout: 3;
}
@media only screen and (max-width: 56.25em) {
  :root {
    --two-col-layout: 1;
  }
}
@media only screen and (max-width: 59em) {
  :root {
    --three-col-layout: 2;
  }
}
@media only screen and (max-width: 37.5em) {
  :root {
    --three-col-layout: 1;
  }
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
  scroll-behavior: smooth;
}

body {
  font-size: 1.6rem;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  line-height: 1.6;
}

.container {
  max-width: clamp(50rem, 85vw, 114rem);
  height: 100%;
  padding: 0 2.4rem;
  margin: 0 auto;
}

.section-about {
  padding: var(--section-padding);
}

.about-box {
  display: grid;
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(-webkit-min-content, 1fr)
  );
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(min-content, 1fr)
  );
  gap: 2rem;
}
.about-box__heading {
  padding: 4rem 0;
}
.about-box__content {
  padding: 4rem 2.4rem;
  background-color: rgba(73, 202, 228, 0.1);
}

.section-footer {
  background-color: var(--color-blue);
  padding: var(--section-padding);
}

.footer-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 4rem;
  color: #fff;
}

.contact-details .contact-data {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
}
.contact-details .contact-data .social {
  display: flex;
  gap: 0.5rem;
}
.contact-details .contact-data .social * {
  padding-right: 1rem;
}

.footer-nav .nav-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.footer-nav ul {
  display: flex;
  flex-direction: column;
}

.footer-nav ul li {
  list-style: none;
  padding: 1.5rem 0;
}

.footer-nav ul li a {
  text-decoration: none;
  color: #fff;
}
.footer-nav ul li a:hover {
  text-decoration: underline;
}

.newsletter__title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.newsletter__text {
  margin-bottom: 1.6rem;
}

.newsletter__input {
  position: relative;
}

.send-icon {
  padding: 0.9rem;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
}

.legel {
  grid-column: 1/-1;
  border-top: 2px solid #fff;
  padding: 1.5rem 0;
  text-align: center;
}
.legel .text {
  padding: 1rem 0;
}

.header {
  position: absolute;
  color: #fff;
  width: 100%;
  z-index: 100;
}
@media only screen and (max-width: 50em) {
  .header {
    background-color: var(--color-blue);
  }
}
.header .navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 1.2rem 0;
  border-bottom: 1px solid #fff;
}
.header .navigation ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-size: 1.7rem;
  font-weight: 700;
}
@media only screen and (max-width: 50em) {
  .header .navigation ul {
    display: none;
  }
}
.header .navigation ul li:not(:last-child) {
  padding: 0rem 2.5rem;
  transition: background-color 0.5s;
}
.header .navigation ul li:not(:last-child) a {
  color: #fff;
  text-decoration: none;
}
.header .navigation ul li:not(:last-child) a:hover {
  color: var(--color-blue-lighter-2);
}
.header .navigation .logo {
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 700;
}
.header .nav-icon {
  display: none;
  border: 1px solid #fff;
  padding: 0.1rem;
}
@media only screen and (max-width: 50em) {
  .header .nav-icon {
    display: block;
  }
}

.section-review {
  background-color: var(--color-gray-light);
  padding: var(--section-padding);
}

.review-header {
  text-align: center;
  margin-bottom: 10rem;
}

.review-cards {
  display: grid;
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(-webkit-min-content, 1fr)
  );
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(min-content, 1fr)
  );
  row-gap: 10rem;
  -moz-column-gap: 5rem;
  column-gap: 5rem;
  justify-items: center;
}

.r-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 40rem;
  padding: 0 2.4rem 2rem 2.4rem;
  position: relative;
}
.r-card > *:not(:last-child) {
  margin-bottom: 2.5rem;
}
.r-card:hover {
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
}
.r-card__img {
  max-width: 100%;
  border-radius: 50%;
  margin-top: -5rem;
}
.r-card__name {
  font-weight: 700;
}
.r-card__description {
  text-align: center;
}
.r-card__rating {
  display: flex;
  justify-content: center;
  align-items: center;
}

.quot {
  font-size: 7rem;
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-blue);
}

.section-tours {
  background-color: var(--color-gray-light);
  padding: var(--section-padding);
}

.tour-box__heading {
  text-align: center;
  margin-bottom: 4rem;
}

.tour-box__cards {
  display: grid;
  grid-template-columns: repeat(
    var(--three-col-layout),
    minmax(-webkit-min-content, 1fr)
  );
  grid-template-columns: repeat(
    var(--three-col-layout),
    minmax(min-content, 1fr)
  );
  gap: 3rem;
}

.t-card {
  background-color: #fff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #000;
}
.t-card:hover .t-card__img {
  filter: brightness(0.8);
}
.t-card__img {
  max-width: 100%;
  height: 250px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.t-card__content {
  padding: 2.5rem;
}
.t-card__content > *:not(:last-child) {
  margin-bottom: 1.5rem;
}
.t-card__title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
}
.t-card__description {
  text-align: center;
}
.t-card__items {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem;
}
.t-card__items > * {
  padding: 0.2rem 1rem;
  background-color: rgba(73, 202, 228, 0.7);
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.btn {
  text-transform: capitalize;
  padding: 1.3rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 400;
  background-color: var(--color-blue-lighter-2);
  color: #000;
  border: none;
  transition: background-color 0.4s;
  cursor: pointer;
}
.btn:hover {
  background-color: var(--color-blue-lighter-1);
}
.btn--drop-shadow {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
}
.btn--secondary {
  border: 1.5px solid var(--color-blue-lighter-2);
  background-color: transparent;
}

input[type='text'] {
  padding: 1.3rem 2.5rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1.6rem;
  background-color: #fff;
  color: #000;
  border: none;
  width: 100%;
}
input[type='text']:focus {
  outline: none;
}

.custom-date {
  position: relative;
  margin-top: 1rem;
}
.custom-date .calender-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 5rem;
  height: 100%;
  background-color: var(--color-gray-dark);
  border: 1px solid var(--color-blue-lighter-2);
  padding: 1rem;
  pointer-events: none;
}
.custom-date input[type='date'] {
  padding: 0.8rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  background-color: var(--color-gray-light);
  border: 1px solid var(--color-blue-lighter-2);
  cursor: pointer;
  line-height: inherit;
  outline: none;
  width: 100%;
}

.custom-select {
  position: relative;
  margin-top: 1rem;
}
.custom-select select {
  background-color: var(--color-gray-light);
  border: 1px solid var(--color-blue-lighter-2);
  padding: 1rem;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  outline: none;
}
.custom-select .arrow {
  background-color: var(--color-gray-dark);
  border: 1px solid var(--color-blue-lighter-2);
  width: 5rem;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
}
.custom-select .arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-top: 1rem solid var(--color-blue-lighter-2);
}

.heading {
  font-weight: 700;
  text-transform: uppercase;
}
.heading--1 {
  font-size: clamp(2.5rem, 4vw, 4rem);
}
.heading--2 {
  font-size: clamp(2rem, 4vw, 3rem);
}



.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 70ch;
  height: 100%;
}

.margin-right {
  margin-right: 2rem;
}

.margin-bottom {
  margin-bottom: 2rem;
}

.capitalize {
  text-transform: capitalize;
}

.color-blue {
  color: var(--color-blue-lighter-2);
}

.section-search {
  padding: 0 2.4rem;
}

.search-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 3rem;
  align-items: flex-end;
  padding: 5rem 2.4rem 6rem 2.4rem;
  border-radius: 5rem;
  background-color: var(--color-gray-light);
  margin-top: -5rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.search-box .btn {
  align-self: flex-end;
}

.section-offer {
  padding: var(--section-padding);
  background: url('https://thumbs.dreamstime.com/b/beach-background-beautiful-beach-landscape-tropical-nature-scene-palm-trees-blue-sky-summer-holiday-vacation-concept-93725354.jpg') fixed no-repeat center;
  background-size: cover;
  position: relative;
  color: #fff;
  z-index: 1;
}
.section-offer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(2, 60, 136, 0.5);
  z-index: -1;
}

.offer-box {
  display: grid;
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(-webkit-min-content, 1fr)
  );
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(min-content, 1fr)
  );
  gap: 5rem;
  justify-items: center;
  align-items: center;
}
.offer-box__percentage {
  font-size: clamp(10rem, 20vw, 15rem);
}
.offer-box__content {
  display: grid;
  gap: 2rem;
  justify-items: flex-start;
}
.gallery .box-container{
  display: flex;
  flex-wrap: wrap;
  gap:1.5rem;
}

.gallery .box-container .box{
  overflow: hidden;
  box-shadow: 0 1rem 2rem rgba(0,0,0,.1);
  border:1rem solid #fff;
  border-radius: .5rem;
  flex:1 1 30rem;
  height: 25rem;
  position: relative;
}

.gallery .box-container .box img{
  height: 100%;
  width:100%;
  object-fit: cover;
}

.gallery .box-container .box .content{
  position: absolute;
  top:-100%; left:0;
  height: 100%;
  width:100%;
  text-align: center;
  background:rgba(0,0,0,.7);
  padding:2rem;
  padding-top: 5rem;
}

.gallery .box-container .box:hover .content{
  top:0;
}

.gallery .box-container .box .content h3{
  font-size: 2.5rem;
  color:var(--blue);
}

.gallery .box-container .box .content p{
  font-size: 1.5rem;
  color:#eee;
  padding:.5rem 0;
}
.section-booking {
background-color: #f7f7f7;
padding: 50px 0;
}

.booking-box {
max-width: 600px;
margin: 0 auto;
}

.booking-box__content {
padding: 20px;
background-color: #ffffff;
border-radius: 5px;
}

.booking-box__content h2 {
font-size: 24px;
margin-bottom: 20px;
}

.form-group {
margin-bottom: 20px;
}

.form-group label {
display: block;
font-size: 16px;
font-weight: bold;
margin-bottom: 5px;
}

.form-group input[type="date"],
.form-group input[type="number"] {
width: 100%;
padding: 10px;
font-size: 16px;
border: 1px solid #cccccc;
border-radius: 5px;
}

.btn {
background-color: #007bff;
color: #ffffff;
padding: 10px 20px;
font-size: 16px;
border: none;
border-radius: 5px;
cursor: pointer;
}

.modal-header {
background-color: #007bff;
color: #ffffff;
font-size: 20px;
}

.modal-body,
.modal-footer {
padding: 20px;
}

.modal-footer .btn {
margin-right: 10px;
}

.modal-backdrop.show {
opacity: 0.5;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.card-container-img {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  height:400px
  
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card h2 {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 10px;
}

.card p {
  font-size: 16px;
  color: #333;
}

.card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card li {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.card .agency-list {
  margin-top: 10px;
}

.card .agency-list li:before {
  color: #007bff;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}



        `}
      </style>
    </div>
  );
}