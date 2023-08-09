import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink, PDFViewer, Page, Text, Document, View, StyleSheet } from '@react-pdf/renderer';

export default function Download() {
  const [bookingsWithPackages, setBookingsWithPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bookings data from the API
        const bookingsResponse = await axios.get('https://localhost:7132/api/Booking');
        // Fetch tour packages data from the API
        const packagesResponse = await axios.get('https://localhost:7087/api/TourPackage');

        const bookings = bookingsResponse.data;
        const packages = packagesResponse.data;

        // Match each booking with its associated package
        const bookingsWithPackagesData = bookings
          .map((booking) => {
            const associatedPackage = packages.find((pkg) => pkg.packageId === booking.packageId);
            return { booking, associatedPackage };
          })
          // Filter out bookings with no associated packages
          .filter((data) => data.associatedPackage)
          // Filter only bookings with isConfirmed equal to 1
          .filter((data) => data.booking.isConfirmed === 1);

        setBookingsWithPackages(bookingsWithPackagesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get the Confirmation status text
  const getConfirmationStatus = (isConfirmed) => {
    return isConfirmed ? 'Successful' : 'Pending'; 
  };

  const getItineraryPoints = (itineraryDetails) => {
    return itineraryDetails.split('.');
  };

  const formatDate = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };
  
  
const calculateTourCost = (booking) => {
  const { numberOfPeople, associatedPackage } = booking;
  if (!associatedPackage) {
    return 0; 
  }
  const { price } = associatedPackage;
  return numberOfPeople * price;
};

const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`https://localhost:7132/api/Booking/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle successful cancellation here, e.g., updating state or fetching data again.
        console.log(`Booking ${bookingId} canceled successfully.`);
      } else {
        // Handle error case here.
        console.error('Failed to cancel booking.');
      }
    } catch (error) {
      console.error('Error occurred while canceling booking:', error);
    }
  };
  

  const styles = StyleSheet.create({
    page: {
      padding: '1cm',
    },
    heading: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: '1cm',
    },
    section: {
      marginBottom: '1cm',
    },
    packageName: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    packageText: {
      fontSize: 10,
    },
    footer: {
      fontSize: 10,
      textAlign: 'center',
    },
  });

  const [itineraryDetails, setItineraryDetails] = useState('');
  const packageIdFromStorage = sessionStorage.getItem('PackageId');

  useEffect(() => {
    // Fetch TourPackages data
    axios.get(`https://localhost:7087/api/TourPackage/${packageIdFromStorage}`)
      .then(response => {
        const packageData = response.data;
        // Assuming the itinerary is an array with a single item
        if (packageData.itinerary && packageData.itinerary.length > 0) {
          setItineraryDetails(packageData.itinerary[0].itineraryDetails);
        }
      })
      .catch(error => {
        console.error('Error fetching tour package:', error);
      });
  }, [packageIdFromStorage]);

  const PDFDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Bon-Voyage</Text>

{/* Home */}
<View style={{ ...styles.section, justifyContent: 'center', alignItems: 'center' }}>
  <Text>Welcome to Bon-Voyage</Text>
  <Text>Unravel the World's Finest Destinations</Text>
</View>


{/* About */}
<View style={styles.section}>
  <Text style={{ ...styles.packageName, fontSize: 14 }}>About</Text>
  <Text style={{ fontSize: 12 }}>
    We are your gateway to extraordinary journeys, offering an exquisite array of destinations and unforgettable
    trips. Our dedicated team is committed to providing you with the finest travel experiences, tailored to your
    dreams and desires. Embark on a journey of a lifetime with us and let the adventure begin!
  </Text>
</View>

{bookingsWithPackages.map(({ booking, associatedPackage }) => (
  <View key={booking.bookingId} style={{ ...styles.card, marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '10px' }}>
    <Text style={{ ...styles.packageName, marginBottom: '5px' }}>Package Name: {associatedPackage.packageName}</Text>
    <Text style={{ marginBottom: '5px' }}>Booking Id: {booking.bookingId}</Text>
    <Text style={{ marginBottom: '5px' }}>Number of People: {booking.numberOfPeople}</Text>
    <Text style={{ marginBottom: '5px' }}>Booking Date: {formatDate(booking.bookingDate)}</Text>
    <Text>Booking-Confirmation: {getConfirmationStatus(booking.isConfirmed)}</Text>
    <img
      src={`https://localhost:7087/Uploads/${associatedPackage.image}`}
      alt={associatedPackage.packageName}
      className='img-fluid rounded'
      style={{ maxWidth: '200px' }} 
    />
  </View>
))}






<View style={{ marginBottom: '10px' }}>
  <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: '20px', marginBottom: '10px' }}>
    Itinerary Details
  </Text>
  <View>
    <ul>
      {getItineraryPoints(itineraryDetails)
        .filter((point) => point.trim() !== "")
        .map((point, index) => (
          <li key={index}>
            <Text style={{ fontSize: 10, marginLeft: '20px', lineHeight: 1.5 }}>{point}</Text>
          </li>
        ))}
    </ul>
  </View>
</View>


{/* Footer */}
<View style={styles.section}>
  <Text style={styles.footer}>Bon Voyage Travel © 2023. All rights reserved.</Text>
  <Text style={styles.footer}>Contact us: contact@bonvoyagetravel.com | Phone_Number: 9994163873</Text>
  <Text style={styles.footer}>Follow us on social media:</Text>
  {/* Add social media links here */}
</View>

      </Page>
    </Document>
  );

  return (
    <div style={{ marginTop: '8%' }} className="container">
  <h1>Confirmed Tours</h1>
  {loading ? (
    <p>Loading data...</p>
  ) : bookingsWithPackages.length > 0 ? (
    bookingsWithPackages.map(({ booking, associatedPackage }) => (
      <div key={booking.bookingId} className="card mb-4">
        <div className="row">
          <div className="col-md-5 offset-md-1">
            <div className="card-body">
              <h5 className="card-title">Package Name: {associatedPackage.packageName}</h5>
              <p className="card-text">Booking Id: {booking.bookingId}</p>
              <p className="card-text">Number of People: {booking.numberOfPeople}</p>
              <p className="card-text">Booking Date: {formatDate(booking.bookingDate)}</p>
              <p className="card-text">Booking-Confirmation: {getConfirmationStatus(booking.isConfirmed)}</p>
              <button className="btn btn-danger mt-2" onClick={() => handleCancelBooking(booking.bookingId)}>
                    Cancel Booking
                  </button>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <div className="row justify-content-end">
              <div className="col-md-3">
                <img
                  src={`https://localhost:7087/Uploads/${associatedPackage.image}`}
                  alt={associatedPackage.packageName}
                  className='img-fluid rounded'
                  style={{ maxWidth: '200px' }} // Adjust the value as per your requirement
                />
              </div>
            </div>
          </div>
        </div>
        <PDFDownloadLink document={<PDFDocument />} fileName="confirmed_bookings.pdf">
            {({ loading: pdfLoading }) => (pdfLoading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
          <PDFViewer style={{ width: '100%', height: '800px' }}>
            <PDFDocument />
          </PDFViewer>
      </div>
      
    ))
  ) : (
    <p>No confirmed tours found.</p>
  )}
</div>


  
  );
}