import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from './Components/navbar/Navbar';
import Sidebar from './Components/sidebar/Sidebar';
import Mainfeed from './Components/mainfeed/Mainfeed';



function App() {


  return (

    <div className="App h-screen flex flex-col bg-gray-600 overflow-hidden">
      <Navbar />

      <div className='h-full flex justify-center  '>
      <Mainfeed />
      </div>
      
    </div>



  )
}

export default App
