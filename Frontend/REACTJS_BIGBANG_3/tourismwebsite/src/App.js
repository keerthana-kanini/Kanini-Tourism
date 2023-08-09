import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Home';
import UserLogin from './UserLogin';
import Accom from './Accom';
import AgencyPage from './Agencypage';
import Main from './Agencypage';
import CustomCard from './AdminPage';
import Sample from './sample/Sample';
import AdminSignin from './AdminSignin';
import AgencyReg from './AgencyReg';
import Approve from './Approve';
import FeedBack from './Feedback';
import Header from './Navbar';
import AgentPage from './AgentPage';
import AgentPost from './AgentPost';
import Navbar from './Header';
import TourPac from './TourPac';
import AccomPost from './AccomPost';
import GalleryPost from './GalleryPost';
import Accomfilter from './Accomfilter';
import AccomId from './AccomId';
import BookingPage from './BookingPage';
import Admincard from './Admincard';
import Download from './Download';
import ModalContainer from './ModalContainer';
import Success from './sample/Success';


function App() {
  const agencyId = [1, 2,4,6];
  const isuserauthincated=()=>{
    const token =localStorage.getItem('userToken');
    if(token){
      return true;
    }
    return false;
  }
  return (
    <Router>
      <div>
        <ToastContainer />

        <Routes>
        <Route path="/" element={<UserLogin />} />
          <Route path="/home" element={isuserauthincated()? <Home />:<Navigate to="/"/>} />
          <Route path="/feedback" element={isuserauthincated()? <FeedBack/>:<Navigate to="/"/>} />
          <Route path="/tourpac" element={isuserauthincated()? <TourPac/> :<Navigate to="/"/>} />
          
          <Route path="/accomid/:agencyId"  element={isuserauthincated()? <AccomId/> :<Navigate to="/"/>} />
          <Route path="/booking" element={isuserauthincated()? <BookingPage/>:<Navigate to="/"/>} /> 
         



          <Route path="/accom/:agencyId" element={<Accom agencyId={agencyId} />} />
         
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/agency-page" element={<AgencyPage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/admin-page" element={<CustomCard />} />
          <Route path="/sample" element={<Sample />} />
          <Route path="/agencyreg" element={<AgencyReg />} />
          <Route path="/approve" element={<Approve/>} />
          <Route path="/success" element={<Success/>} />
          <Route path="/navbar" element={<Header/>} />
          <Route path="/agentpage" element={<AgentPage/>} />
          <Route path="/agentpost" element={<AgentPost/>} />
          <Route path="/nav" element={<Navbar/>} />
        
          <Route path="/accompost" element={<AccomPost/>} />
          <Route path="/gallerypost" element={<GalleryPost/>} />
          <Route path="/accomfilter" element={<Accomfilter/>} />
         
          <Route path="/admingall" element={<Admincard/>} />
          <Route path="/down" element={<Download/>} />
          <Route path="/model" element={<ModalContainer/>} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
