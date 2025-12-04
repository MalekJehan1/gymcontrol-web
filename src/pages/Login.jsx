import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import api from "../api/api";
import { gravaAutenticacao } from "../auth/Autenticacao";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import loginBg from "../assets/login-image.jpg";
import { getToken } from "../auth/Autenticacao";
import {
  // navbarBase,
  // logoBase,
  // logoText,
  logoGym,
  logoControl,
  // linkDefault,
  // buttonPrimary,
} from "../utils/navbarBaseClasses";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  //
  const [modo, setModo] = useState(location.state?.modo || "login");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.modo) {
      setModo(location.state.modo);
    }
  }, [location.state]);

  // bloqueia acesso ao login se já estiver autenticado
  if (getToken()) {
    return <Navigate to="/home" replace />;
  }

  const navigateToPage = () => {
    navigate("/home");
  };

  const fazerLogin = async ({ email, senha }) => {
    setErro("");
    setLoading(true);
    try {
      const resp = await api.post("/auth/login", { email, senha });

      if (resp.data.auth === true) {
        gravaAutenticacao(resp.data);
        console.log("Login bem-sucedido, redirecionando para a home...");
        console.log(resp.data);

        navigateToPage();
      }
    } catch {
      setErro("Email ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  const fazerRegistro = async ({ nome, sobrenome, email, senha }) => {
    setErro("");
    setLoading(true);
    try {
      console.log(nome + sobrenome + email + senha);

      // Login automático após registrar
      const resp = await api.post("/auth/register", {
        nome,
        sobrenome,
        email,
        senha,
      });

      if (resp.data.auth === true) {
        gravaAutenticacao(resp.data);
        console.log("Login bem-sucedido, redirecionando para a home...");
        console.log(resp.data);
        navigateToPage();
      }
    } catch {
      setErro("Erro ao registrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-black via-neutral-900 to-black text-white relative">
      {/* Imagem decorativa maior */}
      <img
        src={loginBg}
        alt="Decorativa"
        className="hidden lg:block absolute top-0 left-0 w-1/2 h-100 object-cover opacity-30"
      />

      <div className="hidden lg:flex w-1/2 h-auto items-center justify-center px-20 h-screen relative z-10">
        <h1 className="text-7xl font-extrabold tracking-wide transition-all duration-200 group-hover:scale-105">
          <span className={logoGym}>Gym</span>
          <span className={logoControl}>Control</span>
        </h1>
      </div>

      {/* Formulário à direita, mais centralizado */}
      <div className="w-1/2 ml-auto flex items-center justify-center px-20 h-screen relative z-10">
        <div
          className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-black/70
                    backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md text-white"
        >
          {/* Título */}
          <h3 className="text-3xl font-extrabold mb-3  text-white drop-shadow-lg text-center">
            {modo === "login" ? "Entrar" : "Criar Conta"}
          </h3>

          {/* Formulário */}
          {modo === "login" ? (
            <LoginForm onSubmit={fazerLogin} loading={loading} erro={erro} />
          ) : (
            <RegisterForm
              onSubmit={fazerRegistro}
              loading={loading}
              erro={erro}
            />
          )}

          {/* Alternar modo login/register */}
          <div className="text-center mt-6 text-gray-300">
            {modo === "login" ? (
              <>
                Não tem conta?{" "}
                <button
                  className="text-white font-semibold hover:text-gray-300 transition-colors"
                  onClick={() => setModo("register")}
                >
                  Registre-se
                </button>
              </>
            ) : (
              <>
                Já possui conta?{" "}
                <button
                  className="text-white font-semibold hover:text-gray-300 transition-colors"
                  onClick={() => setModo("login")}
                >
                  Acesse agora
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
