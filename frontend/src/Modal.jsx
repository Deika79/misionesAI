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

  console.log("NODE:", node);

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Cerrar</button>

        <h2>{node.title}</h2>

        {/* INFO */}
        {node.type === "info" && <p>{node.content}</p>}

        {/* 🎬 VIDEO (FIX REAL) */}
        {node.type === "video" && node.videoUrl && (
          <div style={{ margin: "15px 0" }}>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%", // 16:9
                height: 0,
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <iframe
                src={node.videoUrl}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        )}

        {/* SIN VIDEO */}
        {node.type === "video" && !node.videoUrl && (
          <p style={{ color: "#888" }}>
            ⚠️ No se ha generado vídeo
          </p>
        )}

        {/* QUIZ */}
        {node.type === "quiz" && node.quiz && (
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

        {/* RETO */}
        {node.type === "reto" && <p>{node.content}</p>}

        {/* COMPLETAR */}
        {(node.type !== "quiz" || correct) && (
          <button onClick={onComplete}>
            Completar misión ✅
          </button>
        )}
      </div>
    </div>
  );
}