import React from "react";
import NotificationCard from "../components/NotificationCard";

const NotificationsList = ({ notifications }) => {

  return (
    <div style={{ display: "flex", flexDirection: "row", margin: "10px"}}>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          title={notification.table}
          description={notification.message}
        />
      ))}
    </div>
  );
};

export default NotificationsList;