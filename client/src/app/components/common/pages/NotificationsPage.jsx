import { useEffect, useState } from "react";
import { HiOutlineBell, HiOutlineCheckCircle } from "react-icons/hi2";
import { PageHeader, EmptyState, Button, StatusBadge } from "..";
import { notificationsApi } from "../../../../features/notifications/api/notificationsApi";
import s from "./Notifications.module.css";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationsApi.list();
      setNotifications(res.data || []);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      // silent
    }
  };

  return (
    <div className={s.page}>
      <PageHeader
        action={
          notifications.length > 0 ? (
            <Button icon={HiOutlineCheckCircle} onClick={handleMarkAllRead} variant="secondary">
              Mark All Read
            </Button>
          ) : null
        }
        subtitle="Stay updated with your latest activities"
        title="Notifications"
      />

      {loading ? (
        <div className={s.loading}>Loading...</div>
      ) : notifications.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="You're all caught up! New notifications will appear here."
        />
      ) : (
        <div className={s.list}>
          {notifications.map((n) => (
            <div className={[s.item, !n.read && s.unread].filter(Boolean).join(" ")} key={n._id}>
              <div className={s.iconWrap}>
                <HiOutlineBell />
              </div>
              <div className={s.content}>
                <p className={s.message}>{n.message}</p>
                <span className={s.time}>{new Date(n.createdAt).toLocaleString()}</span>
              </div>
              {!n.read && <span className={s.dot} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
