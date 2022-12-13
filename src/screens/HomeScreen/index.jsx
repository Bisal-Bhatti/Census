import React, { Fragment,useState } from 'react'
import styles from './HomeScreen.module.sass'
import Sidebar from '../../components/Sidebar'
export default function HomeScreen() {
  const [role, setrole] = useState(localStorage.getItem('role'))
  // console.log('home--',localStorage.getItem('role'))
  return (
    <Fragment>
    <Sidebar>
      <div>
      <div className={styles.container}>
        <h1>Welcome to Admin Dashboard of CENSUS APP</h1>
        <h3>You are logged in as <span>{role}</span></h3>
        <img src='./logo.png'/>
      </div>
      </div>
    </Sidebar>
    </Fragment>
  )
}
