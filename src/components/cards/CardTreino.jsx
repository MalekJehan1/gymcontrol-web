import React from "react";

function CardTreino({ treino, onDetalhes, onEdit, onDelete, isAdmin = false }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 p-5 rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{treino.nome}</h2>
          <p className="text-neutral-400">
            {treino.descricao || "Sem descrição"}
          </p>
          <p className="text-sm text-blue-400 mt-2">
            {treino.exercicios?.length || 0} exercícios
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {/* Botão sempre visível */}
          <button
            className="px-3 py-1 text-sm bg-blue-600 rounded-lg hover:bg-blue-500"
            onClick={() => onDetalhes(treino)}
          >
            Detalhes
          </button>

          {/* Botões restritos a admin */}
          {isAdmin && (
            <>
              <button
                className="px-3 py-1 text-sm bg-yellow-600 rounded-lg hover:bg-yellow-500"
                onClick={() => onEdit(treino)}
              >
                Editar
              </button>

              <button
                className="px-3 py-1 text-sm bg-red-600 rounded-lg hover:bg-red-500"
                onClick={() => onDelete(treino)}
              >
                Excluir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardTreino;
