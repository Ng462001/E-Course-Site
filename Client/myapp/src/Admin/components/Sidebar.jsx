import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faTable, faLock, faUsers, faComment, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons';
import '../css/Admin.css'


const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token")
    }
    return (
        <nav className="col-sm-3 col-md-2 sidebar py-5 d-print-none sidebarheight">
            <div className="sidebar-sticky ">
                <ul className="nav flex-column allnav ">
                    <li className="nav-item">
                        <NavLink to="/admin" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faHouse} /> Dashboard
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/course" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faAccessibleIcon} /> Course
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/lessons" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faAccessibleIcon} /> Lessons
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/students" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faUsers} /> Students
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/contact" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faHouse} /> Contacts
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/feedback" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faComment} /> Feedback
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/sellReports" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faTable} /> Sell Report
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/changePassword" className="nav-link" activeclassname="active">
                            <FontAwesomeIcon icon={faLock} /> Change Password
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar
