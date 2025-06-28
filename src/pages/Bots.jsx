import "../App.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import PageWrapper from "../components/PageWrapper";
import BotsReport from "../components/BotsReport";

function Bots() {
  const [profile, setProfile] = useState(null);
  const [activerobot, setActiveRobot] = useState(null);
  useEffect(() => {
    api
      .post("/robotList")
      .then((res) => setProfile(res.data))
      .catch(() => {
        console.error("Unauthorized");
      });
  }, []);
  const jsonRobots = [
    {
      robotId: 1,
      robotName: "Robot 1",
      robotState: "Available",
      robotStateId: 1,
    },
    {
      robotId: 2,
      robotName: "Robot 2",
      robotState: "Available",
      robotStateId: 0,
    },
  ];
  return (
    <PageWrapper>
      <div className="robots-main">
        <div className="robots-right">
          {jsonRobots.map((robot) => (
            <div
              class="robot-card"
              data-property-1="Default"
              key={robot.robotId}
              onClick={() => setActiveRobot(robot.robotId)}
            >
              <div class="robot-background"></div>
              <div
                class="robot-status"
                data-state-id="1"
                style={{
                  background:
                    robot.robotStateId === 1
                      ? "rgba(84, 214, 44, 0.16)" // Green for available
                      : "rgba(255, 0, 0, 0.16)", // Red for unavailabl
                }}
              >
                <div
                  class="status-text"
                  style={{
                    color: robot.robotStateId === 1 ? "#229A16" : "#FF0000",
                  }}
                >
                  {robot.robotStateId === 1 ? "آزاد" : "مشغول"}
                </div>
              </div>
              <div class="robot-processes">فرآيندها: - از -</div>
              <div class="robot-name">{robot.robotName}</div>
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
          <div className="robots-left-bottom">3</div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Bots;
