import api from "../../../lib/api";

export const authApi = {
  login: async (email, password) => {
    // TODO: Replace with actual API call
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  googleLogin: async (token) => {
    // TODO: Replace with actual API call
    const response = await api.post("/auth/google", { token });
    return response.data;
  },

  logout: async () => {
    // TODO: Replace with actual API call
    const response = await api.post("/auth/logout");
    return response.data;
  },
};
