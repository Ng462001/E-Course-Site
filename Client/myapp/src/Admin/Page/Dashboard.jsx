import React, { useEffect, useState } from 'react'
import '../css/Admin.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
library.add(faTrash);
import axios from 'axios';


const Dashboard = () => {
  const [orders, setorder] = useState([])
  const [students, setStudent] = useState(0)
  const [courses, setCourse] = useState(0)
  const [sold, setSold] = useState(0)


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order`)
      .then(res => setorder(res.data))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/numberOfStudents`)
      .then(res => setStudent(res.data.total_students))
      .catch(error => console.log(error))
  }, [students])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/numberOfsold`)
      .then(res => setSold(res.data.total_sold))
      .catch(error => console.log(error))
  }, [orders])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/numberOfCourses`)
      .then(res => setCourse(res.data.total_courses))
      .catch(error => console.log(error))
  }, [students])

  function DeleteByID(id) {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteorder/` + id)
      .then(order => {
        console.log(order)
        setorder(prevOrders => prevOrders.filter(order => order.order_id !== id));
      })
      .catch(err => console.log(err))
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(options);
  }

  return (
    <>
      {/* Navbar*/}
      <Header />

      {/* side Bar*/}

      <div className="container-fluid mb-5 admin  ">
        <div className="row">
          {/* Sidebar*/}
          <Sidebar />

          <div className='col-sm-9 mt-5'>
            <div className="row mx-5 text-center">
              <div className="col-sm-4 mt-5">
                <div className="card text-white bg-danger mb-3">
                  <div className="card-header">Courses</div>
                  <div className="card-body">
                    <h4 className='card-title'>
                      {courses}
                    </h4>
                    <Link className='btn text-white border-0' to="/admin/course" >View</Link>
                  </div>
                </div>
              </div>

              <div className="col-sm-4 mt-5">
                <div className="card text-white bg-success mb-3">
                  <div className="card-header">Students</div>
                  <div className="card-body">
                    <h4 className='card-title'>
                      {students}
                    </h4>
                    <Link className='btn text-white border-0' to="/admin/students" >View</Link>
                  </div>
                </div>
              </div>

              <div className="col-sm-4 mt-5">
                <div className="card text-white bg-info mb-3">
                  <div className="card-header">Sold</div>
                  <div className="card-body">
                    <h4 className='card-title'>
                      {sold}
                    </h4>
                    <Link className='btn text-white border-0' to="/admin/sellReports" >View</Link>
                  </div>
                </div>
              </div>
              </div>

              <div className="col-12 mt-5">
              <p className="bg-dark text-white p-2 text-center">Course Ordered</p>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className='col'>Order ID</th>
                        <th className='col'>Course ID</th>
                        <th className='col'>Student Email</th>
                        <th className='col'>Amount</th>
                        <th className='col'>Order Date</th>
                        <th className='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orders.map((order) => {
                          return <tr key={order.order_id}>
                            <th scope='row'>{order.order_id}</th>
                            <td>{order.course_id}</td>
                            <td>{order.email}</td>
                            <td>{order.amount}</td>
                            <td>{formatDate(order.date)}</td>
                            <td><button type='submit' onClick={(e) => DeleteByID(order.order_id)} className='btn btn-secondary' name='delete' value='Delete'><FontAwesomeIcon icon="trash" /></button></td>
                          </tr>
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          
        </div >
      </div>
    </>
  )
}

export default Dashboard