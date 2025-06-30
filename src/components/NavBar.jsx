import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function DashboardIcon(props) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.87256 4.76496C1.87256 4.26825 2.06988 3.79187 2.42111 3.44064C2.77234 3.08941 3.24871 2.89209 3.74543 2.89209H9.36405V19.7479H3.74543C3.24871 19.7479 2.77234 19.5506 2.42111 19.1994C2.06988 18.8482 1.87256 18.3718 1.87256 17.8751V4.76496ZM13.1098 2.89209H18.7284C19.2251 2.89209 19.7015 3.08941 20.0527 3.44064C20.404 3.79187 20.6013 4.26825 20.6013 4.76496V9.44714H13.1098V2.89209ZM13.1098 13.1929H20.6013V17.8751C20.6013 18.3718 20.404 18.8482 20.0527 19.1994C19.7015 19.5506 19.2251 19.7479 18.7284 19.7479H13.1098V13.1929Z"
        stroke-width="1.87287"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function BotsIcon(props) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.79761 3.14C1.79761 2.58771 2.24532 2.14 2.79761 2.14H19.6724C20.2247 2.14 20.6724 2.58772 20.6724 3.14V15.05C20.6724 15.6023 20.2247 16.05 19.6724 16.05H2.79761C2.24532 16.05 1.79761 15.6023 1.79761 15.05V3.14Z"
        stroke-width="1.8"
      />
      <path d="M9.00001 16.05H13V21H9.00001V16.05Z" stroke-width="1.8" />
      <path d="M5.80005 21H16.3" stroke-width="1.8" />
    </svg>
  );
}

export function PathsIcon(props) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 19.1L20 19.1M2 19.1L9 19.1M11 16.25V14.35"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <path
        d="M5 7.7H18M5 7.7C3.34315 7.7 2 6.42401 2 4.85C2 3.27599 3.34315 2 5 2H18C19.6569 2 21 3.27599 21 4.85C21 6.42401 19.6569 7.7 18 7.7M5 7.7C3.34315 7.7 2 8.97599 2 10.55C2 12.124 3.34315 13.4 5 13.4H18C19.6569 13.4 21 12.124 21 10.55C21 8.97599 19.6569 7.7 18 7.7M11 21C9.89543 21 9 20.1493 9 19.1C9 18.0507 9.89543 17.2 11 17.2C12.1046 17.2 13 18.0507 13 19.1C13 20.1493 12.1046 21 11 21Z"
        stroke-width="1.8"
      />
    </svg>
  );
}

const navLinks = [
  { icon: 0, label: "فرآيندها", href: "/paths" },
  { icon: 1, label: "ربات‌ها", href: "/robots" },
  { icon: 2, label: "داشبورد", href: "/dashboard" },
];

export default function Navbar({ activeNavTab }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const selectorRef = useRef(null);
  const itemRefs = useRef([]);
  const location = useLocation(); // Get the current URL

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
      window.removeEventListener("resize", () =>
        setTimeout(updateSelector, 500)
      );
  }, [activeIndex]);

  useEffect(() => {
    // Set activeIndex based on the current URL path
    const currentPath = location.pathname;
    const index = navLinks.findIndex((link) => link.href === currentPath);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, []);

  const handleNavClick = (index) => {
    setActiveIndex(index);
    activeNavTab(index);
    updateSelector();
    if (window.innerWidth < 992) {
      setMenuOpen(false); // auto-close on mobile
    }
  };

  return (
    <div className="main-header-layout">
      <div className="headers-icon-layout">
        <div className="icon" onClick={handleLogout}>
          <img width={45} src="/png/avatar.png"></img>
        </div>
        <div className="icon">
          <img width={30} src="/icons/settings.svg"></img>
        </div>
        <div className="icon">
          <img width={30} src="/icons/notifications.svg"></img>
        </div>
      </div>

      <nav className="navbar navbar-expand-custom navbar-mainbg">
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarSupportedContent"
          ref={navRef}
        >
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector" ref={selectorRef}>
              <div className="left" />
              <div className="right" />
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
                    {link.icon === 0 && <PathsIcon />}
                    {link.icon === 1 && <BotsIcon />}
                    {link.icon === 2 && <DashboardIcon />}
                    <span className="nav-label">{link.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <img src="/logo.svg" alt="Logo" className="navbar-logo" />
    </div>
  );
}
