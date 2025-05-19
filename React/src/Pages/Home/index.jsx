import { useState, useEffect, useRef } from "react";
import "./style.css";
import api from "../../services/api";
import { Link } from "react-router-dom";

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
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  async function createUsers(e) {
    e.preventDefault();
    setFormError("");

    const email = inputEmail.current.value;
    if (!email.includes("@")) {
      setFormError("Por favor, insira um email válido");
      return;
    }

    try {
      await api.post("/cadastrados", {
        name: inputName.current.value,
        email: email,
        password: inputPassword.current.value,
      });
      inputName.current.value = "";
      inputEmail.current.value = "";
      inputPassword.current.value = "";
      setFormError("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      setFormError("Erro ao cadastrar. Tente novamente.");
    }
  }

  return (
    <div className="container">
      <h1>Bem vinda(o)!</h1>
      <p>Para acessar o sistema, faça o seu cadastro.</p> <br />
      <form onSubmit={createUsers}>
        <div className="nome">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Seu nome"
            ref={inputName}
            required
          />
        </div>

        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email@email.com"
            ref={inputEmail}
            required
          />
        </div>

        <div className="senha">
          <label htmlFor="password">Senha</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Digite sua senha"
              ref={inputPassword}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-5.94M1 1l22 22"></path>
                  <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-5.97"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {formError && <p className="error-message">{formError}</p>}

        <button className="cadastrar-btn" type="submit">
          Cadastrar
        </button>
        <Link to="/login" className="login-btn">
          Já tem conta? Faça login
        </Link>
      </form>
      {showSuccess && (
        <div className="popup-success">
          <div className="popup-content">
            <p>Cadastro realizado com sucesso!</p>
            <button onClick={() => setShowSuccess(false)} className="popup-ok">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Background;
