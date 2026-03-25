import { useEffect, useState } from "react";
import Map from "./Map";

export default function Player() {
  const [mission, setMission] = useState(null);

  useEffect(() => {
    const id = window.location.pathname.split("/play/")[1];

    fetch(`${import.meta.env.VITE_API_URL}/api/mission/${id}`)
      .then((res) => res.json())
      .then(setMission);
  }, []);

  if (!mission) return <p>Cargando...</p>;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Modo Alumno 🎮</h1>
      <Map mission={mission} />
    </div>
  );
}