import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export default async function requestProfile(token) {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
