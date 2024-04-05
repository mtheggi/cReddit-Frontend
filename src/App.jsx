import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Navbar from "./Components/navbar/Navbar";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import { useState, useRef } from "react";
import Settings from "./Components/settings/Settings";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { FormText } from "react-bootstrap";
import axiosInterceptor from "./utils/axiosInterceptor";
import EmailVerification from "./Components/authentication/reset_components/EmailVerification";
import CreatePost from "./Components/create_post/CreatePost";

function App() {
  const [isVisibleLeftSidebar, setIsVisibleLeftSidebar] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const navbarRef = useRef();
  return (

    <Router>
      <div className="App h-screen flex flex-col bg-reddit_greenyDark overflow-x-hidden">

        {!isNotFound && <Navbar
          setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
          navbarRef={navbarRef}
        />}
        {!isNotFound && <div
          className={`fixed inset-0 bg-black opacity-50 z-10 ${isVisibleLeftSidebar ? "block" : "hidden"
            }`}
          onClick={() => setIsVisibleLeftSidebar(false)}
        >
          {" "}
        </div>}
        <Routes>
          <Route path="/" element={<Home isVisibleLeftSidebar={isVisibleLeftSidebar} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} navbarRef={navbarRef} />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/submit" element={<CreatePost />} />
          <Route path="/*" element={<NotFound isNotFound={isNotFound} setIsNotFound={setIsNotFound} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
