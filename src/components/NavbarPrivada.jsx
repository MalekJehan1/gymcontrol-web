import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { logout, getUsuario } from "../auth/Autenticacao";

function Navbar({ links = [] }) {
  const [open, setOpen] = useState(false);
  const usuario = getUsuario();

  return (
    <nav className="w-full bg-black/40 backdrop-blur-lg border-b border-neutral-800 py-4 px-8 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide">
        Gym<span className="text-blue-400">Control</span>
      </h1>

      {/* Links do menu */}
      <div className="hidden md:flex items-center gap-6 text-gray-200">
        {links.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="hover:text-white transition text-gray-300"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Avatar + Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center"
        >
          <FaUserCircle className="text-4xl text-gray-300 hover:text-white transition" />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-neutral-900/90 backdrop-blur-xl rounded-xl shadow-xl border border-neutral-800 p-2">
            <p className="text-gray-300 px-3 py-2 text-sm border-b border-neutral-700">
              Olá{" "}
              <span className="font-semibold text-white">{usuario?.nome}</span>
            </p>

            <Link
              to="/perfil"
              className="block px-3 py-2 text-gray-300 hover:bg-neutral-800 hover:text-white rounded-lg transition"
            >
              Meu Perfil
            </Link>

            <Link
              to="/configuracoes"
              className="block px-3 py-2 text-gray-300 hover:bg-neutral-800 hover:text-white rounded-lg transition"
            >
              Configurações
            </Link>

            <button
              onClick={() => logout()}
              className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
