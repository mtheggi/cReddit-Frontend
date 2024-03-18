import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from './Components/navbar/Navbar';
import Home from './views/Home';
import { useState, useRef, useEffect } from 'react';
import Settings from './Components/settings/Settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FormText } from 'react-bootstrap';
import axiosInterceptor from './utils/axiosInterceptor';

function App() {
  const [isVisibleLeftSidebar, setIsVisibleLeftSidebar] = useState(false);
  const navbarRef = useRef();
  return (

    <Router>
      <div className="App h-screen flex flex-col bg-reddit_greenyDark overflow-x-hidden">
        <Navbar setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} navbarRef={navbarRef} />
        <div className={`fixed inset-0 bg-black opacity-50 z-10 ${isVisibleLeftSidebar ? 'block' : 'hidden'}`} onClick={() => setIsVisibleLeftSidebar(false)}> </div>
        <Routes>
          <Route path="/" element={<Home isVisibleLeftSidebar={isVisibleLeftSidebar} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} navbarRef={navbarRef} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
