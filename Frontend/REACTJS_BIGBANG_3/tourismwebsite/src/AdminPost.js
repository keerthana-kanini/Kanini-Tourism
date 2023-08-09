import React, { useEffect, useState } from 'react';
import { Card, CardGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './AdminPost.css';
import { variables } from './Variable';

const AdminPost = () => {
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

export default AdminPost;
