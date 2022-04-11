
import React from 'react'
import styles from "./Footer.module.css"
import {NavLink} from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-auto">
      <div className={styles.footerBreak}/>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <NavLink to={'privacy'} className={styles.footerElement}>
            Privacy Policy
          </NavLink>
          <NavLink to={'tos'} className={styles.footerElement}>
            Terms of Service
          </NavLink>
          <NavLink
            to={'contact'} className={styles.footerElement}
          >
            Contact
          </NavLink>
          <div className={styles.footerElement}>
            Copyright © 2022 easySBC
          </div>
        </div>
      </div>
    </div>
  )

}

export default Footer