import { useState, useEffect, useRef } from "react";
import "./style.css";
import api from "../../services/api";

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
      <Home />
    </div>
  );
}

function Home() {
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function createUsers(e) {
    e.preventDefault();
    await api.post("/cadastrados", {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    });
    inputName.current.value = "";
    inputEmail.current.value = "";
    inputPassword.current.value = "";
  }

  return (
    <div className="container">
      <h1>Bem vinda(o)!</h1>
      <p>Para acessar o sistema, faça o seu cadastro.</p> <br />
      <form>
        <div className="nome">
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" placeholder="Seu nome" ref={inputName} />
        </div>

        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email@email.com"
            ref={inputEmail}
          />
        </div>

        <div className="senha">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            ref={inputPassword}
          />
        </div>

        <button className="learn-more" type="submit" onClick={createUsers}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Background;
