import { useState } from "react";

export default function LoginForm({ onSubmit, loading, erro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [errors, setErrors] = useState({ email: "", senha: "" });

  const validar = () => {
    const newErrors = { email: "", senha: "" };
    let valido = true;

    // Validação do email
    if (!email.trim()) {
      newErrors.email = "O email é obrigatório.";
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Digite um email válido.";
      valido = false;
    }

    // Validação da senha
    if (!senha.trim()) {
      newErrors.senha = "A senha é obrigatória.";
      valido = false;
    }

    setErrors(newErrors);
    return valido;
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    onSubmit({ email, senha });
  };

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-3">
      {erro && (
        <div className="bg-red-600 text-white px-4 py-2 rounded-md text-center font-medium">
          {erro}
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col items-start w-full">
        <label className="mb-1 text-gray-200 font-medium">Email:</label>

        <input
          type="text"
          className={`w-full px-3 py-2 rounded-lg bg-gray-800 border ${
            errors.email ? "border-red-500" : "border-gray-600"
          } text-white focus:outline-none focus:ring-2 
          ${errors.email ? "focus:ring-red-400" : "focus:ring-white"}
          transition`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errors.email && (
          <span className="text-red-400 text-sm mt-1">{errors.email}</span>
        )}
      </div>

      {/* Senha */}
      <div className="flex flex-col items-start w-full">
        <label className="mb-1 text-gray-200 font-medium">Senha:</label>

        <input
          type="password"
          className={`w-full px-3 py-2 rounded-lg bg-gray-800 border ${
            errors.senha ? "border-red-500" : "border-gray-600"
          } text-white focus:outline-none focus:ring-2 
          ${errors.senha ? "focus:ring-red-400" : "focus:ring-white"}
          transition`}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {errors.senha && (
          <span className="text-red-400 text-sm mt-1">{errors.senha}</span>
        )}
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="mt-2 px-6 py-2 rounded-2xl bg-white text-black font-semibold shadow-lg
        hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
