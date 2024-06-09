import React from 'react'
import Contact from '../components/Contact'
import About from '../components/About'
import Navbar from '../components/Navbar'
import Background from '../components/Background'

const Contactpage = ({name, isUserLoggedIn}) => {
  return (
    <>
    <Navbar isUserLoggedIn={isUserLoggedIn} name={name} />
    <Background/>
    <Contact/>
    <About/>
    </>
  )
}

export default Contactpage