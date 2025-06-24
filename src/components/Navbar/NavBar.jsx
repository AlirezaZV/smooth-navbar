import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import './navStyle.css';

const navLinks = [
  { icon: "mdi:widgets", label: "فرآيندها", href: "#" },
  { icon: "mdi:widgets", label: "داشبورد", href: "#" },
  { icon: "mdi:widgets", label: "ربات‌ها", href: "#" },
];

export default function Navbar({activeNavTab}) {
  
  const [activeIndex, setActiveIndex] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const selectorRef = useRef(null);
  const itemRefs = useRef([]);

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
              <a className="nav-link" href={link.href}>
                <Icon icon={link.icon} fontSize={18} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
        <div className="headers-icon-layout">
      <div className="icon"><img width={50} src="/png/avatar.png"></img></div>
      <div className="icon"><img width={50} src="/png/avatar.png"></img></div>
      <div className="icon"></div>
    </div>
    </div>
  );
}
