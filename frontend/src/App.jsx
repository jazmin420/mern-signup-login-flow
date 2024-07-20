import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import ConfirmQR from './pages/ConfirmQR';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/qrcode/:_id" element={<ConfirmQR />} />
        <Route path="/profile/:_id" element={<UserProfile />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
