import React, { useState, useEffect } from 'react';
import './Sample.css';
import { variables } from '../Variable';

const Sample = () => {
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    const fetchAdminPosts = async () => {
      try {
        const response = await fetch(`${variables.API_URL}AdminPosts`);
        const data = await response.json();
        setAdminPosts(data);
      } catch (error) {
        console.error('Error fetching admin posts:', error);
      }
    };

    fetchAdminPosts();
  }, []);

  return (
    <div className="container d-flex flex-wrap justify-content-between">
      {adminPosts.map((post) => (
        <div key={post.id} className="card p-2 my-4" style={{ width: '30%', margin: '10px' }}>
          <img src={`https://localhost:7125/uploads/images/${post.placeImagePath}`} height="560" alt={post.place_name} style={{ height: "400px" }} />
          <div className="text-white">
            <p>{post.place_name}</p>
          </div>
          {/* Add other elements you want to display for each admin post */}
          {/* For example: */}
          <div className="text-muted">
            <p>{post.description}</p>
          </div>
          <button type="button" className="btn btn-primary mt-3 mb-1">
            <span>Get started</span>
          </button>
        </div>
      ))}
      <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
          body{
              background-color: #C1C7D7;
              font-family: 'Poppins', sans-serif;
          }
          .card{
              width: 340px;
              height: 500px;
              border: none;
              border-radius: 12px;
              position: relative;
          }
          
          img{
              border-radius: 12px;
          }
          div.text-white{
              position: absolute;
              top: 55%;
              left: 10%;
              right: 10%;
              font-size: 28px;
          }
          div.text-muted{
              position: absolute;
              top: 70%;
              left: 10%;
              right: 12%;
              font-size: 14px;
              color: #adb5bd!important;
          }
          div.justify-content-between{
              position: absolute;
              top: 79%;
              left: 10%;
              right: 10%;
          }
          .justify-content-between span{
              padding-right: 10px;
          }
          .justify-content-between hr{
              border-top: 2px solid #adb5bd;
              width: 70px;
          }
          .justify-content-between hr:hover{
              border-top: 2px solid #fff;
              cursor: pointer;
          }
          hr.first{
              border-top: 2px solid #fff;
          }
          .btn-primary{
              background: #616BCC;
              border: none;
              border-radius: 7px;
              padding: 15px;
          }
          .btn-primary:hover{
              background: #616BCC;
          }
          .btn-primary:focus{
              box-shadow: none;
          }
          @media screen and (max-width: 384px){
              div.text-white{
                  position: absolute;
                  top: 50%;
                  line-height: 30px;
          }
          div.text-muted{
              top: 65%;
          }
          .justify-content-between hr{
              width: 40px;
          }
          }
        `}
      </style>
      </div>
    </div>
  );
};

export default Sample;
