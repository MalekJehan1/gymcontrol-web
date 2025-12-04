import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { logout, getUsuario } from "../auth/Autenticacao";
import {
  navbarBase,
  logoBase,
  logoText,
  logoGym,
  logoControl,
  linkDefault,
} from "../utils/navbarBaseClasses";

function NavbarPrivada({ links = [] }) {
  const [open, setOpen] = useState(false);
  const usuario = getUsuario();

  const finalLinks = [...links];

  finalLinks.push({ label: "Dashboard", to: "/dashboard" });
  finalLinks.push({ label: "Treinos", to: "/treinos" });

  if (usuario?.tipo === "admin") {
    finalLinks.push(
      { label: "Usuários", to: "/admin/usuarios" },
      { label: "Exercícios", to: "/admin/exercicios" }
      // { label: "Configurações", to: "/config" }
    );
  }

  return (
    <nav className={navbarBase}>
      {/* LOGO */}
      <Link to="/home" className={logoBase}>
        <h1 className={logoText}>
          <span className={logoGym}>Gym</span>
          <span className={logoControl}>Control</span>
        </h1>
      </Link>

      {/* Links do menu */}
      <nav className="flex items-center gap-6 text-gray-200">
        {finalLinks.map((item, index) => (
          <Link key={index} to={item.to} className={linkDefault}>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Avatar */}
      <div className="relative">
        <button onClick={() => setOpen(!open)}>
          <FaUserCircle className="text-4xl text-gray-300 hover:text-white transition" />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-neutral-900/90 backdrop-blur-xl rounded-xl shadow-xl border border-neutral-800 p-2">
            <p className="text-gray-300 px-3 py-3 text-lg border-b border-neutral-700">
              Olá{" "}
              <span className="font-semibold text-white">{usuario?.nome}</span>
            </p>

            <Link
              to="/perfil"
              className="block px-3 py-1 hover:text-gray-300 transition text-white no-underline"
            >
              Meu Perfil
            </Link>

            <button
              onClick={() => logout()}
              className="w-full text-left px-3 py-1 text-red-400 hover:bg-red-500/20 rounded-lg transition"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarPrivada;
