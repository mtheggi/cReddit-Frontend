import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/sidebar/Sidebar';



function App() {


  return (

    <div className="App h-screen flex flex-col bg-reddit_greenyDark">
      <Navbar />
      <Sidebar />
    </div>

  )
}

export default App
