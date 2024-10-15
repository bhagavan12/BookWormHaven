// Signup.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/userSlice' // Import the signup action from the userSlice
import { useNavigate,Link } from 'react-router-dom';
import '../Styling/Auth.css';
import { Button } from 'primereact/button';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useSelector(state => state.user); // Getting the loading and error states from Redux

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signup({ username, email, password })).unwrap(); // Dispatch the signup action
      if (result.message === 'User created successfully') {
        navigate('/'); // Navigate to login page if signup is successful
      }
    } catch (err) {
      console.error('Failed to sign up:', err);
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
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button label="SignUp" type="submit" disabled={loading}></Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {/* <p> <Link to='/'>Login IN</Link></p> */}
    </div>
  );
};

export default Signup;
