import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import NotificationsList from "../components/NotificationsList";

const StaffView = () => {
  const [notifications, setNotifications] = useState([]);
  const [restaurant_id, setRestaurantId] = useState('1');
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const RESTAURANT_ID = params.get("restaurant_id");

  React.useEffect(() => {
    fetch(`http://localhost:8000/api/Notifications/${RESTAURANT_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((notif) => {
        setNotifications(notif);
        console.log(notifications);
      });

  }, []);


  return (
    <>
      <NotificationsList notifications={notifications} />
    </>
  );
};

export default StaffView;
