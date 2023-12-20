import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.length==0) {
        setError("fill Email field")
        return
      }
      if (password.length==0) {
        setError("fill Password field")
        return
      }
      const response = await axios.post("http://localhost:4000/user/signup", { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      
      navigate('/')
      window.location.reload(false);
      setEmail('');
      setPassword('');
      setError(null); // Clear error on successful login
    } catch (err) {
      setError(err.response.data.error); // Use a default message if no specific message is available
      e.preventDefault();
    }
  }
  return (
    <div>
         <div className="containe">
      <form className='signup' onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button>Sign up</button>
        {/* <button disabled="loading">sign up</button> */}
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
    </div>
  )
}

export default Signup