export default function BotsReport({ activeBot }) {
  return (
    <div class="robots-reports-cards">
      <div class="robots-reports-header">گزارش‌های امروز</div>

      <div class="robots-reports-card failed-card">
        <div class="robots-reports-number">5</div>
        <div class="robots-reports-text">فرآيندهای ناموفق</div>
        <div class="robots-reports-icon">
          <img src="/icons/failed-process.svg" alt="Failed Process Icon" />
        </div>
      </div>

      <div class="robots-reports-card waiting-card">
        <div class="robots-reports-number">20</div>
        <div class="robots-reports-text">فرآيند در انتظار</div>
        <div class="robots-reports-icon">
          <img src="/icons/wait-process.svg" alt="Waiting Process Icon" />
        </div>
      </div>

      <div class="robots-reports-card success-card">
        <div class="robots-reports-number">25</div>
        <div class="robots-reports-text">فرآيند موفق</div>
        <div class="robots-reports-icon">
          <img src="/icons/success-process.svg" alt="Success Process Icon" />
        </div>
      </div>

      <div class="robots-reports-content">
        <div class="robots-reports-content-header">
          <div class="robots-reports-title">گزارش فعاليت</div>
          <div class="robots-reports-subtitle">در يك سال گذشته</div>
          <div class="robots-reports-legend">
            <div class="robots-reports-legend-item">
              <div class="robots-reports-legend-color completed"></div>
              <div class="robots-reports-legend-label">تكميل شده</div>
            </div>
            <div class="robots-reports-legend-item">
              <div class="robots-reports-legend-color incomplete"></div>
              <div class="robots-reports-legend-label">ناقص</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
