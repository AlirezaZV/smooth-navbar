import PropTypes from "prop-types";

export default function TableSelectedActions({
  dense,
  actions,
  rowCount,
  numSelected,
  onSelectAllRows,
}) {
  const isSelectedAll = rowCount > 0 && numSelected === rowCount;
  const isIndeterminate = numSelected > 0 && numSelected < rowCount;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 8,
        height: 55,
        zIndex: 9,
        borderRadius: "8px",
        width: "calc(100% - 16px)",
        backgroundColor: "#f0f4ff", // Replace with your theme's primary.lighter
        padding: "0 16px",
        paddingLeft: dense ? "8px" : "16px",
      }}
    >
      <input
        type="checkbox"
        checked={isSelectedAll}
        ref={(el) => {
          if (el) el.indeterminate = isIndeterminate;
        }}
        onChange={(e) => {
          console.log(e.target.checked);
          onSelectAllRows(e.target.checked);
        }}
        style={{ marginRight: "12px" }}
      />

      <span
        style={{
          marginLeft: dense ? "24px" : "16px",
          flexGrow: 1,
          fontSize: "16px",
          fontWeight: "600",
          color: "#1a73e8", // Replace with your theme's primary.main
        }}
      >
        {numSelected} انتخاب شده
      </span>

      {actions && actions}
    </div>
  );
}

TableSelectedActions.propTypes = {
  dense: PropTypes.bool,
  actions: PropTypes.node,
  rowCount: PropTypes.number,
  numSelected: PropTypes.number,
  onSelectAllRows: PropTypes.func,
};
