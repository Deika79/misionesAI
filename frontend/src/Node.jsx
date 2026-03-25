export default function Node({ node, index, onClick, locked }) {
  return (
    <div
      className={`node node-${index} ${locked ? "locked" : ""}`}
      onClick={!locked ? onClick : undefined}
      style={{
        position: "absolute", // 🔥 asegurar referencia correcta
      }}
    >
      <div
        style={{
          pointerEvents: "none", // 🔥 evita que el texto rompa el click
        }}
      >
        <h3 style={{ margin: 0, fontSize: "14px" }}>{node.title}</h3>
        {locked && <span>🔒</span>}
      </div>
    </div>
  );
}