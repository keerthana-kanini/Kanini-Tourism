import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { variables } from './Variable';

const Card = ({ imageSrc1, imageSrc2, title, text, onClick }) => {
  return (
    <li className="cards_item" onClick={onClick}>
      <div className="card">
        <div className="card_images">
          <div className="card_image">
            <img src={imageSrc1} alt="" />
          </div>
          <div className="card_image">
            <img src={imageSrc2} alt="" />
          </div>
        </div>
        <div className="card_content">
          <h2 className="card_title">{title}</h2>
          <p className="card_text">{text}</p>
          <a href="/booking"><button className="btn">BOOK</button></a> 
        </div>
      </div>
    </li>
  );
};


const AccomId = () => {
  const { agencyId } = useParams();
  const [cardsData, setCardsData] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null); // Add the missing useState hook

  useEffect(() => {
    fetch(`${variables.API_URL}Accommodation/ByAgency/${agencyId}`)
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((item) => ({
          id: item.accommodationDetailId,
          imageSrc1: `https://localhost:7125/uploads/images/${item.hotelImagePath}`,
          imageSrc2: `https://localhost:7125/uploads/images/${item.placeImagePath}`,
          title: item.hotel_Name,
          text: `${item.food} - ${item.place}`,
        }));
        setCardsData(processedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [agencyId]);

  const fetchAccommodationDetails = (accommodationId) => {
    fetch(`${variables.API_URL}Accommodation/${accommodationId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedAccommodation(data); // Set the selected accommodation using the setSelectedAccommodation function
      })
      .catch((error) => {
        console.error('Error fetching accommodation details:', error);
      });
  };

  return (
    <div className="main">
      <h1>ACCOMMODATION</h1>
      <ul className="cards">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            imageSrc1={card.imageSrc1}
            imageSrc2={card.imageSrc2}
            title={card.title}
            text={card.text}
            onClick={() => fetchAccommodationDetails(card.id)}
          />
        ))}
      </ul>
      {/* <h3 className="made_by">Made with ♡</h3> */}
      <style>
        {`
          /* Font */
          @import url('https://fonts.googleapis.com/css?family=Quicksand:400,700');
          
          /* Design */
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          
          html {
            background-color: #ecf9ff;
          }
          
          body {
            color: #272727;
            font-family: 'Quicksand', serif;
            font-style: normal;
            font-weight: 400;
            letter-spacing: 0;
            padding: 1rem;
          }
          
          .main{
            max-width: 1200px;
            margin: 0 auto;
          }
          
          h1 {
              font-size: 24px;
              font-weight: 400;
              text-align: center;
          }
          
          img {
            height: auto;
            max-width: 100%;
            vertical-align: middle;
          }
          
          .btn {
            color: #212529;
            padding: 0.8rem;
            font-size: 14px;
            text-transform: uppercase;
            border-radius: 50px;
            font-weight: 400;
            display: block;
            width: 100%;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: #fdeaec;
          }
          
          .btn:hover {
            background-color: rgba(255, 255, 255, 0.12);
          }
          
          .cards {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          
          .cards_item {
            display: flex;
            padding: 1rem;
          }
          
          @media (min-width: 40rem) {
            .cards_item {
              width: 50%;
            }
          }
          
          @media (min-width: 56rem) {
            .cards_item {
              width: 33.3333%;
            }
          }
          
          .card {
            background-color: white;
            border-radius: 0.25rem;
            box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            
          }
          
          .card_content {
            display: flex;
            flex-direction: column;
            justify-content: space-between; /* Aligns the title and text at the top, and button at the bottom */
            height: 100%; /* Take up the entire height of the card */
            padding: 1rem;
            background: linear-gradient(to bottom left, #EF8D9C 40%, #FFC39E 100%);
          }
          
          .card_title {
            color: #ffffff;
            font-size: 1.1rem;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: capitalize;
            margin: 0px;
          }
          
          .card_text {
            color: #ffffff;
            font-size: 0.875rem;
            line-height: 1.5;
            margin-bottom: 1.25rem;
            font-weight: 400;
          }
          
          .card_btn {
            margin-top: auto; /* Push the button to the bottom of the card_content div */
            color: #ffffff;
            padding: 0.8rem;
            font-size: 14px;
            text-transform: uppercase;
            border-radius: 4px;
            font-weight: 400;
            width: 100%;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: transparent;
          }
          
          .card_btn:hover {
            background-color: rgba(255, 255, 255, 0.12);
          }
          
          .made_by{
            font-weight: 400;
            font-size: 13px;
            margin-top: 35px;
            text-align: center;
          }
          .card_images {
            display: flex;
          }
          
          .card_image {
            flex: 1;
            height: 200px; /* Set the desired fixed height for the container */
            margin: 5px;
            overflow: hidden; /* Hide any overflowing content */
          }
          
          .card_image img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Make the images fill the container without stretching */
          }
          .card {
            height: 400px; /* Set the desired fixed height for the cards */
          }
          
          
          
        `}
      </style>
    </div>
  );
};

export default AccomId;