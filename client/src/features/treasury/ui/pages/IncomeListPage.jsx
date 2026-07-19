import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountingApi } from "../../../accounting/api/accountingApi";
import { PageHeader, Button, DataTable, Modal, SearchableSelect, QuickCreateForm } from "../../../../app/components/common";
import useNotification from "../../../../app/components/notification/useNotification";
import { exportToPdf } from "../../../../lib/exportToPdf";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

const input = { display: "block", boxSizing: "border-box", width: "100%", marginTop: 5, padding: 9, border: "1px solid #cbd5e1", borderRadius: 7 };

export default function IncomeListPage() {
  const queryClient = useQueryClient();
  const { success, error: notifyError } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ incomeAccountId: "", bankAccountId: "", amount: "", date: new Date().toISOString().slice(0, 10), description: "" });

  const { data: accountsResp } = useQuery({ queryKey: ["accounts"], queryFn: () => accountingApi.listAccounts() });
  const accounts = accountsResp?.data || [];

  const { data: incomesResp, isLoading } = useQuery({ queryKey: ["incomes"], queryFn: () => accountingApi.listIncomes() });
  const incomes = incomesResp?.data || [];

  const create = useMutation({
    mutationFn: (data) => accountingApi.createIncome(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["incomes"]);
      setIsOpen(false);
      setForm({ incomeAccountId: "", bankAccountId: "", amount: "", date: new Date().toISOString().slice(0, 10), description: "" });
      success("Income recorded");
    },
    onError: (err) => notifyError(err.response?.data?.message || "Failed"),
  });

  const columns = [
    { key: "description", label: "Description" },
    {
      key: "amount",
      label: "Amount",
      render: (val) => <span style={{ color: "#16a34a", fontWeight: 600 }}>₹{Number(val || 0).toLocaleString("en-IN")}</span>,
    },
    { key: "date", label: "Date", render: (val) => val ? new Date(val).toLocaleDateString("en-IN") : "—" },
    { key: "createdAt", label: "Recorded", render: (val) => val ? new Date(val).toLocaleDateString("en-IN") : "—" },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader title="Income" subtitle="Track all business income." action={<div style={{ display: "flex", gap: 10 }}><Button variant="secondary" icon={HiOutlineDocumentArrowDown} onClick={() => exportToPdf({ title: "Income", filename: "income", columns: [{ key: "description", label: "Description" }, { key: "amount", label: "Amount", render: (v) => `₹${Number(v || 0).toLocaleString("en-IN")}` }, { key: "date", label: "Date", render: (v) => v ? new Date(v).toLocaleDateString("en-IN") : "—" }, { key: "createdAt", label: "Recorded", render: (v) => v ? new Date(v).toLocaleDateString("en-IN") : "—" }], data: incomes })}>Export PDF</Button><Button variant="primary" onClick={() => setIsOpen(true)}>Record Income</Button></div>} />
      <DataTable columns={columns} data={incomes} loading={isLoading} emptyTitle="No income records" emptyDescription="Record your first income to get started." />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Record Income">
        <form onSubmit={(e) => { e.preventDefault(); create.mutate({ ...form, amount: Number(form.amount) }); }} style={{ display: "grid", gap: 14 }}>
          <label>Income Account<div style={{ marginTop: 5 }}><SearchableSelect
            value={form.incomeAccountId}
            onChange={(val) => setForm({ ...form, incomeAccountId: val })}
            options={accounts.filter((a) => a.type === "revenue").map((a) => ({ value: a._id, label: `${a.code} — ${a.name}` }))}
            placeholder="Select account"
            createForm={({ onCreated, onClose }) => (
              <QuickCreateForm
                fields={[
                  { name: "code", label: "Account Code", required: true, placeholder: "e.g. REV001" },
                  { name: "name", label: "Account Name", required: true, placeholder: "Revenue account name" },
                  { name: "description", label: "Description", placeholder: "Brief description of this account" },
                ]}
                apiFn={(data) => accountingApi.createAccount({ ...data, type: "revenue" })}
                onCreated={onCreated}
                onClose={onClose}
              />
            )}
            createLabel="Create new account"
          /></div></label>
          <label>Bank Account<div style={{ marginTop: 5 }}><SearchableSelect
            value={form.bankAccountId}
            onChange={(val) => setForm({ ...form, bankAccountId: val })}
            options={accounts.filter((a) => a.type === "asset").map((a) => ({ value: a._id, label: `${a.code} — ${a.name}` }))}
            placeholder="Select bank account"
            createForm={({ onCreated, onClose }) => (
              <QuickCreateForm
                fields={[
                  { name: "code", label: "Account Code", required: true, placeholder: "e.g. REV001" },
                  { name: "name", label: "Account Name", required: true, placeholder: "Bank/cash account name" },
                  { name: "description", label: "Description", placeholder: "Brief description of this account" },
                ]}
                apiFn={(data) => accountingApi.createAccount({ ...data, type: "asset" })}
                onCreated={onCreated}
                onClose={onClose}
              />
            )}
            createLabel="Create new account"
          /></div></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <label>Amount<input required type="number" step="0.01" min="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} style={input} /></label>
            <label>Date<input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={input} /></label>
          </div>
          <label>Description<textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={input} /></label>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={create.isPending}>Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
