export default function CardExercicio({ exercicio, onEdit, onDelete }) {
  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex justify-between items-center shadow-lg">
      <div>
        <h2 className="text-xl font-bold mb-1">{exercicio.nome}</h2>

        <p className="text-sm text-neutral-300">
          <strong>Categoria:</strong> {exercicio.categoria || "—"}
        </p>

        <p className="text-sm text-neutral-300">
          <strong>Equipamento:</strong> {exercicio.equipamento || "—"}
        </p>

        <p className="text-sm text-neutral-400 mt-2 line-clamp-3">
          {exercicio.descricao || "Sem descrição"}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onEdit(exercicio)}
          className="text-yellow-400 hover:text-yellow-300 font-medium"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(exercicio.id)}
          className="text-red-500 hover:text-red-400 font-medium"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
