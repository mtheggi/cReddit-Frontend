import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from './Components/navbar/Navbar';
import Sidebar from './Components/sidebar/Sidebar';
import Mainfeed from './Components/mainfeed/Mainfeed';
import Recent from './Components/mainfeed/Recent';
import { useState, useEffect, useRef } from 'react';
import Home from './views/Home';
1

function App() {

  

  return (


    <div className="App h-screen flex flex-col bg-reddit_greenyDark overflow-x-hidden">
     <Home />
    </div>


  )
}

export default App
