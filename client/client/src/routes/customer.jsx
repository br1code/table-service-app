import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";

const SERVER_URL = 'localhost:5194';

const CustomerView = () => {
  //data fetched from the backend to valid the state of the restaurant
  const [restaurantData, setRestaurantData] = useState(null);

  //with this hook we can extract the URL params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const RESTAURANT_ID = params.get("restaurant_id");
  const TABLE_ID = params.get("table_id");

  //Fetch the data of the restaurant and the table to see if they're valid and then show up the interface
  React.useEffect(() => {
    fetch(`https://${SERVER_URL}/restaurant/${RESTAURANT_ID}/table/${TABLE_ID}`)
      .then((response) => response.json())
      .then((data) => setRestaurantData(data));
      console.log(restaurantData);
  }, []);

  return (
    <>
      <CustomerForm restaurant_name={RESTAURANT_ID} table_number={TABLE_ID} />
    </>
  );
};

export default CustomerView;
