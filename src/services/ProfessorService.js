import api from "../api/api";

export const getProfessoresAPI = async () => {
  const response = await api.get("/professores");
  return response.data;
};
