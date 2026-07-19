import api from "../../../lib/api";

export const purchasesApi = {
  // Purchase Orders
  createPurchaseOrder: async (data) => {
    const response = await api.post("/purchase-orders", data);
    return response.data;
  },

  // Purchases (Vendor Bills)
  create: async (data) => {
    const response = await api.post("/purchases", data);
    return response.data;
  },

  approve: async (id) => {
    const response = await api.post(`/purchases/${id}/approve`);
    return response.data;
  },
};

export const paymentsApi = {
  create: async (data) => {
    const response = await api.post("/payments", data);
    return response.data;
  },
};

export const receiptsApi = {
  create: async (data) => {
    const response = await api.post("/receipts", data);
    return response.data;
  },
};
