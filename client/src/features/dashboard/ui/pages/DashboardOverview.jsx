import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  HiOutlineBanknotes,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineShoppingBag,
  HiOutlineDocumentText,
  HiOutlinePlus,
  HiOutlineArrowRight,
  HiOutlineReceiptPercent,
  HiOutlineCreditCard,
  HiOutlineBuildingStorefront,
} from "react-icons/hi2";
import {
  StatCard,
  PageHeader,
  Button,
  StatusBadge,
  SkeletonLoader,
} from "../../../../app/components/common";
import s from "../components/css/DashboardOverview.module.css";

const quickActions = [
  { label: "New Invoice", icon: HiOutlineDocumentText, to: "/dashboard/invoices", color: "#2563eb" },
  { label: "Add Customer", icon: HiOutlineUserGroup, to: "/dashboard/customers/create", color: "#16a34a" },
  { label: "Record Expense", icon: HiOutlineCreditCard, to: "/dashboard/purchases", color: "#dc2626" },
  { label: "New Quotation", icon: HiOutlineReceiptPercent, to: "/dashboard/quotations", color: "#9333ea" },
];

const recentActivity = [
  { id: 1, action: "Invoice #INV-001 created", time: "2 hours ago", status: "draft" },
  { id: 2, action: "Payment received from Acme Corp", time: "5 hours ago", status: "paid" },
  { id: 3, action: "Quotation #QUO-012 sent", time: "1 day ago", status: "sent" },
  { id: 4, action: "Purchase order #PO-005 approved", time: "2 days ago", status: "approved" },
  { id: 5, action: 'Customer "Beta LLC" added', time: "3 days ago", status: "active" },
];

const topModules = [
  { label: "Sales", icon: HiOutlineBanknotes, to: "/dashboard/quotations", count: "Quotations, Orders, Invoices" },
  { label: "Purchases", icon: HiOutlineShoppingBag, to: "/dashboard/purchase-orders", count: "Orders, Bills, Payments" },
  { label: "Accounting", icon: HiOutlineReceiptPercent, to: "/dashboard/accounts", count: "Accounts, Journals, Ledger" },
  { label: "Inventory", icon: HiOutlineBuildingStorefront, to: "/dashboard/inventory", count: "Stock, Transfers, Adjustments" },
];

export default function DashboardOverview() {
  const navigate = useNavigate();

  return (
    <section className={s.page}>
      <PageHeader
        action={
          <Button icon={HiOutlinePlus} onClick={() => navigate("/dashboard/invoices")} variant="primary">
            New Invoice
          </Button>
        }
        subtitle="Welcome back! Here's your financial overview."
        title="Dashboard"
      />

      {/* Stat Cards */}
      <div className={s.stats}>
        <StatCard
          icon={HiOutlineBanknotes}
          label="Total Revenue"
          trend="up"
          trendLabel="+12.5% from last month"
          value="$48,574.00"
        />
        <StatCard
          icon={HiOutlineCurrencyDollar}
          label="Total Expenses"
          trend="down"
          trendLabel="-3.2% from last month"
          value="$12,234.00"
        />
        <StatCard
          icon={HiOutlineArrowTrendingUp}
          label="Net Profit"
          trend="up"
          trendLabel="+18.7% from last month"
          value="$36,340.00"
        />
        <StatCard
          icon={HiOutlineDocumentText}
          label="Outstanding"
          value="$8,120.00"
        />
      </div>

      {/* Quick Actions */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Quick Actions</h3>
        <div className={s.actions}>
          {quickActions.map((action) => (
            <button
              className={s.actionCard}
              key={action.label}
              onClick={() => navigate(action.to)}
              type="button"
            >
              <span className={s.actionIcon} style={{ background: `${action.color}14`, color: action.color }}>
                <action.icon />
              </span>
              <span className={s.actionLabel}>{action.label}</span>
              <HiOutlineArrowRight className={s.actionArrow} />
            </button>
          ))}
        </div>
      </div>

      <div className={s.twoCol}>
        {/* Recent Activity */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <h3 className={s.cardTitle}>Recent Activity</h3>
            <button className={s.viewAll} onClick={() => navigate("/dashboard/audit-logs")} type="button">
              View All <HiOutlineArrowRight />
            </button>
          </div>
          <div className={s.activityList}>
            {recentActivity.map((item) => (
              <div className={s.activityItem} key={item.id}>
                <div className={s.activityDot} />
                <div className={s.activityContent}>
                  <span className={s.activityAction}>{item.action}</span>
                  <span className={s.activityTime}>{item.time}</span>
                </div>
                <StatusBadge status={item.status}>{item.status}</StatusBadge>
              </div>
            ))}
          </div>
        </div>

        {/* Module Shortcuts */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <h3 className={s.cardTitle}>Modules</h3>
          </div>
          <div className={s.moduleList}>
            {topModules.map((mod) => (
              <button className={s.moduleItem} key={mod.label} onClick={() => navigate(mod.to)} type="button">
                <span className={s.moduleIcon}>
                  <mod.icon />
                </span>
                <div className={s.moduleInfo}>
                  <span className={s.moduleLabel}>{mod.label}</span>
                  <span className={s.moduleCount}>{mod.count}</span>
                </div>
                <HiOutlineArrowRight className={s.moduleArrow} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
