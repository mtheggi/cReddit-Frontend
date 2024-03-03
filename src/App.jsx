import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from './Components/navbar/Navbar';
import Sidebar from './Components/sidebar/Sidebar';
import Mainfeed from './Components/mainfeed/Mainfeed';
import Share from './Components/mainfeed/Share';
import Comment from './Components/mainfeed/Comment';
import Vote from './Components/mainfeed/Vote';

function App() {


  return (

    <div className="App h-screen flex flex-col bg-reddit_greenyDark">
      <div className='top-0 w-full inline-flex z-50'><Navbar /></div>
      <div className="w-full inline-flex flex-row justify-start content-center">
        <Sidebar />
        <span className='relative inline-flex mt-12 items-center cursor-pointer'><Mainfeed /></span>
      </div >
    </div>


  )
}

export default App
