import PropTypes from "prop-types";
import { useState } from "react";

// CSS for visually hidden element
const visuallyHiddenStyle = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

export default function TableHeadCustom({
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx = {},
}) {
  const isSelectedAll = rowCount > 0 && numSelected === rowCount;
  const isIndeterminate = numSelected > 0 && numSelected < rowCount;

  return (
    <thead style={sx}>
      <tr>
        {onSelectAllRows && (
          <th>
            <input
              type="checkbox"
              checked={isSelectedAll}
              ref={(el) => {
                if (el) el.indeterminate = isIndeterminate;
              }}
              onChange={(e) => onSelectAllRows(e.target.checked)}
            />
          </th>
        )}

        {headLabel.map((headCell) => (
          <th
            key={headCell.id}
            style={{
              textAlign: headCell.align || "left",
              width: headCell.width,
              minWidth: headCell.minWidth,
              cursor:
                headCell.id === "testTime" && onSort ? "pointer" : "default",
              textTransform: headCell.id === "testTime" ? "capitalize" : "none",
            }}
            onClick={() => {
              if (onSort && headCell.id === "testTime") onSort(headCell.id);
            }}
          >
            {headCell.label}
            {onSort &&
              headCell.id === "testTime" &&
              orderBy === headCell.id && (
                <>
                  <span style={{ marginLeft: 5 }}>
                    {order === "asc" ? "↑" : "↓"}
                  </span>
                  <span style={visuallyHiddenStyle}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                </>
              )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeadCustom.propTypes = {
  onSort: PropTypes.func,
  orderBy: PropTypes.string,
  headLabel: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      width: PropTypes.string,
      minWidth: PropTypes.string,
    })
  ).isRequired,
  rowCount: PropTypes.number,
  numSelected: PropTypes.number,
  onSelectAllRows: PropTypes.func,
  order: PropTypes.oneOf(["asc", "desc"]),
  sx: PropTypes.object,
};
