// Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/userSlice'; // Import the login action from the userSlice
import { useNavigate,Link } from 'react-router-dom';
import '../Styling/Auth.css';
import {Button} from 'primereact/button'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useSelector(state => state.user); // Getting the loading and error states from Redux

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ username, password })).unwrap(); // Dispatch the login action
      if (result.token) {
        navigate('/home'); // Navigate to the book list page if login is successful
      }
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button type="submit" label="Login" disabled={loading}></Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {/* <p> <Link to='/'>Signup</Link></p> */}
    </div>
  );
};

export default Login;
