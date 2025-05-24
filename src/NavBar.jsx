import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const navLinks = [
  { icon: "mdi:dashboard", label: "صفحه اصلی", href: "#" },
  { icon: "mdi:address-book", label: "منوي 2", href: "#" },
  { icon: "mdi:widgets", label: "منوي 3", href: "#" },
//   { icon: "mdi:calendar-month", label: "Calendar", href: "#" },
//   { icon: "mdi:chart-bar", label: "Charts", href: "#" },
//   { icon: "mdi:file-document-outline", label: "Documents", href: "#" },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const selectorRef = useRef(null);
  const itemRefs = useRef([]);

  const updateSelector = () => {
    const activeEl = itemRefs.current[activeIndex];
    const selector = selectorRef.current;

    if (activeEl && selector) {
      const rect = activeEl.getBoundingClientRect();
      const parentRect = navRef.current.getBoundingClientRect();

      selector.style.top = `${activeEl.offsetTop}px`;
      selector.style.left = `${activeEl.offsetLeft}px`;
      selector.style.width = `${activeEl.offsetWidth}px`;
    //   selector.style.height = `${activeEl.offsetHeight}px`;
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
    updateSelector();
    if (window.innerWidth < 992) {
      setMenuOpen(false); // auto-close on mobile
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setTimeout(updateSelector, 300);
  };

  return (
    <nav className="navbar navbar-expand-custom navbar-mainbg">
      <a className="navbar-brand navbar-logo" href="#">
        Navbar test
      </a>
      <button
        className="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <Icon icon="mdi:menu" className="text-white" fontSize={24} />
      </button>
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
              <a className="nav-link" href={link.href}>
                <Icon icon={link.icon} fontSize={18} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
