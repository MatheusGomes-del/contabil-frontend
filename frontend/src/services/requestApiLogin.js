import api from "./api";

const requestApiLogin = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    console.log('aqui log res', res)
    return res.data;
  } catch (err) {
    console.error(err);
    const message = err.response?.data?.message || err.message || "Erro no login";
    alert("Falha no login: " + message);
    //throw err;
  }
};

export default requestApiLogin;
