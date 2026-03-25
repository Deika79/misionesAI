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
    const res = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ curso, asignatura, contenido }),
    });

    const data = await res.json();

    const generatedLink = `${window.location.origin}/play/${data.id}`;
    setLink(generatedLink);

    setMission(data);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>ClassQuest AI</h1>

      <div style={{ textAlign: "center" }}>
        <input placeholder="Curso" onChange={(e) => setCurso(e.target.value)} />
        <input placeholder="Asignatura" onChange={(e) => setAsignatura(e.target.value)} />
        <input placeholder="Contenido" onChange={(e) => setContenido(e.target.value)} />
        <button onClick={generar}>Generar misión</button>
      </div>

      {/* LINK COPIABLE */}
      {link && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p>Link para alumnos:</p>
          <input value={link} readOnly style={{ width: "60%" }} />
          <button onClick={() => navigator.clipboard.writeText(link)}>
            Copiar
          </button>
        </div>
      )}

      {mission && (
        <Map mission={mission} onNodeClick={setSelectedNode} />
      )}

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