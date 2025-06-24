import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import './navStyle.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { icon: "paths.svg", label: "فرآيندها", href: "/paths" },
  { icon: "monitor.svg", label: "ربات‌ها", href: "/robots" },
  { icon: "dashboard.svg", label: "داشبورد", href: "/dashboard" },
];

export default function Navbar({activeNavTab}) {
  
  const [activeIndex, setActiveIndex] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const selectorRef = useRef(null);
  const itemRefs = useRef([]);

  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  const updateSelector = () => {
    const activeEl = itemRefs.current[activeIndex];
    const selector = selectorRef.current;

    if (activeEl && selector) {
      selector.style.top = `${activeEl.offsetTop}px`;
      selector.style.left = `${activeEl.offsetLeft}px`;
      selector.style.width = `${activeEl.offsetWidth}px`;
    }
  };

  useEffect(() => {
    updateSelector();
    window.addEventListener("resize", () => setTimeout(updateSelector, 500));
    return () =>
      window.removeEventListener("resize", () => setTimeout(updateSelector, 500));
  }, [activeIndex]);

  const handleNavClick = (index) => {
    setActiveIndex(index);
    activeNavTab(index)
    updateSelector();
    if (window.innerWidth < 992) {
      setMenuOpen(false); // auto-close on mobile
    }
  };

  return (
    <div className="main-header-layout">
    {/* <p className="navbar-logo">
      NOVIN 
      <span className="logo-RPA">RPA</span>
    </p> */}
    <img src="/logo.svg" alt="Logo" className="navbar-logo" />
  <nav className="navbar navbar-expand-custom navbar-mainbg">
      <div
        className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
        id="navbarSupportedContent"
        ref={navRef}
      >
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector" ref={selectorRef}>
            <div className="left"/>
            <div className="right"/>
          </div>
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={`nav-item ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleNavClick(index)}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            {/* <a className="nav-link" href={link.href} >  */}
            <Link to={link.href}>
      <div className="nav-item-inner">
        <img
          src={`/icons/${link.icon}`}
          alt={link.label}
          width={25}
          className="nav-icon"
        />

        <span className="nav-label">{link.label}</span>
      </div>
            {/* </a> */}
            </Link>
          </li>
        ))}

        </ul>
      </div>
    </nav>
        <div className="headers-icon-layout">
      <div className="icon"><img width={30} src="/icons/notifications.svg"></img></div>
      <div className="icon"><img width={30} src="/icons/settings.svg"></img></div>
      
      <div className="icon" onClick={handleLogout}>
      <img width={45} src="/png/avatar.png"></img>
      </div>
    </div>
    </div>
  );
}
