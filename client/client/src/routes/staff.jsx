import React from "react";
import { useState } from "react";
import NotificationsList from "../components/NotificationsList";

const StaffView = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, table: "1", message: "Necesita atencion la mesa" },
    { id: 2, table: "2", message: "Necesita atencion la mesa" },
  ]);

  return (
    <>
      <NotificationsList notifications={notifications} />
    </>
  );
};

export default StaffView;
