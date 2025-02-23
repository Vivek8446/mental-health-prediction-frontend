import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import FormContainer from './FormContainer';
import VideoCall from './pages/VideoCall';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-amber-50/50 bg-gradient-to-b from-[rgb(241,232,255)] to-[rgb(228,222,254)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/predict" element={<FormContainer />} />
          <Route path="/video-call" element={<VideoCall />} />
          
        </Routes>
        {/* <FormContainer /> */}

      </div>
    </Router>
  );
}

export default App;

