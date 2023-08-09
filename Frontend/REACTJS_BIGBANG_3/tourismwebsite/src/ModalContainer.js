import React from 'react';
import { useNavigate } from 'react-router-dom';
import tick from '../src/tick.jpg';
export default function ModalContainer() {
  const navigate = useNavigate();

  const handleDoneClick = () => {
    navigate('/feedback');
  };


  return (
    <body>
      
      <div className="modal-container">
        <div className="popup">
          <img src={tick} alt="Success" className="img" />
          <h2 className="ss">Booking submitted successfully.</h2>
          <button className="but" onClick={handleDoneClick}>
            Done
          </button>
        </div>
      </div>
      <style>
        {`
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f2f2f2;
          }

          .popup {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #fff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .ss {
            font-family: Manrope;
            font-size: 25px;
            font-weight: 600;
            line-height: 31px;
            letter-spacing: 0em;
            text-align: center;
          }

          .Result {
            font-family: Manrope;
            font-size: 18px;
            font-weight: 600;
            line-height: 25px;
            margin-top: 6px;
            letter-spacing: 0em;
            text-align: center;
          }

          .but {
            background: #84CAFF;
            height: 50px;
            width: 200px;
            margin-top: 20px;
            border-radius: 5px;
            border: 1px solid white;
          }

          .img {
            width: 116px;
            height: 116px;
            margin-bottom: 20px;
          }
        `}
      </style>
    </body>
  );
}


