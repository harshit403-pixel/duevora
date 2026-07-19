import api from "../../../lib/api";

export const settingsApi = {
  update: async (data) => {
    const response = await api.put("/settings", data);
    return response.data;
  },

  // Financial Years
  createFinancialYear: async (data) => {
    const response = await api.post("/financial-years", data);
    return response.data;
  },

  archiveFinancialYear: async (id) => {
    const response = await api.post(`/financial-years/${id}/archive`);
    return response.data;
  },

  // Currencies
  createCurrency: async (data) => {
    const response = await api.post("/currencies", data);
    return response.data;
  },

  listCurrencies: async (params) => {
    const response = await api.get("/currencies", { params });
    return response.data;
  },

  // Exchange Rates
  createExchangeRate: async (data) => {
    const response = await api.post("/exchange-rates", data);
    return response.data;
  },
};
