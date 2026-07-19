import api from "../../../lib/api";

export const accountingApi = {
  // Accounts (Chart of Accounts)
  createAccount: async (data) => {
    const response = await api.post("/accounts", data);
    return response.data;
  },

  listAccounts: async (params) => {
    const response = await api.get("/accounts", { params });
    return response.data;
  },

  // Journal Entries
  createJournalEntry: async (data) => {
    const response = await api.post("/journal-entries", data);
    return response.data;
  },

  listJournalEntries: async (params) => {
    const response = await api.get("/journal-entries", { params });
    return response.data;
  },

  // Ledger
  listLedger: async (params) => {
    const response = await api.get("/ledger", { params });
    return response.data;
  },

  // Voucher Types
  createVoucherType: async (data) => {
    const response = await api.post("/voucher-types", data);
    return response.data;
  },

  // Taxes
  createTax: async (data) => {
    const response = await api.post("/taxes", data);
    return response.data;
  },

  listTaxes: async (params) => {
    const response = await api.get("/taxes", { params });
    return response.data;
  },

  // Budgets
  createBudget: async (data) => {
    const response = await api.post("/budgets", data);
    return response.data;
  },

  // Cost Centers
  createCostCenter: async (data) => {
    const response = await api.post("/cost-centers", data);
    return response.data;
  },

  // Incomes
  createIncome: async (data) => {
    const response = await api.post("/incomes", data);
    return response.data;
  },

  // Expenses
  createExpense: async (data) => {
    const response = await api.post("/expenses", data);
    return response.data;
  },

  // Opening Balances
  createOpeningBalance: async (data) => {
    const response = await api.post("/opening-balances", data);
    return response.data;
  },
};
