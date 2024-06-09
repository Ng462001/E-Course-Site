import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

const Feedback = ({ id, name, isUserLoggedIn }) => {

    const [userid, setId] = useState()
    const [username, setName] = useState()
    const [feedback, setFeedback] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        setId(id)
        setName(name)
    }, [])

    const Add_Feedback = async (e) => {
        try {
            e.preventDefault()
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addfeedback`, { userid, username, feedback })
            if (result) {
                toast.success("Feedback Added Successfully")
                navigate("/profile")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* Navbar*/}
            <Navbar isUserLoggedIn={isUserLoggedIn} name={name} />

            <div className="container-fluid mb-5 admin1">
                <div className="row">
                    {/* Sidebar*/}
                    <Sidebar id={id} />
                    {/* Change password page*/}

                    <div className="col-sm-9 mt-5">
                        <div className='row'>
                            <div className='col-sm-6'>
                                <form className='mt-5 mx-5 '>
                                    <div className='form-group'>
                                        <label htmlFor="id">Student ID</label>
                                        <input type="text" className='form-control' name="id" id="id" value={id} disabled onChange={(e) => setId(e.target.value)} />
                                    </div>
                                    <div className='form-group mt-4'>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className='form-control' name="name" id="name" value={name} disabled onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className='form-group mt-4'>
                                        <label htmlFor="feedback">Feedback</label>
                                        <textarea className="form-control" id="feedback" rows="4" placeholder="Feedback" onChange={(e) => setFeedback(e.target.value)} />
                                    </div>
                                    <button type="button" className='btn btn-success mt-4' name="updatePassword" disabled={!feedback} onClick={Add_Feedback} >Send</button>
                                    <button type="reset" className='btn btn-secondary mt-4 mx-4' >Reset</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback