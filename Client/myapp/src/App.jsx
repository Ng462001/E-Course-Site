import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Coursepage from './pages/Coursepage.jsx'
import Aboutpage from './pages/Aboutpage.jsx'
import Contactpage from './pages/Contactpage.jsx'
import Homepage from './pages/Homepage.jsx'
import Dashboard from './Admin/Page/Dashboard.jsx'
import Courses from './Admin/Page/Courses.jsx'
import Lesson from './Admin/Page/Lesson.jsx'
import Students from './Admin/Page/Students.jsx'
import SellReport from './Admin/Page/SellReport.jsx'
import Feedback from './Admin/Page/Feedback.jsx'
import ChangePassword from './Admin/Page/ChangePassword.jsx'
import AddCourse from './Admin/Page/AddCourse.jsx'
import AddStudent from './Admin/Page/AddStudent.jsx'
import UpdateCourse from './Admin/Page/UpdateCourse.jsx'
import UpdateStudents from './Admin/Page/UpdateStudents.jsx'
import AddLesson from './Admin/Page/AddLesson.jsx'
import UpdateLesson from './Admin/Page/UpdateLesson.jsx'
import Profile from './User/pages/Profile.jsx'
import MyCourse from './User/pages/MyCourse.jsx'
import UserFeedback from './User/pages/Feedback.jsx'
import UserChangePass from './User/pages/ChangePassword.jsx'
import CourseDetail from './components/CourseDetail.jsx'
import axios from 'axios';
import VideoList from './components/Video.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import VerifyEmail from './components/VerifyEmail.jsx'
import Contact from './Admin/Page/Contact.jsx'
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader.jsx';
import SuccessPage from './components/SuccessPage.jsx';
import ScrollToTop from './components/SrollToTop.jsx';

function App() {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const token = localStorage.getItem("token")

  //loader 

  useEffect(() => {
    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        setIsLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        return response;
      },
      (error) => {
        setIsLoading(false);
        return Promise.reject(error);
      }
    );
  }, [])


  // Admin Login Check

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/check`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data.Status === "Success" && res.data.role === "admin") {
          setId(res.data.id)
          setName(res.data.name)
          setEmail(res.data.email)
          setIsAdminLoggedIn(true);

        }
        else {
          setIsAdminLoggedIn(false);
        }
      })
      .catch(err => console.log(err))
  }, [])



  // User Login Check

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/check`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data.Status === "Success" && res.data.role === "user") {
          setId(res.data.id)
          setName(res.data.name)
          setEmail(res.data.email)
          setImage(res.data.image)
          setIsUserLoggedIn(true);
        }
        else {
          setIsUserLoggedIn(false);
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>

      <BrowserRouter>
        <Loader load={loading} />
        <ScrollToTop/>
        <Routes>

          {/*Main Home page*/}
          <Route path='/' element={<Homepage isUserLoggedIn={isUserLoggedIn} name={name} />} />
          <Route path='/course' element={<Coursepage isUserLoggedIn={isUserLoggedIn} name={name} />} />
          <Route path='/contact' element={<Contactpage isUserLoggedIn={isUserLoggedIn} name={name} />} />
          <Route path='/about' element={<Aboutpage isUserLoggedIn={isUserLoggedIn} name={name} />} />
          <Route path='/courseDetail/:id' element={<CourseDetail isUserLoggedIn={isUserLoggedIn} name={name} email={email} />} />
          <Route path='/forget-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
          <Route path='/verifyEmail/:id/:token' element={<VerifyEmail />} />
          <Route path='/success' element={<SuccessPage />} />

          {/*Admin*/}

          {isAdminLoggedIn ? (
            <>
              <Route path='/admin' element={<Dashboard />} />
              <Route path='/admin/course' element={<Courses />} />
              <Route path='/admin/updateCourse/:id' element={<UpdateCourse />} />
              <Route path='/admin/addCourse' element={<AddCourse />} />
              <Route path='/admin/lessons' element={<Lesson />} />
              <Route path='/admin/contact' element={<Contact />} />
              <Route path='/admin/lessons/addLesson/:id' element={<AddLesson />} />
              <Route path='/admin/lessons/updateLesson/:id' element={<UpdateLesson />} />
              <Route path='/admin/students' element={<Students />} />
              <Route path='/admin/updateStudent/:id' element={<UpdateStudents />} />
              <Route path='/admin/sellReports' element={<SellReport />} />
              <Route path='/admin/feedback' element={<Feedback />} />
              <Route path='/admin/changePassword' element={<ChangePassword id={id} email={email} />} />
              <Route path='/admin/addStudent' element={<AddStudent />} />
            </>
          ) : (<Route path='*' element={<Homepage />} />)}


          {/* User */}

          {isUserLoggedIn ? (
            <>
              <Route path='/profile' element={<Profile id={id} name={name} email={email} image={image} isUserLoggedIn={isUserLoggedIn} />} />
              <Route path='/myCourse' element={<MyCourse id={id} email={email} isUserLoggedIn={isUserLoggedIn} name={name} />} />
              <Route path='/feedback' element={<UserFeedback id={id} name={name} isUserLoggedIn={isUserLoggedIn} />} />
              <Route path='/changepassword' element={<UserChangePass id={id} email={email} isUserLoggedIn={isUserLoggedIn} name={name} />} />
              <Route path='/watchCourse/:id' element={<VideoList isUserLoggedIn={isUserLoggedIn} name={name} email={email} />} />
            </>
          ) : (<Route path='*' element={<Homepage />} />)}

        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  )
}

export default App
