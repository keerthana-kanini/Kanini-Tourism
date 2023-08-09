import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FeedBack() {
  const [rating, setRating] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleTextareaChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('https://localhost:7125/api/FeedBacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedBack_area: feedbackText,
          feedBack_rating: rating,
          user: {
            user_Id: 1, // Replace with the actual user ID
          },
          agency: {
            agency_Id: 1,
          },
        }),
      });
      
      if (response.ok) {
        setShowPost(true);
        toast.success('Feedback submitted successfully!', {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        console.error('Failed to post feedback:', response);
      }
    } catch (error) {
      console.error('Error while posting feedback:', error);
    }
  };

  const handleEditClick = () => {
    setShowPost(false);
  };

  return (
    <div>
      <div className="container">
        <div className={`post${showPost ? ' show' : ''}`}>
          <div className="text">Thanks for rating us!</div>
          <div className="edit" onClick={handleEditClick}>EDIT</div>
        </div>
        <div className={`star-widget${showPost ? ' hide' : ''}`}>
          <input type="radio" name="rate" id="rate-5" value="5" onChange={handleRatingChange} />
          <label htmlFor="rate-5" className="bi bi-star-fill"></label>
          <input type="radio" name="rate" id="rate-4" value="4" onChange={handleRatingChange} />
          <label htmlFor="rate-4" className="bi bi-star-fill"></label>
          <input type="radio" name="rate" id="rate-3" value="3" onChange={handleRatingChange} />
          <label htmlFor="rate-3" className="bi bi-star-fill"></label>
          <input type="radio" name="rate" id="rate-2" value="2" onChange={handleRatingChange} />
          <label htmlFor="rate-2" className="bi bi-star-fill"></label>
          <input type="radio" name="rate" id="rate-1" value="1" onChange={handleRatingChange} />
          <label htmlFor="rate-1" className="bi bi-star-fill"></label>
          <form onSubmit={handleSubmit}>
            <header></header>
            <div className="textarea">
              <textarea 
                cols="30" 
                placeholder="Describe your experience.."
                value={feedbackText}
                onChange={handleTextareaChange}
              />
            </div>
            <div className="btn">
              <button type="submit">Post</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <div>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
          *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }
          html,body{
            display: grid;
            height: 100%;
            place-items: center;
            text-align: center;
          }
          .container{
            position: relative;
            width: 400px;
            background: #111;
            padding: 20px 30px;
            border: 1px solid #444;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          .container .post{
            display: none;
          }
          .container .text{
            font-size: 25px;
            color: #666;
            font-weight: 500;
          }
          .container .edit{
            position: absolute;
            right: 10px;
            top: 5px;
            font-size: 16px;
            color: #666;
            font-weight: 500;
            cursor: pointer;
          }
          .container .edit:hover{
            text-decoration: underline;
          }
          .container .star-widget input{
            display: none;
          }
          .star-widget label{
            font-size: 40px;
            color: #444;
            padding: 10px;
            float: right;
            transition: all 0.2s ease;
          }
          input:not(:checked) ~ label:hover,
          input:not(:checked) ~ label:hover ~ label{
            color: #fd4;
          }
          input:checked ~ label{
            color: #fd4;
          }
          input#rate-5:checked ~ label{
            color: #fe7;
            text-shadow: 0 0 20px #952;
          }
          #rate-1:checked ~ form header:before{
            content: "I just hate it ";
          }
          #rate-2:checked ~ form header:before{
            content: "I don't like it ";
          }
          #rate-3:checked ~ form header:before{
            content: "It is awesome ";
          }
          #rate-4:checked ~ form header:before{
            content: "I just like it ";
          }
          #rate-5:checked ~ form header:before{
            content: "I just love it ";
          }
          .container form{
            display: none;
          }
          input:checked ~ form{
            display: block;
          }
          form header{
            width: 100%;
            font-size: 25px;
            color: #fe7;
            font-weight: 500;
            margin: 5px 0 20px 0;
            text-align: center;
            transition: all 0.2s ease;
          }
          form .textarea{
            height: 100px;
            width: 100%;
            overflow: hidden;
          }
          form .textarea textarea{
            height: 100%;
            width: 100%;
            outline: none;
            color: #eee;
            border: 1px solid #333;
            background: #222;
            padding: 10px;
            font-size: 17px;
            resize: none;
          }
          .textarea textarea:focus{
            border-color: #444;
          }
          form .btn{
            height: 45px;
            width: 100%;
            margin: 15px 0;
          }
          form .btn button{
            height: 100%;
            width: 100%;
            border: 1px solid #444;
            outline: none;
            background: #222;
            color: #999;
            font-size: 17px;
            font-weight: 500;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          form .btn button:hover{
            background: #1b1b1b;
          }
          `}
        </style>
      </div>
    </div>
  );
}