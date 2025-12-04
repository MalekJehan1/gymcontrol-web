import { Link } from "react-router-dom";
import {
  navbarBase,
  logoBase,
  logoText,
  logoGym,
  logoControl,
  linkDefault,
  buttonPrimary,
} from "../utils/navbarBaseClasses";

export default function NavBarPublica({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <header className={navbarBase}>
        {/* LOGO */}
        <Link to="/home" className={logoBase}>
          <h1 className={logoText}>
            <span className={logoGym}>Gym</span>
            <span className={logoControl}>Control</span>
          </h1>
        </Link>

        <nav className="flex gap-8 text-lg items-center">
          <Link className={linkDefault} to="/sobre">
            Sobre
          </Link>

          <Link className={buttonPrimary} to="/login">
            Entrar
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-6 mt-28">
        {children}
      </main>
    </div>
  );
}
