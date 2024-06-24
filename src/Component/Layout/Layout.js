import React from 'react'
import MainNavigation from './MainNavigation'
import Footer from './Footer/Footer'

const Layout = (props) => {
  return (
    <div>
      <MainNavigation/>
      <main>{props.children}</main>
      <Footer/>
    </div>
  )
}

export default Layout
