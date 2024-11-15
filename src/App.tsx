import { Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './routes/home/home';
import Navbar from './components/navbar/navbar';
import Register from './routes/register/register';
import Login from './routes/login/login';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} >
        <Route index element={<Home />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;