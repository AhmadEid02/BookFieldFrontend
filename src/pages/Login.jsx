import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email.length == 0) {
                setError("fill Email field")
                return
            }
            if (password.length == 0) {
                setError("fill Password field")
                return
            }
            const response = await axios.post("http://localhost:4000/user/login", { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));

            navigate('/')
            window.location.reload();
            setEmail('');
            setPassword('');
            setError(null); // Clear error on successful login
        } catch (err) {
            setError(err.response.data.error || "An error occurred"); // Use a default message if no specific message is available
            console.log(err.response.data.error)
            e.preventDefault();
        }
    }

    return (
        <>
            <div className="containe">
            <form className='signup' onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button>Log in</button>
                {error && <div className='error'>{error}</div>}
            </form>
            </div>
        </>
    );
}

export default Login;
