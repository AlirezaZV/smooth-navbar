import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import DetailDialog from "./DetailDialog";
// import Select from "react-select";
// const options = [
//   { value: 5, label: "۵" },
//   { value: 10, label: "۱۰" },
//   { value: 20, label: "۲۰" },
// ];
export function LastPageIcon(props) {
  return (
    <svg
      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium rtl-10dohqv"
      focusable="false"
      width={20}
      height={20}
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="FirstPageIcon"
    >
      <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
    </svg>
  );
}
export function NextPageIcon(props) {
  return (
    <svg
      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium rtl-10dohqv"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      data-testid="KeyboardArrowLeftIcon"
    >
      <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
    </svg>
  );
}
export function FirstPageIcon(props) {
  return (
    <svg
      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium rtl-10dohqv"
      focusable="false"
      width={20}
      height={20}
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="LastPageIcon"
    >
      <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
    </svg>
  );
}
export function PrePageIcon(props) {
  return (
    <svg
      width={20}
      height={20}
      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium rtl-10dohqv"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="KeyboardArrowRightIcon"
    >
      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
    </svg>
  );
}
const TABS = [
  { label: "همه", value: -1 },
  { label: "در انتظار", value: 1 },
  { label: "در حال انجام", value: 2 },
  { label: "موفق", value: 3 },
  { label: "ناموفق", value: 4 },
];
const getStateColor = (state) => {
  console.log(state);

  switch (state) {
    case 3:
      return "text-green-600 bg-green-100";
    case 1:
      return "text-yellow-700 bg-yellow-100";
    case 4:
      return "text-red-700 bg-red-100";
    default:
      return "text-gray-600";
  }
};
export default function PathsTable({ activePath }) {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(-1);
  const [showOnlyRunning, setShowOnlyRunning] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0); // from backend
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .post("/historyList", {
        pageNumber: currentPage,
        paginationLimit: rowPerPage,
        // timeFrom: 0,
        // timeTo: 1800000000,
        // erpModuleId: 1,
        processId: activePath,
        // robotId: 1,
        processStateId: tab !== -1 ? tab : -1,
      })
      .then((res) => {
        setData(res.data.historyList);
        setTotalCount(20); // Backend should return this
      })
      .catch(() => {
        navigate("/login");
      });
  }, [activePath, currentPage, rowPerPage, tab]);

  const filteredData = useMemo(() => {
    return data
      .filter((item) => tab === -1 || item.processStateId === tab)
      .filter((item) =>
        showOnlyRunning ? item.processState === "in_progress" : true
      )
      .filter((item) => item.erpModuleName.includes(search));
  }, [tab, showOnlyRunning, search, data]);

  return (
    <>
      <div className="paths-title">تاريخچه انجام فرآيندها</div>

      <div className="table-wrapper">
        {/* Tabs */}
        <div className="paths-tabs">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`tab-btn ${tab === t.value ? "active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="path-table-filters">
          <input
            type="text"
            placeholder="جستجو فرآيند..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="انتخاب بازه زمانی"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="بخش سازمانی"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <table className="process-table">
          <thead className="process-table-head">
            <tr>
              <th style={{ width: 250 }}>نام فرآیند</th>
              <th style={{ width: 130 }}>بخش سازمانی</th>
              <th style={{ width: 120 }}>زمان شروع</th>
              <th style={{ width: 80 }}>مدت زمان</th>
              <th style={{ width: 80 }}>وضعیت</th>
              <th style={{ width: 70 }}>نام ربات</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "121px 0" }}
                >
                  هیچ داده‌ای موجود نیست
                </td>
              </tr>
            ) : (
              filteredData.map((item, i) => (
                <tr
                  key={i}
                  onClick={() => {
                    setSelectedRow(item);
                    setOpenDialog(true);
                  }}
                >
                  <td>{item.processName}</td>
                  <td>{item.erpModuleName}</td>
                  <td>
                    {new Date(item.startTime * 1000).toLocaleString("fa-IR")}
                  </td>
                  <td>{Math.floor(item.duration / 60)} دقیقه</td>
                  <td>
                    <span
                      className={getStateColor(item.processStateId)}
                      style={{ fontWeight: 600, fontSize: 12 }}
                    >
                      {item.processStateId === 1 && "در انتظار"}
                      {item.processStateId === 2 && "در حال انجام"}
                      {item.processStateId === 3 && "موفق"}
                      {item.processStateId === 4 && "ناموفق"}
                    </span>
                  </td>
                  <td>{item.robotName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="path-table-footer">
          {/* <div className="toggle-switch">
            فقط نمایش فرآيندهای درحال اجرا
            <input
              className="toggle-input"
              id="toggle"
              type="checkbox"
              checked={showOnlyRunning}
              onChange={(e) => setShowOnlyRunning(e.target.checked)}
            />
            <label className="toggle-label" for="toggle"></label>
          </div> */}
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title="اولین صفحه"
            >
              <FirstPageIcon />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              title="صفحه قبلی"
            >
              <PrePageIcon />
            </button>
            <span>
              صفحه {currentPage} از {Math.ceil(totalCount / rowPerPage) || 1}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) =>
                  p < Math.ceil(totalCount / rowPerPage) ? p + 1 : p
                )
              }
              disabled={currentPage >= Math.ceil(totalCount / rowPerPage)}
              title="صفحه بعدی"
            >
              <NextPageIcon />
            </button>
            <button
              onClick={() => setCurrentPage(Math.ceil(totalCount / rowPerPage))}
              disabled={currentPage >= Math.ceil(totalCount / rowPerPage)}
              title="آخرین صفحه"
            >
              <LastPageIcon />
            </button>
            <span style={{ paddingRight: 50 }}>در هر صفحه</span>
            <select
              value={rowPerPage}
              onChange={(e) => {
                setRowPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              title="تعداد در هر صفحه"
            >
              <option value={5}>۵</option>
              <option value={10}>۱۰</option>
              <option value={20}>۲۰</option>
            </select>
          </div>
        </div>
      </div>
      {openDialog && (
        <DetailDialog
          selectedRow={selectedRow}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </>
  );
}
