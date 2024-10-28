
import Home from './pages/Home'
import About from './pages/About'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TodoBoard from './pages/TodoBoard';
import Signup from './pages/Signup';
import SignIn from './pages/Signin';
import Verify from './pages/Verify';
import Error from './pages/Error';

function App() {
  const user = JSON.parse(localStorage.getItem('user')); // Check if user data exists in localStorage

  return (
    <Router>
      <div className="App">
        {/* Define navigation routes */}
        <Routes>
          <Route path="/" element={<Home />} />        
          <Route path="/home" element={<Home />} />        
          <Route path="/signup" element={<Signup />} />        
          <Route path="/verify" element={<Verify />} />        
          <Route path="/signin" element={<SignIn />} />        
          <Route path="/about" element={<About />} />   
          <Route path="/todo" element={user ? <TodoBoard /> : <Navigate to="/home" />} /> 
          <Route path="*" element={<Error />} /> 
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>

  )
}

export default App
