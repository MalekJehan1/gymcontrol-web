import api from "../api/api";

export const getUsuariosAPI = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};

export const getUsuarioPorIdAPI = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

export const cadastrarUsuarioAPI = async (usuario) => {
  const response = await api.post("/usuarios", usuario);
  return response.data;
};

export const atualizarMeuUsuarioAPI = async (usuario) => {
  const response = await api.put(`/usuarios/update-me`, usuario);
  console.log("response2", response);
  return response.data;
};

export const atualizarUsuarioAPI = async (id, usuario) => {
  const response = await api.put(`/usuarios/${id}`, usuario);
  return response.data;
};

export const deletarUsuarioAPI = async (id) => {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
};
