import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import NotificationsList from "../components/NotificationsList";
import { apiUrl } from "../constants/apiConstants";

const StaffView = () => {
  const [notifications, setNotifications] = useState([]);
  const {RESTAURANT_ID} = useParams();
  
  const intervalRef = React.useRef(null);

  const fetchRestaurantNotifications = (restaurant_id) =>{
    fetch(`${apiUrl}/Notifications/${restaurant_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((notif) => {
        setNotifications(notif);
      });
  }

  function startInterval() {
    intervalRef.current = setInterval(() => {
      fetchRestaurantNotifications(RESTAURANT_ID);
    }, 10000);
  }
  
  function stopInterval() {
    clearInterval(intervalRef.current);
  }

  React.useEffect(() => {
    fetchRestaurantNotifications(RESTAURANT_ID);
    startInterval();
    return () => stopInterval();
  }, []);


  return (
    <>
      <NotificationsList notifications={notifications} />
    </>
  );
};

export default StaffView;
