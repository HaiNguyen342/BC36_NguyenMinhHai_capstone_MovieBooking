import { Nav, Navbar } from "react-bootstrap";
import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { Menu, Avatar } from "@mantine/core";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={styles.header}>
      <Navbar collapseOnSelect expand="lg" className={styles.header__content}>
        <Navbar.Brand href="#">
          <img
            width={200}
            src="./image/Logo1.png"
            onClick={() => navigate("/")}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={styles.content__text}>
            <a href="#showing" onClick={() => navigate("/")}>
              Showtime
            </a>
            <a href="#cinemaList" onClick={() => navigate("/")}>
              Cinema group
            </a>
            <a href="#">News</a>
          </Nav>
          <Nav className={styles.content__button}>
            <button
              hidden={user}
              onClick={() => navigate("/signin")}
              className="me-2"
            >
              Log in
            </button>
            <button hidden={user} onClick={() => navigate("./signup")}>
              Sign up
            </button>
            <Menu width={160} shadow="md" hidden={!user}>
              <Menu.Target>
                <Avatar radius="xl" />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item component="a" onClick={() => navigate("/account")}>
                  Account detail
                </Menu.Item>

                <Menu.Item component="a" onClick={() => dispatch(logout())}>
                  Log out
                </Menu.Item>

                
              </Menu.Dropdown>
            </Menu>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
