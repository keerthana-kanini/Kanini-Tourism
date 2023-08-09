import React, { useState } from 'react';
import axios from 'axios';



export default function GalleryPost() {
    const [place_name, setPlaceName] = useState('');
    const [imageFile, setPlaceImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
  
    const handlePlaceNameChange = (e) => {
      setPlaceName(e.target.value);
    };
  
    const handlePlaceImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setPlaceImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const postData = new FormData();
      postData.append('place_name', place_name);
      postData.append('imageFile', imageFile);
      postData.append('adminRegister.admin_Id', '1');
  
      axios
        .post('https://localhost:7125/api/AdminPosts', postData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('Data successfully posted:', response.data);
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
    };
  
    const colors = {
      primary: '#007bff', // Blue
      secondary: '#6c757d', // Gray
      success: '#28a745', // Green
      error: '#dc3545', // Red
      white: '#fff',
    };

  return (
    <div className="admin-post-container">
      <div className="image-container">
        {previewImage ? (
          <img src={previewImage} alt="Sample" />
        ) : (
          <div className="no-image">No image selected</div>
        )}
      </div>
      <form className="input-container">
        <div className="form-group">
          <label htmlFor="place1">Place:</label>
          <input
            type="text"
            id="place1"
            name="place"
            placeholder="Enter your place"
            value={place_name}
            onChange={handlePlaceNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Place Image:</label>
          <div className="file-input">
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={handlePlaceImageChange}
            />
            <label htmlFor="avatar" className="custom-file-upload">
              Select Image
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>
          Upload
        </button>
      </form>
    <style>
        {`
    
     .card-layout {
       display: flex;
       flex-wrap: wrap; 
       justify-content: space-between;
       gap: 20px; 
     }
     
    
     .card {
       flex: 1;
       max-width: 300px;
       margin: 10px;
     }
     
        .admin-post-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
          }
          
          .image-container {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 1rem;
            border: 3px solid ${colors.primary};
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
            position: relative;
          }

          .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .no-image {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1rem;
            color: ${colors.secondary};
          }

          
          .input-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 400px;
          }
          
          .form-group {
            width: 100%;
            margin-bottom: 1rem;
          }
          
          .form-group label {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: #333;
          }
          
          .form-group input {
            padding: 0.8rem 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 100%;
          }
          
          .custom-file-upload {
            padding: 0.8rem 1rem;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
          }
          
          .custom-file-upload:hover {
            background-color: #45a049;
          }
          
          .form-group .file-input {
            position: relative;
          }
          
          .form-group .file-input label {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 0.8rem 1rem;
            background-color:#d355ff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            text-align: center;
          }
          
          .form-group .file-input input[type="file"] {
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          
          .btn-primary {
            background-color: #225150;
            color: #fff;
            padding: 0.8rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
          }
          
          .btn-primary:hover {
            background-color: #0056b3;
          }
          `}
    </style>
  </div>
  );
}