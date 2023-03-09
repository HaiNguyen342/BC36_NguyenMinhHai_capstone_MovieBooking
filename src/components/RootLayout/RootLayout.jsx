import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import styles from './RootLayout.module.css'
import Footer from '../Footer'
import BackToTop from '../../modules/BackToTop'

const RootLayout = () => {
  return (
    <div className={styles.root}>
        <Header />
        <Outlet />
        <Footer />
        <BackToTop />
    </div>
  )
}

export default RootLayout