import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faLock, faComment } from '@fortawesome/free-solid-svg-icons'
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons';
import '../css/User.css'
import axios from 'axios'


const Sidebar = ({id}) => {
    const [image, setImage] = useState();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/updateStudent/${id}`)
            .then(res => {
                setImage(res.data[0].image)
            })
            .catch(err => console.log(err))
    }, [id, image])

    return (
        <nav className="col-sm-3 col-md-2 sidebar py-5 d-print-none">
            <div className="sidebar-sticky">
                <ul className="nav flex-column allnav" >
                    <li className="nav-item mb-4 mt-3 ">
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/${image}`} alt="StudentImgae" className='img-thumbnail rounded-circle' />
                    </li>
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faHouse} />  Profile
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/myCourse" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faAccessibleIcon} /> My Course
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/feedback" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faComment} />  Feedback
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/changePassword" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faLock} />  Change Password
                        </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Sidebar

