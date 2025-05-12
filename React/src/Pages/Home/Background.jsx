import { useState, useEffect } from "react";
import Home from "./Home";
import ParticlesBackground from "../ParticlesBackground"; 

function Background() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gradient = `radial-gradient(circle at ${position.x}px ${position.y}px, #ffd6f5, #d5fce1)`;

  return (
    <div className="app" style={{ background: gradient }}>
      <ParticlesBackground />
      <Home />
    </div>
  );
}

export default Background;
