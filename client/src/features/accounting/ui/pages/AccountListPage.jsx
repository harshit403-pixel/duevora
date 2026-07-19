import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HiPlus, HiChevronDown, HiChevronRight, HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { exportToPdf } from "../../../../lib/exportToPdf";
import { accountingApi } from "../../api/accountingApi";
import { Button, EmptyState, Modal, PageHeader, SearchableSelect } from "../../../../app/components/common";
import s from "../css/AccountList.module.css";

const TYPES = ["asset", "liability", "equity", "revenue", "expense"];
const title = (value) => value[0].toUpperCase() + value.slice(1);
const emptyForm = { name: "", code: "", type: "asset", parentId: "", status: "active" };
const field = { display: "block", boxSizing: "border-box", width: "100%", marginTop: 6, padding: "9px 10px", border: "1px solid #cbd5e1", borderRadius: 7 };
const formatCode = (code) => code?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || code;

export default function AccountListPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [expanded, setExpanded] = useState(new Set(TYPES));
  const { data, isLoading, isError } = useQuery({ queryKey: ["accounts"], queryFn: () => accountingApi.listAccounts() });
  const accounts = data?.data || [];
  const grouped = useMemo(() => TYPES.reduce((all, type) => ({ ...all, [type]: accounts.filter((a) => a.type === type) }), {}), [accounts]);
  const create = useMutation({ mutationFn: accountingApi.createAccount, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["accounts"] }); setOpen(false); setForm(emptyForm); } });
  const submit = (event) => { event.preventDefault(); create.mutate({ ...form, parentId: form.parentId || undefined }); };
  const toggle = (type) => setExpanded((current) => { const next = new Set(current); next.has(type) ? next.delete(type) : next.add(type); return next; });

  return <div style={{ maxWidth: 1100, margin: "0 auto" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}><PageHeader title="Chart of Accounts" subtitle="Organize the accounts used by your general ledger." /><div style={{ display: "flex", gap: 10 }}><Button variant="secondary" onClick={() => navigate("/dashboard/accounts/tree")}>Tree View</Button><Button variant="secondary" onClick={() => navigate("/dashboard/ledger")}>Ledger</Button><Button variant="primary" onClick={() => setOpen(true)} icon={HiPlus}>Create account</Button><Button variant="secondary" onClick={() => exportToPdf({ title: "Chart of Accounts", columns: [{key:"code",label:"Code"},{key:"name",label:"Name"},{key:"type",label:"Type"},{key:"status",label:"Status"}], data: accounts, filename: "chart-of-accounts" })} icon={HiOutlineDocumentArrowDown}>Export PDF</Button></div></div>
    {isError ? <EmptyState title="Could not load accounts" description="Check that you have account viewing permission and try again." /> : !isLoading && !accounts.length ? <EmptyState title="No accounts yet" description="Create your first account to start posting transactions." /> : <div className={s.grid}>{TYPES.map((type) => <section key={type} className={s.section}><button type="button" onClick={() => toggle(type)} className={s.sectionHeader}>{expanded.has(type) ? <HiChevronDown /> : <HiChevronRight />}{title(type)} <span className={s.count}>({grouped[type].length})</span></button>{expanded.has(type) && <div>{grouped[type].map((account) => <div key={account._id} className={s.row}><span className={s.code} title={account.code}>{formatCode(account.code)}</span><span className={s.name}>{account.name}</span><span className={`${s.status} ${account.status === "inactive" ? s.inactive : s.active}`}>{account.status || "active"}</span></div>)}</div>}</section>)}</div>}
    <Modal isOpen={open} onClose={() => setOpen(false)} title="Create account"><form onSubmit={submit} style={{ display: "grid", gap: 14 }}><label>Account name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={field} /></label><label>Account code<input required pattern="[a-zA-Z0-9_]+" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} style={field} /></label><label>Type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={field}>{TYPES.map((type) => <option key={type} value={type}>{title(type)}</option>)}</select></label><label>Parent account (optional)<div style={{ marginTop: 6 }}><SearchableSelect value={form.parentId} onChange={(val) => setForm({ ...form, parentId: val })} options={[{ value: "", label: "None — top level" }, ...accounts.map((account) => ({ value: account._id, label: `${account.code} — ${account.name}` }))]} placeholder="Select parent..." loading={false} /></div></label><div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}><Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" variant="primary" loading={create.isPending}>Create account</Button></div>{create.isError && <small style={{ color: "#b91c1c" }}>{create.error?.response?.data?.message || "Could not create the account."}</small>}</form></Modal>
  </div>;
}