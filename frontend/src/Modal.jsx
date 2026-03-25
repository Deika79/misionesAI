import { useState } from "react";

export default function Modal({ node, onClose, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);

  const checkAnswer = () => {
    if (!node.quiz) return;

    const q = node.quiz[0];
    if (selected === q.answer) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  // 🔥 FUNCIÓN CLAVE PARA ARREGLAR LOS VÍDEOS
  const getEmbedUrl = (url) => {
    if (!url) return "";

    // YouTube normal
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    // YouTube corto
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Ya es embed
    if (url.includes("embed")) {
      return url;
    }

    // fallback (por si metes otra fuente)
    return url;
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Cerrar</button>

        <h2>{node.title}</h2>

        {/* INFO */}
        {node.content && <p>{node.content}</p>}

        {/* 🎬 VIDEO CORREGIDO */}
        {node.videoUrl && (
          <div style={{ margin: "15px 0" }}>
            <iframe
              width="100%"
              height="250"
              src={getEmbedUrl(node.videoUrl)}
              title="video"
              style={{ borderRadius: "8px" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* QUIZ */}
        {node.quiz && (
          <div>
            <h3>{node.quiz[0].question}</h3>

            {node.quiz[0].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(opt)}
                style={{
                  display: "block",
                  margin: "5px",
                  background: selected === opt ? "#4cafef" : "#333",
                  color: "white",
                }}
              >
                {opt}
              </button>
            ))}

            <button onClick={checkAnswer}>Comprobar</button>

            {correct === true && (
              <p style={{ color: "lightgreen" }}>✅ Correcto</p>
            )}
            {correct === false && (
              <p style={{ color: "red" }}>❌ Incorrecto</p>
            )}
          </div>
        )}

        {/* COMPLETAR */}
        {(!node.quiz || correct) && (
          <button onClick={onComplete}>
            Completar misión ✅
          </button>
        )}
      </div>
    </div>
  );
}