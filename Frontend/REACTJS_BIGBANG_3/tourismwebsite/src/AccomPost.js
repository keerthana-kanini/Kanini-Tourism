import React, {useState} from 'react';

import axios from 'axios'

const AccomPost = () => {
    const [placeImagePath, setPlaceImg] = useState(null);
    const [HotelImagePath, setHotelImagePath] = useState(null);
    const [hotel_Name, setHotelName] = useState('');
    const [food, setHotelFood] = useState('');
    const [place, setHotelPlace] = useState('');
    const [isFormActive, setIsFormActive] = useState(false);
  
    const handleHotelNameChange = (e) => {
      setHotelName(e.target.value);
    };
    const handleFoodChange = (e) => {
      setHotelFood(e.target.value);
    };
    const handlePlaceChange = (e) => {
      setHotelPlace(e.target.value);
    };
    const handlePlaceImageChange = (e) => {
      setPlaceImg(e.target.files[0]);
    };
    const handleHotelImageChange = (e) => {
      setHotelImagePath(e.target.files[0]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Create a new FormData object
      const postData = new FormData();
      postData.append('hotel_Name', hotel_Name);
      postData.append('food', food);
      postData.append('place', place);
      postData.append('placeImageFile', placeImagePath);
      postData.append('hotelImageFile', HotelImagePath);
      postData.append('agency.Agency_Id', '6');
  
      // Send the POST request using Axios
      axios
        .post('https://localhost:7125/api/Accommodation', postData, {
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
  
    const handleNextClick = () => {
      const allInput = document.querySelectorAll('.first input');
      let isAnyInputFilled = false;
  
      allInput.forEach((input) => {
        if (input.value !== '') {
          isAnyInputFilled = true;
        }
      });
      setIsFormActive(isAnyInputFilled);
    };
  
    return (
      <div>
        <div className={`container${isFormActive ? ' secActive' : ''}`}>
          <header>Accommodation</header>
  
          <form action="#">
            {/* Form: Personal Details */}
            <div className="form first">
              <div className="details personal">
                <span className="title">Personal Details</span>
  
                <div className="fields">
                  <div className="input-field">
                    <label>Hotel Name</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={hotel_Name}
                      onChange={handleHotelNameChange}
                      required
                    />
                  </div>
  
                  <div className="input-field">
                    <label>Choose Hotel File</label>
                    <input
                      type="file"
                      placeholder="Enter name"
                      onChange={handleHotelImageChange}
                      name="hotelImagePath"
                      required
                    />
                  </div>
  
                  <div className="input-field">
                    <label>Hotel Food</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={food}
                      onChange={handleFoodChange}
                      required
                    />
                  </div>
  
                  <div className="input-field">
                    <label>Place Name</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={place}
                      onChange={handlePlaceChange}
                      required
                    />
                  </div>
  
                  <div className="input-field">
                    <label>Choose Place File</label>
                    <input
                      type="file"
                      placeholder="Enter name"
                      onChange={handlePlaceImageChange}
                      name="placeImage"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
  
            {/* Form: Identity Details */}
            <div className="details ID">
              <span className="title">Identity Details</span>
            </div>
  
            <button className="nextBtn" onClick={handleSubmit}>
              <span className="btnText">Submit</span>
              <i className="uil uil-navigator"></i>
            </button>
          </form>
        </div>
    <style>
        {`
          .container {
            max-width: 751px;
            margin: 0 auto;
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }

          header {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
            color: #007bff;
          }

          .form {
            margin-bottom: 20px;
          }

          .details {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 10px;
            background-color: #fff;
          }

          .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
          }

          .fields {
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(2, 1fr);
          }

          .input-field {
            display: flex;
            flex-direction: column;
          }

          .input-field label {
            margin-bottom: 5px;
            color: #007bff;
          }

          .input-field input[type='text'],
          .input-field input[type='file'] {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
          }

          .nextBtn {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            transition: background-color 0.3s ease;
          }

          .nextBtn .btnText {
            margin-right: 10px;
          }

          .nextBtn:hover {
            background-color: #0056b3;
          }

          .secActive .ID {
            display: block;
          }

          .ID {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default AccomPost;