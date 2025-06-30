import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Iconify from "../Iconify"; // Keep or replace with raw <svg> if needed

export default function TableMoreMenu({ actions, open, onClose, onOpen }) {
  const buttonRef = useRef();

  return (
    <>
      <button
        ref={buttonRef}
        onClick={onOpen}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "4px",
        }}
      >
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top:
              open.getBoundingClientRect().bottom + window.scrollY + 8 + "px",
            left: open.getBoundingClientRect().left + window.scrollX + "px",
            width: "160px",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            borderRadius: "8px",
            padding: "4px",
            zIndex: 999,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {actions}
          </div>
          <button
            onClick={onClose}
            style={{
              marginTop: "4px",
              fontSize: "12px",
              background: "none",
              border: "none",
              color: "gray",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

TableMoreMenu.propTypes = {
  actions: PropTypes.node,
  open: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};
