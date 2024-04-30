import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Navbar from "./Components/navbar/Navbar";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import { useContext, useState, useRef, useEffect } from "react";
import Settings from "./Components/settings/Settings";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { FormText } from "react-bootstrap";
import "./utils/axiosInterceptor";
import EmailVerification from "./Components/authentication/reset_components/EmailVerification";
import CreatePost from "./Components/create_post/CreatePost";
import { UserContext } from "./context/UserContext";
import Loading from "./Components/Loading/Loading";
import Community from "./views/Community";
import TopCommunities from "./Components/topcommunities/TopCommunities";
import NotificationPage from './views/NotificationPage';
import PasswordRecovery from "./Components/recovery/PasswordRecovery";
import { generateToken, messaging } from "./firebase";
import { onMessage } from 'firebase/messaging';
import toast, {Toaster} from 'react-hot-toast'

function App() {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Service Worker Registered', registration);
      })
      .catch(function(err) {
        console.log('Service Worker registration failed: ', err);
      });
  }
  
  useEffect (() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification.body);
    })
  }, [])

  const [isVisibleLeftSidebar, setIsVisibleLeftSidebar] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const { isLoading, isLoggedIn } = useContext(UserContext);
  const navbarRef = useRef();

  return (
    isLoading ? (
      <div className="App h-screen flex flex-col bg-reddit_greenyDark overflow-x-hidden">
        <Loading />
      </div>
    ) : (
      <Router>
        <Toaster position="top-right"/>
        <div className="App h-screen flex flex-col bg-reddit_greenyDark overflow-x-hidden">
          {!isNotFound && (
            <Navbar
              setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
              navbarRef={navbarRef}
            />
          )}
          {!isNotFound && (
            <div
              className={`fixed inset-0 bg-black opacity-50 z-10 ${isVisibleLeftSidebar ? "block" : "hidden"
                }`}
              onClick={() => setIsVisibleLeftSidebar(false)}
            ></div>
          )}
          <Routes>
            <Route
              path={"/"}
              element={
                <Home
                  isVisibleLeftSidebar={isVisibleLeftSidebar}
                  setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                  navbarRef={navbarRef}
                />
              }
            />
            <Route
              path={"/:param3/:param1/comments/:param2"}
              element={
                <Home
                  isVisibleLeftSidebar={isVisibleLeftSidebar}
                  setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                  navbarRef={navbarRef}
                />
              }
            />
            {isLoggedIn && <Route path="/settings/*" element={<Settings />} />}
            {isLoggedIn && <Route path="/submit" element={<CreatePost />} />}
            <Route path="/notifications" element={<NotificationPage isVisibleLeftSidebar={isVisibleLeftSidebar}setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}navbarRef={navbarRef}/>}/>
            <Route path="/passwordrecovery" element={<PasswordRecovery/>}/>
            <Route path="/best/communities" element={<TopCommunities />} />
            <Route path="/r/:name" element={<Community />} />
            <Route path="/*" element={<NotFound isNotFound={isNotFound} setIsNotFound={setIsNotFound} />} />
          </Routes>
        </div>
      </Router>
    )
  );
}

export default App;
