import { useState } from "react";
import "./cardTabs.css";

export default function CardTabs() {
  const [active, setActive] = useState(null);
  const [showCards, setShowCards] = useState(false);

  const handleCardClick = (card) => {
    setActive((prev) => (prev === card ? null : card));
  };

  const handleShowCards = () => {
    setShowCards((prev) => !prev);
    setActive(null);
  };

  return (
    <div className="card-tabs-container">
      <button className="card-tabs-btn" onClick={handleShowCards} type="button">
        Topics
      </button>
      {showCards && (
        <div className="card-tabs">
          <div className="card-list">
            <div
              className={`card ${active === "trending" ? "active" : ""}`}
              onClick={() => handleCardClick("trending")}
            >
              <h3>🔥 Trending</h3>
            </div>
            <div
              className={`card ${active === "latest" ? "active" : ""}`}
              onClick={() => handleCardClick("latest")}
            >
              <h3>⭐ Latest</h3>
            </div>
            <div
              className={`card ${active === "recommended" ? "active" : ""}`}
              onClick={() => handleCardClick("recommended")}
            >
              <h3>📌 Recommend</h3>
            </div>
          </div>

          {active && (
            <div className="card-content">
              {active === "trending" && <p>Trending content goes here...</p>}
              {active === "latest" && <p>Latest content goes here...</p>}
              {active === "recommended" && (
                <p>Recommended content goes here...</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
