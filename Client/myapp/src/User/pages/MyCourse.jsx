import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'
import Sidebar from '../components/Sidebar';
import '../css/User.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';


const MyCourse = ({ id,email, name, isUserLoggedIn }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCourse`, { params: { email } })
            .then(response => {
                console.log(response.data);
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, [email]);


    return (
        <>
            {/* Navbar*/}
            <Navbar isUserLoggedIn={isUserLoggedIn} name={name} />

            <div className="container-fluid mb-5 admin1">
                <div className="row">
                    {/* Sidebar*/}
                    <Sidebar id={id}/>
                    {/* My Courses */}
                    <div className='col-sm-6 mt-5  jumbotron'>
                        <h3 className='text-center fw-bold my-4'>All Courses</h3>
                        {courses ? (
                            courses.map(course => (
                                <div key={course.course_id} className='mt-5 edit_mycourse'>
                                    <div className='row'>
                                        <div className='col-md-4 text-center'>
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/${course.course_image}`} alt="Course Image" className='card-img-top img-thumbnail' />
                                        </div>
                                        <div className='col-md-8 mt-4'>
                                            <div className='card-body d-flex flex-column gap-1'>
                                                <h5 className=' card-title fw-bold'>Course Name: {course.course_name}</h5>
                                                <p className='card-text fw-bold mt-2'>Description: {course.course_desc}</p>
                                                <p className='card-text fw-bold'>Duration: {course.course_duration} Month</p>
                                                <p className='card-text fw-bold'>Author: {course.course_author}</p>
                                                <div className='maincard'>
                                                    <p className="card-text d-inline fw-bold">Price:<small><del><FontAwesomeIcon className='mx-2' icon={faIndianRupeeSign} />{course.course_original_price}</del></small>
                                                        <span className='font-weight-bolder mx-2'><FontAwesomeIcon icon={faIndianRupeeSign} />{course.course_price}</span></p>
                                                    <Link type="submit" to={`/watchCourse/${course.course_id}`} className='btn btn-primary text-white font-weight-bolder btn_watch'>Watch Now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='col-sm-6 mt-5 mx-3 jumbotron'>
                                <h3 className='text-center fw-bold my-4'>All Courses</h3>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyCourse;
