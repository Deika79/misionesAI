import { useState, useEffect } from "react";
import Node from "./Node";

export default function Map({ mission, onNodeClick }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    console.log("MISSION COMPLETA:", mission);
    console.log("IMAGEN:", mission.image);
  }, [mission]);

  const handleClick = (node, index) => {
    if (index <= currentStep) {
      onNodeClick({ node, index, setCurrentStep });
    }
  };

  return (
    <div
      className="map"
      style={{
        backgroundImage: mission.image ? `url(${mission.image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2>{mission.title}</h2>

      {/* 🔥 SVG CORREGIDO */}
      <svg
        className="lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="10" y1="60" x2="30" y2="40" />
        <line x1="30" y1="40" x2="55" y2="50" />
        <line x1="55" y1="50" x2="75" y2="30" />
      </svg>

      <div className="path">
        {mission.nodes.map((node, i) => (
          <Node
            key={i}
            node={node}
            index={i}
            onClick={() => handleClick(node, i)}
            locked={i > currentStep}
          />
        ))}
      </div>
    </div>
  );
}