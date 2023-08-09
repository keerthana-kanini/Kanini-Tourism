import React, { useState, useEffect } from 'react';

const Admincard = () => {
    const [adminPosts, setAdminPosts] = useState([]);
    const token =localStorage.getItem('userToken');
  
    useEffect(() => {
      fetchAdminPosts();
    }, []);
  
    const fetchAdminPosts = async () => {
      try {
        const response = await fetch('https://localhost:7125/api/AdminPosts',{
            headers:{
                Authorization:`Bearer ${token}`
              }

        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAdminPosts(data);
      } catch (error) {
        console.error('Error fetching admin posts:', error);
      }
    };
  
    return (
      <div className="container">
       <h1>GALLERY IMAGES</h1>
        <div className="card-deck row">
          {adminPosts.map((post) => (
            <div key={post.id} className="col-xs-12 col-sm-6 col-md-4">
              <div className="card">
                <div className="view overlay">
                  <img className="card-img-top" src={`https://localhost:7125/uploads/images/${post.placeImagePath}`}  alt="Card image cap" />
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>
                <div className="card-body">
                  <h4 className="card-title">{post.place_name}</h4>
                  <p className="card-text">{/* Add content here */}</p>
                  {/* <button type="button" className="btn btn-light-blue btn-md">
                    Read more
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <style>
            {`
              .card{
                margin: 5% 0%;
              }
  
              .card-body{
                margin: 0% 0% 0% 3%;
                padding: 6% 0%;
              }
            `}
          </style>
        </div>
      </div>
    );
  };
  
  export default Admincard;
  
