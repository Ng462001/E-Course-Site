import React, { useState } from 'react';
import '../css/ForgetPass.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address!");
            return;
          }
        try {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/forget_Password`, { email });
            console.log(result);
            if (result.data.Success) {
                toast.success(`Link send Successfully to your Email ${email}`)
                navigate("/");
            } else {
                toast.error(result.data.Error)
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.status === 404) {
                console.log("Endpoint not found. Please check server configuration.");
            } else {
                console.log("An error occurred while processing your request.");
            }
        }
    };

    return (
        <div className='w-100 vh-100 d-flex justify-content-center align-items-center '>
            <div className='forget_paswword_div'>
                <h2 className='fw-bold mb-5 '>Forgot Password</h2>
                <form className="row g-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email address</label>
                        <input type="email" required className="form-control" id="email" name="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="send1 mb-3 ">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
