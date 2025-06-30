import PropTypes from "prop-types";

export default function TableEmptyRows({ emptyRows, height }) {
  if (!emptyRows) {
    return null;
  }

  return (
    <tr
      style={{
        height: height ? height * emptyRows : undefined,
      }}
    >
      <td colSpan={9}></td>
    </tr>
  );
}

TableEmptyRows.propTypes = {
  emptyRows: PropTypes.number,
  height: PropTypes.number,
};
