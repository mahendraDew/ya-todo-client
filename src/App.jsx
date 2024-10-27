
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
          <Route path="/" element={<Home />} />         {/* Home route */}
          <Route path="/home" element={<Home />} />         {/* Home route */}
          <Route path="/signup" element={<Signup />} />         {/* Home route */}
          <Route path="/verify" element={<Verify />} />         {/* Home route */}
          <Route path="/signin" element={<SignIn />} />         {/* Home route */}
          <Route path="/about" element={<About />} />   {/* About route */}
          <Route path="/todo" element={user ? <TodoBoard /> : <Navigate to="/home" />} /> {/* Route for the TodoApp */}
          <Route path="*" element={<Error />} /> {/* Route for the TodoApp */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>

  )
}

export default App
