import type { GetNotificationBaseType } from "@/interfaces/notification";
import { GetMyNotification } from "@/services/notification/notificationService";
import { useEffect, useState } from "react";
import NotiItem from "./_components/NotiItem";

const Notification = () => {
  const [notis, setNotis] = useState<GetNotificationBaseType[]>([]);

  const handleGetNotification = async () => {
    try {
      const res = await GetMyNotification();
      setNotis(res.data);
      console.log("get notification", res.data);
    } catch (err: unknown) {
      console.error("get notification failed", err);
    }
  };

  useEffect(() => {
    handleGetNotification();
  }, []);

  if (notis.length == 0) {
    console.log("notis", notis);
    return <div className="wrapper label noNotis">알림이 없어요.</div>;
  }

  return (
    <div className="wrapper">
      {notis.map((noti, idx) => {
        return (
          <div key={idx}>
            <NotiItem item={noti} />
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
