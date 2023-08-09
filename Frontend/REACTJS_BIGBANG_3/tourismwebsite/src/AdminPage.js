import React, { useEffect, useState } from 'react';
import { Card, CardGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './AdminPage.css';
import { variables } from './Variable';

const CustomCard = () => {
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(variables.API_URL + 'AdminPosts')
      .then(response => {
        // Set the fetched data in the state
        setAdminPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Row>
        <style>
        {`
          .feature .card-container .card {
            height: 45rem;
            width: 30rem;
            margin: 2rem 1rem;
            position: relative;
            overflow: hidden;
          }
          
          .feature .card-container .card img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
          
          .feature .card-container .card .info {
            height: 100%;
            width: 100%;
            position: absolute;
            bottom: -100%; /* Move the info to hide it initially */
            left: 0;
            background: linear-gradient(transparent, #000);
            padding: 0 2rem;
            padding-top: 85%;
            transition: bottom 0.3s; /* Add the transition property for smooth animation */
          }
          
          .feature .card-container .card:hover .info {
            bottom: 0%; /* Move the info up to show on hover */
          }
          
          .feature .card-container .card .info h3 {
            font-size: 3rem;
            color: #fff;
          }
          
          .feature .card-container .card .info .stars i {
            font-size: 1.5rem;
            color: var(--red);
            padding: 1rem 0;
          }
          
          .feature .card-container .card .info p {
            font-size: 1.5rem;
            color: #eee;
          }
          
          .feature .card-container .card .info .btn {
            box-shadow: none;
          }
lk          
        `}
      </style>
      {adminPosts.map(post => (
        <Col key={post.id} xs={12} md={4} className="custom-card-col">
          <Card className="custom-card">
            <Card.Img
              variant="top"
              src={`https://localhost:7125/uploads/images/${post.placeImagePath}`}
              alt={post.place_name}
              className="custom-card-image"
            />
            <Card.Body>
              <Card.Title>{post.place_name}</Card.Title>
              <Card.Text>{/* Add any additional data you want to display from the API */}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
      ))}
    </Row>
  );
};

export default CustomCard;
