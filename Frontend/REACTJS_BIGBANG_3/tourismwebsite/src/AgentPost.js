import React, { useState } from 'react';
import axios from 'axios';


export default function AgentPost() {
    const [formData, setFormData] = useState({
      agency_Name: '',
      agency_Contact: '',
      number_Of_Days: '',
      rate_for_day: '',
      offer_For_Day: '',
      tour_place: '',
    });
  
    const [tourImagePath, setTourImagePath] = useState('');
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'place.placeId') {
            setFormData((prevData) => ({
                ...prevData,
                place: {
                    ...prevData.place,
                    placeId: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            imageFile: file,
        }));
        console.log(file); // Add this line to check the selected file in the console
    };

  
    const handleSubmit = (e) => {
        e.preventDefault();
      
        // Create a new FormData object
        const postData = new FormData();
        postData.append('agency_Name', formData.agency_Name);
        postData.append('agency_Contact', formData.agency_Contact);
        postData.append('number_Of_Days', formData.number_Of_Days);
        postData.append('rate_for_day', formData.rate_for_day);
        postData.append('offer_For_Day', formData.offer_For_Day);
        postData.append('tour_place', formData.tour_place);
      
        // Append the image file as an IFormFile
        postData.append('imageFile', formData.imageFile);
      
        // Set agentRegister and adminPost properties
        postData.append('agentRegister.agent_Id', '1');
        postData.append('adminPost.id', '1');
      
        // Send the POST request using Axios
        axios
          .post('https://localhost:7125/api/Agency', postData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the appropriate content type
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
      

  return (
    <div>
      <section className="h-100 h-custom" style={{ backgroundColor: '#c98d93' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img
                  src="https://media.radissonhotels.net/image/destination-pages/localattraction/16256-118729-f63250959_3xl.jpg?impolicy=HighCarrousel"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: '.3rem',
                    borderTopRightRadius: '19.3rem',
                  }}
                  alt="Sample photo"
                />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                   Agency Registration 
                  </h3>

                  <form className="px-md-2" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="agency_Name"
                        name="agency_Name"
                        className="form-control"
                        value={formData.agency_Name}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="agency_Name">
                        Agency Name
                      </label>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="agency_Contact"
                            name="agency_Contact"
                            className="form-control"
                            value={formData.agency_Contact}
                            onChange={handleChange}
                          />
                          <label
                            className="form-label"
                            htmlFor="agency_Contact"
                          >
                            Agency Contact Number
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="rate_for_day"
                            name="rate_for_day"
                            className="form-control"
                            value={formData.rate_for_day}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="rate_for_day">
                            Price Of The Package
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="number_Of_Days"
                            name="number_Of_Days"
                            className="form-control"
                            value={formData.number_Of_Days}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="number_Of_Days">
                            Number Of Days
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <input
                        type="file"
                        className="form-control"
                        name='tourImagePath'
                        id="imageUpload"
                        onChange={handleImageChange}
                      />
                      <label className="form-label" htmlFor="imageUpload">
                        Upload the Image Here
                      </label>
                    </div>

                    <div className="row mb-4 pb-2 pb-md-0 mb-md-5">
                      <div className="col-md-6">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="tour_place"
                            name="tour_place"
                            className="form-control"
                            value={formData.tour_place}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="tour_place">
                            Place Name
                          </label>
                        </div>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="offer_For_Day"
                            name="offer_For_Day"
                            className="form-control"
                            value={formData.offer_For_Day}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="offer_For_Day">
                            Offer Price
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-info btn-lg mb-1"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}