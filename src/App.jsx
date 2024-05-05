import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Navbar from "./Components/navbar/Navbar";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Search from "./views/Search";
import { useContext, useState, useRef } from "react";
import Settings from "./Components/settings/Settings";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./utils/axiosInterceptor";
import CreatePost from "./Components/create_post/CreatePost";
import { UserContext } from "./context/UserContext";
import Loading from "./Components/Loading/Loading";
import Community from "./views/Community";
import TopCommunities from "./Components/topcommunities/TopCommunities";
import NotificationPage from "./views/NotificationPage";
import PasswordRecovery from "./Components/recovery/PasswordRecovery";
import {
  SidebarContextProvider,
  SidebarContext,
} from "./context/SidebarContext";
import OthersProfile from "./views/OthersProfile";
import Chat from "./views/Chat";
import Message from "./Components/messages/Message";

function App() {
  const [isVisibleLeftSidebar, setIsVisibleLeftSidebar] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const { isLoading, isLoggedIn } = useContext(UserContext);
  const { setIsCommunityOpen, communityButtonRef, userHistoryRes, sidebarRef } =
    useContext(SidebarContext);
  const navbarRef = useRef();

  const sidebarProps = {
    isVisibleLeftSidebar,
    setIsVisibleLeftSidebar,
    setIsCommunityOpen,
    communityButtonRef,
    userHistoryRes,
    sidebarRef,
  };

  return isLoading ? (
    <div className="App h-screen flex flex-col bg-reddit_greenyDark overflow-x-hidden">
      <Loading />
    </div>
  ) : (
    <Router>
      <div className="App h-screen flex flex-col bg-reddit_greenyDark overflow-x-hidden">
        {!isNotFound && (
          <Navbar
            setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
            navbarRef={navbarRef}
          />
        )}
        {!isNotFound && (
          <div
            className={`fixed inset-0 bg-black opacity-50 z-10 ${
              isVisibleLeftSidebar ? "block" : "hidden"
            }`}
            onClick={() => setIsVisibleLeftSidebar(false)}
          ></div>
        )}
        <Routes>
          <Route
            path={"/"}
            element={
              <SidebarContextProvider>
                <Home
                  isVisibleLeftSidebar={isVisibleLeftSidebar}
                  setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                  navbarRef={navbarRef}
                />
              </SidebarContextProvider>
            }
          />
          <Route
            path={"/:param3/:param1/comments/:param2"}
            element={
              <SidebarContextProvider>
                <Home
                  isVisibleLeftSidebar={isVisibleLeftSidebar}
                  setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                  navbarRef={navbarRef}
                />
              </SidebarContextProvider>
            }
          />
          <Route
            path={"/popular"}
            element={
              <SidebarContextProvider>
                <Home
                  isVisibleLeftSidebar={isVisibleLeftSidebar}
                  setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                  navbarRef={navbarRef}
                />
              </SidebarContextProvider>
            }
          />
          {isLoggedIn && <Route path="/settings/*" element={<Settings />} />}
          {isLoggedIn && <Route path="/submit" element={<CreatePost />} />}
          <Route
            path="/notifications"
            element={
              <NotificationPage
                isVisibleLeftSidebar={isVisibleLeftSidebar}
                setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                navbarRef={navbarRef}
              />
            }
          />
          <Route path="/passwordrecovery" element={<PasswordRecovery />} />
          <Route
            path="/best/communities"
            element={
              <SidebarContextProvider>
                <TopCommunities
                  isVisibleLeftSidebar={isVisibleLeftSidebar}
                  setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                />
              </SidebarContextProvider>
            }
          />
          <Route path="/r/:name" element={<Community />} />

          <Route
            path="/user/:username/:page?"
            element={
              <SidebarContextProvider>
                <OthersProfile
                  isVisibleLeftSidebar={isVisibleLeftSidebar}
                  setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                  navbarRef={navbarRef}
                />
              </SidebarContextProvider>
            }
          />
          <Route
            path="/search/:query/:type"
            element={
              <SidebarContextProvider>
                <Search
                  isVisibleLeftSidebar={isVisibleLeftSidebar}
                  setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                  navbarRef={navbarRef}
                />
              </SidebarContextProvider>
            }
          />

          <Route path="/chat" element={<Chat />} />

          <Route
            path="/*"
            element={
              <NotFound isNotFound={isNotFound} setIsNotFound={setIsNotFound} />
            }
          />

          <Route
            path="/message/*"
            element={<Message sidebarProps={sidebarProps} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
