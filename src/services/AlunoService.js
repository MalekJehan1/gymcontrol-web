import api from "../api/api";

export const getAlunosAPI = async () => {
  const response = await api.get("/alunos");
  return response.data;
};
