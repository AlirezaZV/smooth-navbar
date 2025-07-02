import { useEffect, useState } from "react";
import api from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";

export function CloseIcon(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_243_574)">
        <path
          d="M10 20C4.47059 20 0 15.5294 0 10C0 4.47059 4.47059 0 10 0C15.5294 0 20 4.47059 20 10C20 15.5294 15.5294 20 10 20ZM10 1.17647C5.11765 1.17647 1.17647 5.11765 1.17647 10C1.17647 14.8824 5.11765 18.8235 10 18.8235C14.8824 18.8235 18.8235 14.8824 18.8235 10C18.8235 5.11765 14.8824 1.17647 10 1.17647Z"
          fill="#637381"
        />
        <path
          d="M6.57518 6.57544C6.8929 6.25764 7.40809 6.2576 7.72586 6.57535L13.9249 12.774C14.2426 13.0917 14.2426 13.6068 13.925 13.9246C13.6072 14.2424 13.092 14.2424 12.7743 13.9247L6.57527 7.726C6.25755 7.40829 6.25751 6.89319 6.57518 6.57544Z"
          fill="#637381"
        />
        <path
          d="M13.9246 6.57511C14.2424 6.89283 14.2424 7.40802 13.9247 7.72579L7.726 13.9248C7.40829 14.2425 6.89319 14.2426 6.57543 13.9249C6.25764 13.6072 6.2576 13.092 6.57535 12.7742L12.774 6.5752C13.0917 6.25748 13.6068 6.25744 13.9246 6.57511Z"
          fill="#637381"
        />
      </g>
      <defs>
        <clipPath id="clip0_243_574">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function DetailDialog({ selectedRow, onClose }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .post("/getHistoryLog", {
        historyId: selectedRow.historyId,
        viewType: 0,
      })
      .then((res) => {
        setData(res.data.logList);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        className="process-dialog-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="process-dialog-box"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="process-dialog-container">
            <div className="process-dialog-bg2" />
            <div className="process-dialog-box-info">
              <div className="process-dialog-chip">
                <div className="process-dialog-chip-bg" />
                <div className="process-dialog-chip-text">1234567</div>
              </div>
            </div>
            {/* <div className="process-dialog-note process-dialog-note-green">
              <div className="process-dialog-note-text">
                فاکتور مربوط به برگه خدمت‌هاي زير، مربوط به تعمیرات دستگاه
                جایگزین سرویس ثبت نگردید. (موارد زير به صورت دستی ثبت گردد.)
              </div>
              <div className="process-dialog-note-dot" />
            </div> */}
            <div className="process-dialog-header">
              <div className="process-dialog-title">
                <span className="process-dialog-title-bold">
                  جزئيات فرآيند{" "}
                </span>
                <span className="process-dialog-title-light">
                  {selectedRow.processName} در تاريخ{" "}
                  {new Date(selectedRow.startTime * 1000).toLocaleString(
                    "fa-IR"
                  )}
                </span>
              </div>
              <div className="process-dialog-close-icon" onClick={onClose}>
                <CloseIcon />
              </div>
            </div>
            <div className="process-dialog-bg1" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
