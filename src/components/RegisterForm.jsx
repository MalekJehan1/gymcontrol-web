import { useState } from "react";

export default function RegisterForm({ onSubmit, loading, erro }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [errors, setErrors] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
  });

  function formatarNome(nome) {
    return nome
      .toLowerCase()
      .split(" ")
      .filter((p) => p.trim() !== "")
      .map((p) => p[0].toUpperCase() + p.substring(1))
      .join(" ");
  }

  const validar = () => {
    const newErrors = { nome: "", sobrenome: "", email: "", senha: "" };
    let ok = true;

    // Nome
    if (!nome.trim()) {
      newErrors.nome = "O nome é obrigatório.";
      ok = false;
    } else if (nome.trim().length < 2) {
      newErrors.nome = "Nome muito curto.";
      ok = false;
    }

    // Sobrenome
    if (!sobrenome.trim()) {
      newErrors.sobrenome = "O sobrenome é obrigatório.";
      ok = false;
    } else if (sobrenome.trim().length < 2) {
      newErrors.sobrenome = "Sobrenome muito curto.";
      ok = false;
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "O email é obrigatório.";
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Digite um email válido.";
      ok = false;
    }

    // Senha
    if (!senha.trim()) {
      newErrors.senha = "A senha é obrigatória.";
      ok = false;
    } else if (senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    onSubmit({
      nome: formatarNome(nome),
      sobrenome: formatarNome(sobrenome),
      email,
      senha,
    });
  };

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-3">
      {/* Erro global */}
      {erro && (
        <div className="bg-red-600 text-white px-4 py-2 rounded-md text-center font-medium">
          {erro}
        </div>
      )}

      {/* Nome */}
      <div className="flex flex-col items-start w-full">
        <label className="mb-1 text-gray-200 font-medium">Nome:</label>
        <input
          type="text"
          className={`w-full px-3 py-2 rounded-lg bg-gray-800 border ${
            errors.nome ? "border-red-500" : "border-gray-600"
          } text-white focus:outline-none focus:ring-2 ${
            errors.nome ? "focus:ring-red-500" : "focus:ring-white"
          } transition`}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        {errors.nome && (
          <span className="text-red-400 text-sm mt-1">{errors.nome}</span>
        )}
      </div>

      {/* Sobrenome */}
      <div className="flex flex-col items-start w-full">
        <label className="mb-1 text-gray-200 font-medium">Sobrenome:</label>
        <input
          type="text"
          className={`w-full px-3 py-2 rounded-lg bg-gray-800 border ${
            errors.sobrenome ? "border-red-500" : "border-gray-600"
          } text-white focus:outline-none focus:ring-2 ${
            errors.sobrenome ? "focus:ring-red-500" : "focus:ring-white"
          } transition`}
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
        {errors.sobrenome && (
          <span className="text-red-400 text-sm mt-1">{errors.sobrenome}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col items-start w-full">
        <label className="mb-1 text-gray-200 font-medium">Email:</label>

        <input
          type="text"
          className={`w-full px-3 py-2 rounded-lg bg-gray-800 border ${
            errors.email ? "border-red-500" : "border-gray-600"
          } text-white focus:outline-none focus:ring-2 ${
            errors.email ? "focus:ring-red-500" : "focus:ring-white"
          } transition`}
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
          } text-white focus:outline-none focus:ring-2 ${
            errors.senha ? "focus:ring-red-500" : "focus:ring-white"
          } transition`}
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
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}
