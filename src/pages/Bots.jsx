import '../App.css'
import { useEffect, useState } from "react";
import api from "../services/api";
import PageWrapper from "../components/PageWrapper";

function Bots() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/profile").then(res => setProfile(res.data)).catch(() => {
      console.error("Unauthorized");
    });
  }, []);

  return (
    <PageWrapper>
        <div>
            <div class="dashboard-main">
                            <div className="left-panel">ربات شماره 1</div>
                <div className="right-panel">گزارش‌های امروز</div>
                <div className="left-panel">ربات شماره 2</div>
            </div>
            
        </div>
    </PageWrapper>
  )
}

export default Bots
