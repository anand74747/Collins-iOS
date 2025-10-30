import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ResultsPage.css";

const ResultsPage = () => {
  const navigate = useNavigate();

  // Redirect to scanner page since we're using popup approach
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="results-page">
      <div className="redirecting">
        <h2>Redirecting to scanner...</h2>
      </div>
    </div>
  );
};

export default ResultsPage;
