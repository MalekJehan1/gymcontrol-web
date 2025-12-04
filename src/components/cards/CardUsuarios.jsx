export default function CardUsuarios({ usuario, onEdit, onDelete }) {
  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex justify-between items-center shadow-lg">
      <div>
        <h3 className="text-lg font-semibold text-white capitalize">
          <span>Nome:</span> {usuario.nome} {usuario.sobrenome}
        </h3>
        <p className="text-neutral-300">Email: {usuario.email}</p>
        <p className="text-sm capitalize text-neutral-400">
          Tipo: {usuario.tipo}
        </p>

        <p className="text-sm  text-neutral-400">
          Criado em: {new Date(usuario.created_at).toLocaleDateString("pt-BR")}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onEdit(usuario)}
          className="text-yellow-400 hover:text-yellow-300 font-medium"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(usuario.id)}
          className="text-red-500 hover:text-red-400 font-medium"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
