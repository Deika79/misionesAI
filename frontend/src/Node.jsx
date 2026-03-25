export default function Node({ node, index, onClick, locked }) {
  return (
    <div
      className={`node node-${index} ${locked ? "locked" : ""}`}
      onClick={!locked ? onClick : null}
    >
      <h3>{node.title}</h3>
      {locked && <span>🔒</span>}
    </div>
  );
}