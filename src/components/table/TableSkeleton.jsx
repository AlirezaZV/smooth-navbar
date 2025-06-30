export default function TableSkeleton({ ...other }) {
  return (
    <tr {...other}>
      <td colSpan={9}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            padding: "12px 0",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#e0e0e0",
              borderRadius: "8px",
              animation: "pulse 1.5s infinite",
            }}
          ></div>

          {[240, 160, 160, 160, 160].map((width, index) => (
            <div
              key={index}
              style={{
                width: `${width}px`,
                height: "20px",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                animation: "pulse 1.5s infinite",
              }}
            ></div>
          ))}
        </div>
      </td>
    </tr>
  );
}
