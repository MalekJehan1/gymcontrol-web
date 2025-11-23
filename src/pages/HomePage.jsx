import WithAuth from "../auth/WithAuth";
import Navbar from "../components/NavbarPrivada";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <Navbar
        links={[
          { label: "Sobre", to: "/sobre" },
          { label: "Dashboard", to: "/dashboard" },
          { label: "Treinos", to: "/treinos" },
        ]}
      />

      <div className="flex items-center justify-center mt-32">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          Bem-vindo ao GymControl 💪
        </h2>
      </div>
    </div>
  );
}

export default WithAuth(HomePage);
