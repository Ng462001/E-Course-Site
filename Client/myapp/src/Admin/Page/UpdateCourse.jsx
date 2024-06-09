import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';


const UpdateCourse = () => {
    const [values, setFormData] = useState({
        course_name: '',
        course_desc: '',
        course_author: '',
        course_duration: '',
        course_original_price: '',
        course_price: '',
        course_image: null
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/updateCourse/` + id)
            .then(res => {
                console.log(res)
                setImageUrl(res.data[0].course_image)
                setFormData({
                    ...values,
                    course_name: res.data[0].course_name,
                    course_desc: res.data[0].course_desc,
                    course_author: res.data[0].course_author,
                    course_duration: res.data[0].course_duration,
                    course_original_price: res.data[0].course_original_price,
                    course_price: res.data[0].course_price,
                    course_image: res.data[0].course_image,

                });
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "course_image" && files[0]) {
            setImageUrl(URL.createObjectURL(files[0]));
        }
        setFormData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    function Update_Course(e) {
        e.preventDefault()
        const dataTosend = new FormData();
        for (const key in values) {
            dataTosend.append(key, values[key]);
        }
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateCourseByID/` + id, dataTosend)
            .then(courses => {
                console.log(courses)
                toast.success("Course Update Successfully")
                navigate("/admin/course")
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            {/* Navbar*/}
            <Header />

            <div className="container-fluid mb-5 admin">
                <div className="row">
                    {/* Sidebar*/}
                    <Sidebar />
                    {/* Add Course page*/}
                    <div className='col-sm-12 col-lg-6 mt-5 jumbotron'>
                        <h3 className='text-center fw-bold my-4'>Update Course</h3>
                        <form method='post' onSubmit={Update_Course}>
                            <div className='d-flex flex-column gap-4 fw-bold'>
                                <div className='form-group'>
                                    <label htmlFor="course_name">Course Name</label>
                                    <input type="text" name="course_name"  id="course_name" className='form-control mt-2' value={values.course_name} onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="course_desc">Course Description</label>
                                    <textarea name="course_desc" id="course_desc" className='form-control mt-2' rows='2' value={values.course_desc} onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="course_author">Course Author</label>
                                    <input type="text" name="course_author" id="course_author" className='form-control mt-2' value={values.course_author} onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="course_duration">Course Duration</label>
                                    <input type="number" name="course_duration" id="course_duration" className='form-control mt-2' value={values.course_duration} onChange={handleChange} />
                                    <i className='text-danger fw-lighter'>Note: Duration in Month </i>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="course_original_price">Course Original Price</label>
                                    <input type="number" name="course_original_price" id="course_original_price" className='form-control mt-2' value={values.course_original_price} onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="course_price">Course Price</label>
                                    <input type="number" name="course_price" id="course_price" className='form-control mt-2' value={values.course_price} onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="course_image">Course Image</label>
                                    <input type="file" name="course_image" id="course_image" className='form-control-file mx-4 mt-2' onChange={handleChange} />
                                    {imageUrl && <img src={imageUrl} style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                                    {values.course_image && <img src={`${import.meta.env.VITE_BACKEND_URL}/${values.course_image}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />}

                                </div>
                                <div className='text-center mt-4'>
                                    <button type="submit" className='btn btn-success mx-3' id='courseSubmitBtn' name='courseSubmitBtn'>Update</button>
                                    <Link className='btn btn-secondary' to="/admin/Course">Close</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateCourse