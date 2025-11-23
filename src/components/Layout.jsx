import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <header className="w-full py-4 px-8 flex justify-between items-center bg-black/40 backdrop-blur-md shadow-lg border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide">GymControl</h1>
        <nav className="flex gap-8 text-lg items-center">
          <Link className="hover:text-gray-300 transition text-white no-underline" to="/">Home</Link>
          <Link className="hover:text-gray-300 transition text-white no-underline" to="/sobre">Sobre</Link>
          <Link
            className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition shadow-md"
            to="/login"
          >
            Entrar
          </Link>
        </nav>
      </header>

      {/* Conteúdo da página */}
      <main className="flex flex-col items-center justify-center text-center px-6 mt-28">
        {children}
      </main>
    </div>
  );
}
