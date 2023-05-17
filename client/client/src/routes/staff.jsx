import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import NotificationsList from "../components/NotificationsList";

const StaffView = () => {
  const [notifications, setNotifications] = useState([]);
  const [restaurant_id, setRestaurantId] = useState('1');
  
  const intervalRef = React.useRef(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const {RESTAURANT_ID} = useParams();

  const fetchRestaurantNotifications = (restaurant_id) =>{
    fetch(`http://localhost:8000/api/Notifications/${restaurant_id}`, {
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
