import { useState } from "react";
import Map from "./Map";
import Modal from "./Modal";

export default function App() {
  const [curso, setCurso] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [contenido, setContenido] = useState("");
  const [mission, setMission] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [link, setLink] = useState("");

  const generar = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ curso, asignatura, contenido }),
      }
    );

    const data = await res.json();

    const generatedLink = `${window.location.origin}/play/${data.id}`;
    setLink(generatedLink);

    setMission(data);
  };

  return (
    <div className="app">
      {/* 🔥 BANNER */}
      <div className="banner">
        <img src="/banner.png" alt="banner" />
      </div>

      {/* FORM */}
      <div className="form-container">
        <input placeholder="Curso" onChange={(e) => setCurso(e.target.value)} />
        <input placeholder="Asignatura" onChange={(e) => setAsignatura(e.target.value)} />
        <input placeholder="Contenido" onChange={(e) => setContenido(e.target.value)} />
        <button onClick={generar}>Generar misión</button>
      </div>

      {/* LINK */}
      {link && (
        <div className="link-box">
          <p>Link para alumnos:</p>
          <input value={link} readOnly />
          <button onClick={() => navigator.clipboard.writeText(link)}>
            Copiar
          </button>
        </div>
      )}

      {/* MAPA */}
      {mission && (
        <Map mission={mission} onNodeClick={setSelectedNode} />
      )}

      {/* MODAL */}
      {selectedNode && (
        <Modal
          node={selectedNode.node}
          onClose={() => setSelectedNode(null)}
          onComplete={() => {
            selectedNode.setCurrentStep((prev) => prev + 1);
            setSelectedNode(null);
          }}
        />
      )}
    </div>
  );
}