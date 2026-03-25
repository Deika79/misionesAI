import { useState } from "react";
import Node from "./Node";

function getTheme(theme) {
  if (!theme) return "jungla";

  const t = theme.toLowerCase();

  if (t.includes("espacio") || t.includes("space") || t.includes("planeta"))
    return "espacio";

  if (
    t.includes("animal") ||
    t.includes("mamífero") ||
    t.includes("jungla") ||
    t.includes("selva")
  )
    return "jungla";

  if (t.includes("mar") || t.includes("océano"))
    return "oceano";

  if (t.includes("historia") || t.includes("edad media"))
    return "castillo";

  return "jungla";
}

export default function Map({ mission, onNodeClick }) {
  const [currentStep, setCurrentStep] = useState(0);
  const themeClass = getTheme(mission.theme);

  const handleClick = (node, index) => {
    if (index <= currentStep) {
      onNodeClick({ node, index, setCurrentStep });
    }
  };

  return (
    <div
      className="map"
      style={{
       backgroundImage: `url(${mission.image})`,
       backgroundSize: "cover",
       backgroundPosition: "center",
  }}
>
      <h2>{mission.title}</h2>

      <svg className="lines">
        <line x1="10%" y1="65%" x2="30%" y2="45%" />
        <line x1="30%" y1="45%" x2="55%" y2="55%" />
        <line x1="55%" y1="55%" x2="75%" y2="35%" />
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