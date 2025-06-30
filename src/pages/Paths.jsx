import "../App.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import PageWrapper from "../components/PageWrapper";
import { useNavigate } from "react-router";

function Paths() {
  const [pathsLists, setPathsLists] = useState([]);
  const [activePathList, setActicePathList] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    api
      .post("/processList")
      .then((res) => setPathsLists(res.data.processes))
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return (
    <PageWrapper>
      <div className="paths-main">
        <div className="paths-right">
          <div className="paths-title">ليست فرآيندها</div>
          <div className="paths-container">
            {pathsLists.map((paths) => (
              <div
                className={`paths-box ${
                  activePathList === paths.processId ? "paths-box-active" : ""
                }`}
                data-property-1="Default"
                key={paths.processId}
                onClick={() => setActicePathList(paths.processId)}
              >
                <div className="paths-box-title">{paths.processName}</div>
                <div className="paths-label">
                  <div className="paths-label-text">{paths.erpModuleName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="paths-left">
          <div className="paths-left-top"></div>
          <div className="paths-left-bottom"></div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Paths;
