import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password });
            toast.success('Logged in!');
            console.log(res.data);
            setAuth({
                user: res.data.user,
                token: res.data.token
            })
            localStorage.setItem('auth', JSON.stringify(res.data));
            navigate('/');
        } catch (error) {
            toast.error('Login Failed!');
            console.log(error);
        }
    }

    return (
        <Layout>
            <form className='formy'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail2" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </Layout >
    )
}

export default Login;
