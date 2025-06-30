import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

export default function BotsReport({ activeBot }) {
  const [historyCount, setHistoryCount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .post("/historyCount", {
        timeFrom: 0,
        timeTo: 1800000000,
        erpModuleId: 1,
        processId: 1,
        robotId: activeBot,
      })
      .then((res) => setHistoryCount(res.data))
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  return (
    <div className="robots-reports-cards">
      <div className="robots-reports-header">گزارش‌های امروز</div>

      <div className="robots-reports-card failed-card">
        <div className="robots-reports-number">{historyCount.failedCount}</div>
        <div className="robots-reports-text">فرآيندهای ناموفق</div>
        <div className="robots-reports-icon">
          <img src="/icons/failed-process.svg" alt="Failed Process Icon" />
        </div>
      </div>

      <div className="robots-reports-card waiting-card">
        <div className="robots-reports-number">{historyCount.runningCount}</div>
        <div className="robots-reports-text">فرآيند در انتظار</div>
        <div className="robots-reports-icon">
          <img src="/icons/wait-process.svg" alt="Waiting Process Icon" />
        </div>
      </div>

      <div className="robots-reports-card success-card">
        <div className="robots-reports-number">{historyCount.successCount}</div>
        <div className="robots-reports-text">فرآيند موفق</div>
        <div className="robots-reports-icon">
          <img src="/icons/success-process.svg" alt="Success Process Icon" />
        </div>
      </div>

      <div className="robots-reports-content">
        <div className="robots-reports-content-header">
          <div className="robots-reports-title">گزارش فعاليت</div>
          <div className="robots-reports-subtitle">در يك سال گذشته</div>
          <div className="robots-reports-legend">
            <div className="robots-reports-legend-item">
              <div className="robots-reports-legend-color completed"></div>
              <div className="robots-reports-legend-label">تكميل شده</div>
            </div>
            <div className="robots-reports-legend-item">
              <div className="robots-reports-legend-color incomplete"></div>
              <div className="robots-reports-legend-label">ناقص</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
