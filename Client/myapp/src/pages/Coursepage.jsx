import React from 'react'
import AllCourse from '../components/AllCourse'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import About from '../components/About'


const Coursepage = ({name, isUserLoggedIn}) => {
  return (
    <>
    <Navbar isUserLoggedIn={isUserLoggedIn} name={name}/>
    <Background/>
    <AllCourse/>
    <About/>
    </>
  )
}

export default Coursepage