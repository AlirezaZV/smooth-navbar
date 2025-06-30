import PropTypes from "prop-types";
import EmptyContent from "../EmptyContent"; // You can replace this too if needed

export default function TableNoData({ isNotFound }) {
  return (
    <>
      {isNotFound ? (
        <tr>
          <td colSpan={9}>
            <EmptyContent
              title="اطلاعاتي موجود نيست!"
              sx={{
                "& span.MuiBox-root": { height: 160 },
              }}
            />
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan={9} style={{ padding: 0 }}></td>
        </tr>
      )}
    </>
  );
}

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
};
