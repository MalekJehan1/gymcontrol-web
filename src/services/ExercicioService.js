import api from "../api/api";

export const getExerciciosAPI = async () => {
  const response = await api.get("/exercicios");
  return response.data;
};

export const cadastrarExercicioAPI = async (data) => {
  const response = await api.post("/exercicios", data);
  return response.data;
};

export const atualizarExercicioAPI = async (id, data) => {
  const response = await api.put(`/exercicios/${id}`, data);
  return response.data;
};

export const deletarExercicioAPI = async (id) => {
  const response = await api.delete(`/exercicios/${id}`);
  return response.data;
};
