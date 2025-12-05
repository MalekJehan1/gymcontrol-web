import api from "../api/api";

// Retorna apenas os treinos vinculados ao usuário logado
export const getMeusTreinosAPI = async () => {
  try{
    const response = await api.get("/treinos/meus-treinos");
  return response.data;

  }catch(err){
    return "erro";
  }
};

// Retorna um treino específico (caso precise abrir detalhes)
export const getTreinoPorIdAPI = async (id) => {
  const response = await api.get(`/treinos/${id}`);
  return response.data;
};

export const getTreinosAPI = async (id) => {
  const response = await api.get(`/treinos/`);
  return response.data;
};

// Criar novo treino (somente admin)
export const cadastrarTreinoAPI = async (data) => {
  const response = await api.post("/treinos", data);
  return response.data;
};

// Atualizar informações do treino (somente admin)
export const atualizarTreinoAPI = async (id, data) => {
  const response = await api.put(`/treinos/${id}`, data);
  return response.data;
};

// Deletar treino
export const deletarTreinoAPI = async (id) => {
  const response = await api.delete(`/treinos/${id}`);
  return response.data;
};

export const adicionarExercicioNoTreinoAPI = async (treinoId, data) => {
  const response = await api.post(`/treinos/${treinoId}/exercicios`, data);
  return response.data;
};

export const removerExercicioDoTreinoAPI = async (treinoId, exercicioId) => {
  const response = await api.delete(
    `/treinos/${treinoId}/exercicios/${exercicioId}`
  );
  return response.data;
};
