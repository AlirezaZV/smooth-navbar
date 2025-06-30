import "../App.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import PageWrapper from "../components/PageWrapper";
import BotsReport from "../components/BotsReport";
import { useNavigate } from "react-router";

function Bots() {
  const [botsList, setBotsList] = useState([]);
  const [activerobot, setActiveRobot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .post("/robotList")
      .then((res) => setBotsList(res.data.robots))
      .catch((err) => {
        navigate("/login");
      });
  }, []);
  // const jsonRobots = [
  //   {
  //     robotId: 1,
  //     robotName: "Robot 1",
  //     robotState: "Available",
  //     robotStateId: 1,
  //   },
  //   {
  //     robotId: 2,
  //     robotName: "Robot 2",
  //     robotState: "Available",
  //     robotStateId: 0,
  //   },
  // ];
  return (
    <PageWrapper>
      <div className="robots-main">
        <div className="robots-right">
          {botsList.map((robot) => (
            <div
              data-property-1="Default"
              key={robot.robotId}
              className={`robot-card ${
                activerobot === robot.robotId ? "robot-card-active" : ""
              }`}
              onClick={() => setActiveRobot(robot.robotId)}
            >
              <div className="robot-background"></div>
              <div
                className="robot-status"
                data-state-id="1"
                style={{
                  background:
                    robot.robotStateId === 1
                      ? "rgba(84, 214, 44, 0.16)" // Green for available
                      : "rgba(255, 0, 0, 0.16)", // Red for unavailabl
                }}
              >
                <div
                  className="status-text"
                  style={{
                    color: robot.robotStateId === 1 ? "#229A16" : "#FF0000",
                  }}
                >
                  {robot.robotStateId === 1 ? "آزاد" : "مشغول"}
                </div>
              </div>
              <div className="robot-processes">فرآيندها: - از -</div>
              <div className="robot-name">{robot.robotName}</div>
            </div>
          ))}
        </div>

        <div className="robots-left">
          <div className="robots-left-top">
            {activerobot && (
              <PageWrapper>
                <BotsReport activeBot={activerobot} />
              </PageWrapper>
            )}
          </div>
          <div className="robots-left-bottom"></div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Bots;
