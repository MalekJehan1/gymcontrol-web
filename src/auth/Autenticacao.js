import { jwtDecode } from "jwt-decode";

const NOMEAPP = "gymcontrol";

/**
 * Retorna o token, se existir e se estiver válido
 */
export const getToken = () => {
  const localStorageAutenticacao = localStorage.getItem(
    `${NOMEAPP}/autenticacao`
  );

  const autenticacao = localStorageAutenticacao
    ? JSON.parse(localStorageAutenticacao)
    : null;

  if (!autenticacao || autenticacao.auth === false) return null;

  try {
    const decoded = jwtDecode(autenticacao.token);

    const agora = Math.floor(Date.now() / 1000);

    if (decoded.exp <= agora) {
      console.log("Token expirado");
      logout();
      return null;
    }

    return autenticacao.token;
  } catch (err) {
    logout();
    return null;
  }
};

/**
 * Retorna o usuário decodificado do token
 */
export const getUsuario = () => {
  const localStorageAutenticacao = localStorage.getItem(
    `${NOMEAPP}/autenticacao`
  );
  const autenticacao = localStorageAutenticacao
    ? JSON.parse(localStorageAutenticacao)
    : null;

  if (!autenticacao || autenticacao.auth === false) return null;

  try {
    const decoded = jwtDecode(autenticacao.token);

    const agora = Math.floor(Date.now() / 1000);

    if (decoded.exp <= agora) {
      console.log("Token expirado");
      logout();
      return null;
    }

    return decoded;
  } catch (err) {
    logout();
    return null;
  }
};

/**
 * Grava token + flag auth
 */
export const gravaAutenticacao = (json) => {
  localStorage.setItem(`${NOMEAPP}/autenticacao`, JSON.stringify(json));
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.setItem(
    `${NOMEAPP}/autenticacao`,
    JSON.stringify({
      auth: false,
      token: "",
    })
  );
};
