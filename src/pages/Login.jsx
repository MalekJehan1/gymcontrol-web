import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import api from "../api/api";
import { gravaAutenticacao } from "../auth/Autenticacao";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import loginBg from "../assets/login-image.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [modo, setModo] = useState("login");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

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

      {/* Formulário à direita, mais centralizado */}
      <div className="flex flex-1 items-center justify-end px-16 min-h-screen">
        <div
          className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-black/70
                    backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md text-white"
        >
          {/* Título */}
          <h3 className="text-3xl font-extrabold mb-8  text-white drop-shadow-lg text-center">
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
                Já tem conta?{" "}
                <button
                  className="text-white font-semibold hover:text-gray-300 transition-colors"
                  onClick={() => setModo("login")}
                >
                  Entre
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
