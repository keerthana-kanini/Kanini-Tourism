import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';



export default function BookingPage() {
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [bookingDate, setBookingDate] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [offerForDay, setOfferForDay] = useState('$0.0');
  const [rateForDay, setRateForDay] = useState('$186.86');
  const agencystoredId = localStorage.getItem('selectedAgentId');
  const userstoredId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const generatePaymentPDF = () => {
    const doc = new jsPDF();
    doc.text('Payment Receipt', 15, 15);

    const tableData = [
        ['Description', 'Amount'],
        ['User Name', 'Karan'],
        ['Tour Package', 'Summer Getaway'],
        ['Rate For Day', rateForDay],
        ['Offer For Day', `${offerForDay}%`],
        ['No of Person', paymentDetails?.no_of_perons || '$0.0'],
        ['No of Children', paymentDetails?.no_of_childer || '$00.00'],
        ['Amount For Person', paymentDetails?.amount_for_person || '$00.00'],
        ['Amount For Children', paymentDetails?.amount_for_childer || '$00.00'],
        ['Date of Booking', paymentDetails?.customer_Date_Of_Booking || 'N/A'],
        ['User Balance', '$6000'],
        ['Total', paymentDetails?.booking_amount || '$00.00'],
    ];

    doc.autoTable({
        head: [['Description', 'Amount']],
        body: tableData.slice(1), 
        startY: 30, 
    });

    doc.save('payment_receipt.pdf');
   
  };


  useEffect(() => {
    // Fetch offer_For_Day and rate_for_day from the API
    
    fetch(`https://localhost:7125/api/Agency/${agencystoredId}`)
      .then((response) => response.json())
      .then((data) => {
        setOfferForDay(data.offer_For_Day);
        setRateForDay(data.rate_for_day);
      })
      .catch((error) => console.error('Error while fetching agency data:', error));
  }, []);

  const handleNumberOfPersonsChange = (event) => {
    const value = Number(event.target.value);
    setNumberOfPersons(value > 4 ? 4 : value);
  };

  const handleNumberOfChildrenChange = (event) => {
    const value = Number(event.target.value);
    setNumberOfChildren(value > 4 ? 4 : value);
  };

  const handleBookingDateChange = (date) => {
    setBookingDate(date);
  };

  const handleProceedToPayment = async () => {
    try {
      const response = await fetch('https://localhost:7125/api/Bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_Date_Of_Booking: bookingDate,
          no_of_perons: numberOfPersons,
          no_of_childer: numberOfChildren,
          user: {
            user_Id: userstoredId, // Replace with the actual user ID
          },
          agency: {
            agency_Id: agencystoredId, // Replace with the actual agency ID
          },
        }),
      });
      const data = await response.json();
      console.log('Payment Details:', data); // Log the payment details to the console
      setPaymentDetails(data);
      setPaymentDone(true);
    } catch (error) {
      console.error('Error while making API request:', error);
    }
    if (paymentDone) {
      navigate('/Success');
    } else {
      console.log('Payment is not done yet.');
    }
  };
  
  const [paymentDone, setPaymentDone] = useState(false);

  return (
    <div className="booking-page-container">
    <section className="booking-section">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div className="d-flex flex-row align-items-center">
            <h4 className="text-uppercase mt-1">TOUR PACKAGE BOOKING</h4>
          </div>
          <a href="/home">Cancel and return to the website</a>
        </div>

        <div className="row">
          <div className="col-md-7 col-lg-7 col-xl-6 mb-4 mb-md-0">
            <div className="d-flex justify-content-between">
              <div className="flex-fill me-2">
                <label htmlFor="numberOfPersons" className="form-label">Number of Persons (Max 4):</label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfPersons"
                  min="1"
                  max="4"
                  value={numberOfPersons}
                  onChange={handleNumberOfPersonsChange}
                />
              </div>
              <div className="flex-fill ms-2">
                <label htmlFor="numberOfPersonsRight" className="form-label">Number of children (Max 4):</label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfPersonsRight"
                  min="1"
                  max="4"
                  value={numberOfChildren}
                  onChange={handleNumberOfChildrenChange}
                />
              </div>
            </div>
            <div className="p-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#eee' }}>
              <span>Booking Date</span>
              <DatePicker
                selected={bookingDate}
                onChange={handleBookingDateChange}
                placeholderText="Select booking date"
                className="form-control"
              />
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row mt-1">
                <h6>USER BALANCE</h6>
                <h6 className="fw-bold text-success ms-1">$6000</h6>
              </div>
              <div className="d-flex flex-row align-items-center text-primary">
                <span className="ms-1">Add Payment card</span>
              </div>
            </div>
            <p>
             SELECT PAYMENT METHOD
            </p>
            <div className="d-flex flex-column mb-3">
              <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" />
                <label className="btn btn-outline-primary btn-lg" htmlFor="option1">
                  <div className="d-flex justify-content-between">
                    <span>VISA</span>
                    <span>** 5436</span>
                  </div>
                </label>

                <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" checked />
                <label className="btn btn-outline-primary btn-lg" htmlFor="option2">
                  <div className="d-flex justify-content-between">
                    <span>MASTER CARD</span>
                    <span>** 5038</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="btn btn-success btn-lg btn-block" onClick={handleProceedToPayment}>
              Proceed to payment
            </div>
          </div>
          <div className="col-md-5 col-lg-4 col-xl-4 offset-lg-1 offset-xl-2">
            <div className="p-3" style={{ backgroundColor: '#eee' }}>
              <span className="fw-bold">Booking Details</span>
              <div className="d-flex justify-content-between mt-2">
                <span>Tour Packages Price</span> <span>{rateForDay}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Offer</span> <span>{offerForDay}%</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>No of Person</span> <span>{paymentDetails?.no_of_perons || '$0.0'}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>No of Children</span> <span>{paymentDetails?.no_of_childer || '$00.00'}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mt-2">
                <span className="lh-sm">Amount For Person<br /></span>
                <span>{paymentDetails?.amount_for_person || '$00.00'}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span className="lh-sm">Amount For Children <br /></span>
                <span>{paymentDetails?.amount_for_childer || '$00.00'}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mt-2">
                <span>Date of Booking</span> <span>{paymentDetails?.customer_Date_Of_Booking || 'N/A'}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>User Balance</span> <span>$6000</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mt-2">
                <span>Total</span> <span className="text-success">{paymentDetails?.booking_amount || '$00.00'}</span>
              </div>
            </div>
            <div className="btn btn-success btn-lg btn-block" onClick={handleProceedToPayment}>
        Pay the payment
      </div><br></br><br></br>
      <div className="btn btn-info btn-lg btn-block" onClick={generatePaymentPDF}>
        Download Pdf
      </div>
      
          </div>
        </div>
      </section>
      <style>
        {`
       .booking-page-container {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f8f8f8;
        color: #333;
      }
      
      .booking-section {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      
      /* Update the styling of the form elements */
      .form-label {
        font-weight: bold;
      }
      
      .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      /* Style the buttons */
      .btn {
        cursor: pointer;
        border-radius: 5px;
        padding: 10px;
        font-weight: bold;
      }
      
      .btn-success {
        background-color: #28a745;
        color: white;
      }
      
      /* Style the table */
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      
      th, td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
        text-align: left;
      }
      
      th {
        background-color: #f2f2f2;
      }
      
      /* Additional customizations based on your preferences */
      /* Feel free to add more styles here */
      
        `}
      </style>
    </div>
  );
}