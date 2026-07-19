import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HiPlus, HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { inventoryApi } from "../../api/inventoryApi";
import { productsApi } from "../../../products/api/productsApi";
import { Button, DataTable, Modal, PageHeader, SearchableSelect, Tabs, QuickCreateForm } from "../../../../app/components/common";
import { useAppSelector } from "../../../../app/store/hooks";
import { exportToPdf } from "../../../../lib/exportToPdf";
const field = { display: "block", boxSizing: "border-box", width: "100%", marginTop: 5, padding: 9, border: "1px solid #cbd5e1", borderRadius: 7 };
export default function InventoryListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector((state) => state.auth.user);

  const permissions = new Set((user?.permissions || []).map((p) => p.toUpperCase()));
  const isAdmin = user?.roles?.includes("ADMIN");
  const canViewInventory = isAdmin || permissions.has("INVENTORY.VIEW");
  const canViewWarehouses = isAdmin || permissions.has("WAREHOUSES.VIEW");

  const queryTab = searchParams.get("tab");
  const initialTab = queryTab || (canViewInventory ? "stock" : "warehouses");
  const [tab, setTabState] = useState(initialTab);

  const setTab = (newTab) => {
    setTabState(newTab);
    setSearchParams({ tab: newTab });
  };

  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [warehouse, setWarehouse] = useState({ name: "", code: "", address: "" });
  const [adjustment, setAdjustment] = useState({ warehouseId: "", productId: "", adjustedQuantity: "", reason: "", date: new Date().toISOString().slice(0, 10) });

  const stock = useQuery({
    queryKey: ["inventory"],
    queryFn: () => inventoryApi.list(),
    enabled: canViewInventory
  });

  const warehouses = useQuery({
    queryKey: ["warehouses"],
    queryFn: () => inventoryApi.listWarehouses()
  });

  const products = useQuery({
    queryKey: ["products"],
    queryFn: () => productsApi.list()
  });

  const addWarehouse = useMutation({
    mutationFn: inventoryApi.createWarehouse,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["warehouses"] });
      setOpen(false);
      setWarehouse({ name: "", code: "", address: "" });
    }
  });

  const addAdjustment = useMutation({
    mutationFn: inventoryApi.createStockAdjustment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inventory"] });
      setOpen(false);
    }
  });

  const mutation = tab === "warehouses" ? addWarehouse : addAdjustment;

  const submit = (e) => {
    e.preventDefault();
    if (tab === "warehouses") addWarehouse.mutate(warehouse);
    else addAdjustment.mutate({ ...adjustment, adjustedQuantity: Number(adjustment.adjustedQuantity), date: new Date(adjustment.date).toISOString() });
  };

  const warehouseRows = warehouses.data?.data || [];
  const productRows = products.data?.data || [];

  const availableTabs = [
    canViewInventory && { key: "stock", label: "Stock levels" },
    canViewWarehouses && { key: "warehouses", label: "Warehouses" }
  ].filter(Boolean);

 return <div style={{maxWidth:1300,margin:"0 auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16}}><PageHeader title="Inventory & Warehouses" subtitle="Monitor stock balances, maintain locations, and record controlled adjustments."/><div style={{display:"flex",gap:8,alignItems:"center"}}><Button variant="secondary" onClick={()=>navigate("/dashboard/stock-adjustments")}>Adjustments</Button><Button variant="secondary" onClick={()=>navigate("/dashboard/stock-transfers")}>Transfers</Button><Button variant="secondary" icon={HiOutlineDocumentArrowDown} onClick={()=>exportToPdf({title:"Inventory",filename:"inventory",columns:[{key:"product",label:"Product",render:(v,row)=>v?.name||row.productName||"—"},{key:"warehouse",label:"Warehouse",render:(v)=>v?.name||"—"},{key:"quantity",label:"On hand"},{key:"reservedQuantity",label:"Reserved"}],data:stock.data?.data||[]})}>Export PDF</Button><Button variant="primary" onClick={()=>setOpen(true)} icon={HiPlus}> {tab==="warehouses"?"New warehouse":"Stock adjustment"}</Button></div></div><Tabs active={tab} onChange={setTab} tabs={availableTabs}/>{tab==="stock"?<DataTable loading={stock.isLoading} data={stock.data?.data||[]} columns={[{key:"product",label:"Product",render:(v,row)=>v?.name||row.productName||"—"},{key:"warehouse",label:"Warehouse",render:(v)=>v?.name||"—"},{key:"quantity",label:"On hand"},{key:"reservedQuantity",label:"Reserved"},{key:"updatedAt",label:"Updated",render:(v)=>v?new Date(v).toLocaleString():"—"}]}/>:<DataTable loading={warehouses.isLoading} data={warehouseRows} columns={[{key:"code",label:"Code"},{key:"name",label:"Warehouse"},{key:"address",label:"Address"},{key:"status",label:"Status"}]}/>}<Modal isOpen={open} onClose={()=>setOpen(false)} title={tab==="warehouses"?"Create warehouse":"Record stock adjustment"}><form onSubmit={submit} style={{display:"grid",gap:13}}>{tab==="warehouses"?<><label>Name<input required value={warehouse.name} onChange={e=>setWarehouse({...warehouse,name:e.target.value})} style={field}/></label><label>Code<input required value={warehouse.code} onChange={e=>setWarehouse({...warehouse,code:e.target.value.toUpperCase()})} style={field}/></label><label>Address<input value={warehouse.address} onChange={e=>setWarehouse({...warehouse,address:e.target.value})} style={field}/></label></>:<><label>Warehouse<div style={{marginTop:5}}><SearchableSelect value={adjustment.warehouseId} onChange={val=>setAdjustment({...adjustment,warehouseId:val})} options={warehouseRows.map(x=>({value:x._id,label:x.name||x.warehouseName||"—"}))} placeholder="Select warehouse" loading={warehouses.isLoading} createForm={({onCreated,onClose})=><QuickCreateForm fields={[{name:"name",label:"Warehouse Name",required:true,placeholder:"Enter warehouse name"},{name:"location",label:"Location",placeholder:"Warehouse location/address"},{name:"description",label:"Description",placeholder:"Brief description"}]} apiFn={(data)=>inventoryApi.createWarehouse(data)} onCreated={onCreated} onClose={onClose}/>}/></div></label><label>Product<div style={{marginTop:5}}><SearchableSelect value={adjustment.productId} onChange={val=>setAdjustment({...adjustment,productId:val})} options={productRows.map(x=>({value:x._id,label:x.name||x.sku||"—"}))} placeholder="Select product" loading={products.isLoading} createForm={({onCreated,onClose})=><QuickCreateForm fields={[{name:"name",label:"Product Name",required:true,placeholder:"Enter product name"},{name:"sku",label:"SKU",required:true,placeholder:"Stock keeping unit"},{name:"description",label:"Description",placeholder:"Product description",type:"textarea"},{name:"category",label:"Category",placeholder:"Product category"},{name:"unit",label:"Unit",placeholder:"e.g. pcs, kg, litre"},{name:"sellingPrice",label:"Selling Price",type:"number",placeholder:"0.00"},{name:"costPrice",label:"Cost Price",type:"number",placeholder:"0.00"},{name:"quantity",label:"Opening Stock",type:"number",placeholder:"0"},{name:"lowStockAlert",label:"Low Stock Alert",type:"number",placeholder:"Minimum stock level"}]} apiFn={(data)=>productsApi.create(data)} onCreated={onCreated} onClose={onClose}/>}/></div></label><label>Quantity adjustment<input required type="number" step="0.01" value={adjustment.adjustedQuantity} onChange={e=>setAdjustment({...adjustment,adjustedQuantity:e.target.value})} style={field}/></label><label>Reason<input value={adjustment.reason} onChange={e=>setAdjustment({...adjustment,reason:e.target.value})} style={field}/></label></>}<div style={{display:"flex",justifyContent:"flex-end",gap:10}}><Button type="button" variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button><Button type="submit" variant="primary" loading={mutation.isPending}>Save</Button></div>{mutation.isError&&<small style={{color:"#b91c1c"}}>{mutation.error?.response?.data?.message||"Could not save."}</small>}</form></Modal></div>
}