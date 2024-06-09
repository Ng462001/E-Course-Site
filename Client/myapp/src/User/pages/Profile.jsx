import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import toast from 'react-hot-toast';

const Profile = ({ id, name, email, image,isUserLoggedIn}) => {

    const [values, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        image: null,
    })
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            ...values,
            id: id,
            name: name,
            email: email,
            image: image
        })

    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,

        }));
    }

    function Update_Profile(e) {
        e.preventDefault()
        const dataTosend = new FormData();
        for (const key in values) {
            dataTosend.append(key, values[key]);
        }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateProfile/` + values.id, dataTosend)
            .then(profile => {
                console.log(profile)
                navigate("/profile")
                toast.success("Profile Update Successfully")
                window.location.reload()

            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {/* Navbar*/}
            <Navbar isUserLoggedIn={isUserLoggedIn} name={name}/>

            <div className="container-fluid mb-5 admin1">
                <div className="row">
                    {/* Sidebar*/}
                    <Sidebar id={id}/>

                    {/* Profile page*/}
                    <div className='col-sm-6 mt-5 jumbotron'>
                        <h3 className='text-center fw-bold my-4'>Profile</h3>
                        <div className='d-flex flex-column gap-4'>
                            <div className='form-group'>
                                <label htmlFor="id">Student ID</label>
                                <input type="text" name="id" id="id" className='form-control' value={values.id} disabled onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" className='form-control' value={values.name} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" disabled className='form-control' value={values.email} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="image">Profile Image</label>
                                <input type="file" name="image" id="image" className='form-control-file mx-4' onChange={handleChange} />
                            </div>
                            <div className='text-center mt-4'>
                                <button type="submit" className='btn btn-success mx-3' id='courseSubmitBtn' name='courseSubmitBtn' onClick={Update_Profile} >Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile