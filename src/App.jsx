import { BrowserRouter, Routes, Route } from 'react-router';
import Body from './components/Body';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} > 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
