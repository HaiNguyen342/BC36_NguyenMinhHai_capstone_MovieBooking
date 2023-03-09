import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <h6>E Movie</h6>
            <ul className={styles.content__text}>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Online Services</a>
              </li>
              <li>
                <a href="#">Voucher</a>
              </li>
              <li>
                <a href="#">Hiring</a>
              </li>
              <li>
                <a href="#">Advertising</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-sm-6">
            <h6>Policy & agreement</h6>
            <ul className={styles.content__text}>
              <li>
                <a href="#">General</a>
              </li>
              <li>
                <a href="#">Trading</a>
              </li>
              <li>
                <a href="#">Purchasing</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
              <li>
                <a href="#">Faq</a>
              </li>
            </ul>
          </div>

          <div className={`${styles.content__icon} col-lg-3 col-sm-6`}>
            <h6>Contact</h6>
            <a href="">
              <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="">
              <i class="fa-brands fa-youtube"></i>
            </a>
            <a href="">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="">
              <i class="fa-brands fa-twitter"></i>
            </a>
          </div>

          <div className="col-lg-3 col-sm-6">
            <h6>Customer care</h6>
            <ul className={styles.content__text}>
              <li>
                <a href="#">Hotline: 1900 xxxx</a>
              </li>
              <li>
                Open time: 8:00 am - 22:00 pm
              </li>
              <li>
                <a href="#">Email: cskh@emovie.vn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footer__copyright}>
        <p>COPYRIGHT 2022 EMOVIE. All RIGHTS RESERVED .</p>
      </div>
    </div>
  );
};

export default Footer;
