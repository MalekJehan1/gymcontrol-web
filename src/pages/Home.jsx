import { Link } from "react-router-dom";

import NavbarPublica from "../components/NavbarPublica.jsx";

export default function Home() {
  return (
    <NavbarPublica>
      <div className="items-center flex flex-col">
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight ">
          Controle Completo da Sua Academia
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-10 max-w-3xl">
          Sistema moderno para gerenciamento de treinos, acompanhamento de
          alunos, organização de exercícios e muito mais. Simples, rápido e
          intuitivo para alunos, professores e administradores.
        </p>

        <div className="flex gap-6">
          <Link
            to="/login"
            className="px-8 py-3 rounded-xl bg-white text-black font-semibold shadow-lg hover:bg-gray-200 transition no-underline"
          >
            Entrar
          </Link>

          <Link
            to="/login"
            state={{ modo: "register" }}
            className="px-8 py-3 rounded-xl bg-transparent border-2 border-white font-semibold hover:bg-white hover:text-black transition text-white no-underline"
          >
            Registrar
          </Link>
        </div>
      </div>
    </NavbarPublica>
  );
}
