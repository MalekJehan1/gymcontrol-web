import { useEffect, useState } from "react";
import WithAuth from "../auth/WithAuth";
import NavbarPrivada from "../components/NavbarPrivada";
import { getMeusTreinosAPI } from "../services/TreinoService";
import DialogTreinoDetalhes from "../components/dialogs/DialogTreinoDetalhes";

export default function TreinosAlunoPage() {
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [treinoSelecionado, setTreinoSelecionado] = useState(null);

  const carregarTreinos = async () => {
    setLoading(true);
    const data = await getMeusTreinosAPI(); // lista treinos do aluno
    setTreinos(data);
    setLoading(false);
  };

  useEffect(() => {
    carregarTreinos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <NavbarPrivada links={[]} />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8">Meus Treinos</h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-neutral-800 h-32 rounded-xl"
              />
            ))}
          </div>
        ) : treinos.length === 0 ? (
          <p className="text-neutral-400">Nenhum treino foi atribuído ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {treinos.map((t) => (
              <div
                key={t.id}
                className="bg-neutral-900 border border-neutral-700 p-5 rounded-xl hover:bg-neutral-800 cursor-pointer transition"
                onClick={() => {
                  setTreinoSelecionado(t);
                  setDialogOpen(true);
                }}
              >
                <h2 className="text-xl font-semibold">{t.nome}</h2>
                <p className="text-neutral-400 mt-1">
                  {t.descricao || "Sem descrição"}
                </p>

                <p className="text-sm text-blue-400 mt-3">
                  {t.exercicios?.length || 0} exercícios
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal com detalhes do treino */}
      <DialogTreinoDetalhes
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        treino={treinoSelecionado}
      />
    </div>
  );
}
