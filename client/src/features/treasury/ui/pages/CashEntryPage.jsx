import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { accountingApi } from "../../../accounting/api/accountingApi";
import { paymentsApi, receiptsApi } from "../../../purchases/api/purchasesApi";
import { Button, PageHeader, Tabs, SearchableSelect, QuickCreateForm } from "../../../../app/components/common";
import { exportToPdf } from "../../../../lib/exportToPdf";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

const field = { display: "block", boxSizing: "border-box", width: "100%", marginTop: 5, padding: 9, border: "1px solid #cbd5e1", borderRadius: 7 };

export default function CashEntryPage() {
  const [tab, setTab] = useState("payment");
  const [form, setForm] = useState({ number: "", date: new Date().toISOString().slice(0, 10), amount: "", method: "cash", accountId: "" });
  const accounts = useQuery({ queryKey: ["accounts"], queryFn: () => accountingApi.listAccounts() });
  const mutation = useMutation({
    mutationFn: (payload) => tab === "payment" ? paymentsApi.create(payload) : receiptsApi.create(payload),
    onSuccess: () => setForm({ ...form, number: "", amount: "" })
  });
  const submit = (e) => {
    e.preventDefault();
    const base = { amount: Number(form.amount), accountId: form.accountId, paymentMethod: form.method };
    mutation.mutate(tab === "payment"
      ? { ...base, paymentNumber: form.number, paymentDate: new Date(form.date).toISOString() }
      : { ...base, receiptNumber: form.number, receiptDate: new Date(form.date).toISOString() }
    );
  };
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PageHeader title="Direct Payments & Receipts" subtitle="Record standalone cash movements against a ledger account." />
        <Button variant="secondary" icon={HiOutlineDocumentArrowDown} onClick={() => exportToPdf({ title: "Cash Entries", filename: "cash-entries", columns: [{ key: "number", label: "Number" }, { key: "date", label: "Date" }, { key: "amount", label: "Amount" }, { key: "method", label: "Method" }, { key: "accountId", label: "Account" }], data: [{ number: form.number || "—", date: form.date || "—", amount: form.amount || "—", method: form.method || "—", accountId: form.accountId || "—" }] })}>
          Export PDF
        </Button>
      </div>
      <Tabs active={tab} onChange={setTab} tabs={[{ key: "payment", label: "Payment" }, { key: "receipt", label: "Receipt" }]} />
      <form onSubmit={submit} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 22, display: "grid", gap: 14 }}>
        <label>{tab === "payment" ? "Payment" : "Receipt"} number<input required value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} style={field} /></label>
        <label>Date<input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={field} /></label>
        <label>Ledger account<div style={{ marginTop: 5 }}><SearchableSelect
          value={form.accountId}
          onChange={(val) => setForm({ ...form, accountId: val })}
          options={(accounts.data?.data || []).map((x) => ({ value: x._id, label: `${x.code} — ${x.name}` }))}
          placeholder="Select account"
          loading={accounts.isLoading}
          createForm={({ onCreated, onClose }) => (
            <QuickCreateForm
              fields={[
                { name: "code", label: "Account Code", required: true, placeholder: "e.g. ACC001" },
                { name: "name", label: "Account Name", required: true, placeholder: "Account name" },
                { name: "type", label: "Account Type", required: true, placeholder: "asset, liability, equity, revenue, expense" },
                { name: "description", label: "Description", placeholder: "Brief description" },
              ]}
              apiFn={(data) => accountingApi.createAccount(data)}
              onCreated={onCreated}
              onClose={onClose}
            />
          )}
          createLabel="Create new account"
        /></div></label>
        <label>Payment method<select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} style={field}><option>cash</option><option>bank transfer</option><option>upi</option><option>card</option></select></label>
        <label>Amount<input required type="number" min="0.01" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} style={field} /></label>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button type="button" variant="secondary" onClick={() => setForm({ number: "", date: new Date().toISOString().slice(0, 10), amount: "", method: "cash", accountId: "" })}>Reset</Button>
          <Button type="submit" variant="primary" loading={mutation.isPending}>Save</Button>
        </div>
        {mutation.isSuccess && <small style={{ color: "#15803d" }}>{tab === "payment" ? "Payment" : "Receipt"} recorded successfully.</small>}
        {mutation.isError && <small style={{ color: "#b91c1c" }}>{mutation.error?.response?.data?.message || "Failed to record entry."}</small>}
      </form>
    </div>
  );
}
