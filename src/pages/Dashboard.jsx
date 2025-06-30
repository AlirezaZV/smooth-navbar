import "../App.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import PageWrapper from "../components/PageWrapper";
import { useNavigate } from "react-router";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   api
  //     .get("/profile")
  //     .then((res) => setProfile(res.data))
  //     .catch(() => {
  //       navigate("/login");
  //     });
  // }, []);

  return (
    <PageWrapper>
      <div class="coming-soon-wrapper">
        <div class="coming-soon-card">
          <h1>🚧 ...به زودی </h1>
          <p>اين صفحه در دست ساخت است!</p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Dashboard;
