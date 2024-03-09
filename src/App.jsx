import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from './Components/navbar/Navbar';
import Sidebar from './Components/sidebar/Sidebar';
import Mainfeed from './Components/mainfeed/Mainfeed';
import redditLogo from './assets/reddit_logo.png'
import Recent from './Components/mainfeed/Recent';
import Settings from './Components/settings/Settings';
1

function App() {


  return (

    <div className="App h-screen flex flex-col bg-reddit_greenyDark overflow-x-hidden">
      <Navbar />
      {/* <div className="w-full mt-15 inline-flex flex-row justify-center">


        <div className='flex flex-row w-fit mr-0 lg:mr-5 xl:ml-0 lg:ml-3'>
          <div className='h-full hidden xl:flex w-60 mt-3 mr-2 no-select ml-auto'>
            <Sidebar />
          </div>

          <div className='mxl:w-192 flex flex-row flex-grow lg:flex-grow-0 xl:ml-0 w-65% xl:w-51% mx-1 lg:mx-2'>
            <Mainfeed />
          </div>

          <Recent />
        </div>

      </div > */}

        <div className="w-full inline-flex flex-row mt-3 xl:ml-15% xs:ml-10">
            <h1 className="text-white text-xl font-bold font-plex">User Settings</h1>
        </div>   

        <Settings />
        
      </div>
    
  )
}

export default App
