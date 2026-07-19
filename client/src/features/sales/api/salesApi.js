import api from "../../../lib/api";

export const salesApi = {
  // Quotations
  createQuotation: async (data) => {
    const response = await api.post("/quotations", data);
    return response.data;
  },

  approveQuotation: async (id) => {
    const response = await api.post(`/quotations/${id}/approve`);
    return response.data;
  },

  // Sales Orders
  createSalesOrder: async (data) => {
    const response = await api.post("/sales-orders", data);
    return response.data;
  },

  approveSalesOrder: async (id) => {
    const response = await api.post(`/sales-orders/${id}/approve`);
    return response.data;
  },

  // Delivery Challans
  createDeliveryChallan: async (data) => {
    const response = await api.post("/delivery-challans", data);
    return response.data;
  },

  // Invoices
  createInvoice: async (data) => {
    const response = await api.post("/invoices", data);
    return response.data;
  },

  approveInvoice: async (id) => {
    const response = await api.post(`/invoices/${id}/approve`);
    return response.data;
  },
};
