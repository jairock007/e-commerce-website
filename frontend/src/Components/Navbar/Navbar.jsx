import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { MdWbSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";

const NavBar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const { isDarkMode, toggleDarkMode } = useContext(ShopContext);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (<>
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <p>SHOPPER</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
        {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {isDarkMode ? <MdWbSunny /> : <IoMoonSharp />}
        </button> */}
      </div>
    </div>
  </>
  );
};

export default NavBar;
