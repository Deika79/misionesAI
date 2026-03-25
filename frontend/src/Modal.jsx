import { useState } from "react";

export default function Modal({ node, onClose, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);

  const checkAnswer = () => {
    if (!node.quiz) return;

    const q = node.quiz[0]; // 1 pregunta simple
    if (selected === q.answer) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Cerrar</button>

        <h2>{node.title}</h2>

        {/* INFO */}
        {node.content && <p>{node.content}</p>}

        {/* VIDEO */}
        {node.videoUrl && (
          <iframe width="400" height="250" src={node.videoUrl}></iframe>
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
                  background: selected === opt ? "#555" : "#222",
                }}
              >
                {opt}
              </button>
            ))}

            <button onClick={checkAnswer}>Comprobar</button>

            {correct === true && <p style={{ color: "lightgreen" }}>✅ Correcto</p>}
            {correct === false && <p style={{ color: "red" }}>❌ Incorrecto</p>}
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