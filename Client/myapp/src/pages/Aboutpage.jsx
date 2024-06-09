import React, { useEffect } from 'react'
import About from '../components/About'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Background from '../components/Background'
import AboutUS from '../components/AboutUS'


const Aboutpage = ({name, isUserLoggedIn}) => {
  return (
    <>
    <Navbar isUserLoggedIn={isUserLoggedIn} name={name}/>
    <Background/>
    <AboutUS/>
    <About/>
    </>
  )
}

export default Aboutpage