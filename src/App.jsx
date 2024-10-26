
import Home from './Home'
import About from './About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoBoard from './TodoBoard';
import Signup from './Signup';
import SignIn from './Signin';

function App() {

  return (
    <Router>
      <div className="App">
        {/* Define navigation routes */}
        <Routes>
          <Route path="/" element={<Home />} />         {/* Home route */}
          <Route path="/signup" element={<Signup />} />         {/* Home route */}
          <Route path="/signin" element={<SignIn />} />         {/* Home route */}
          <Route path="/about" element={<About />} />   {/* About route */}
          <Route path="/todo" element={<TodoBoard />} /> {/* Route for the TodoApp */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>

  )
}

export default App
