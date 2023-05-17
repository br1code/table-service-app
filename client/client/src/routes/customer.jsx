import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import { CircularProgress } from "@mui/material";



const CustomerView = () => {
  const SERVER_URL = 'http://localhost:8000/api';

  //Data fetched from the backend to valid the state of the restaurant
  const [restaurantData, setRestaurantData] = useState();

  //With this hook we can extract the URL params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const RESTAURANT_ID = params.get("restaurant_id");
  const TABLE_ID = params.get("table_id");

  //Fetch the data of the restaurant and the table to see if they're valid and then show up the interface
  React.useEffect(() => {
    fetch(`${SERVER_URL}/Restaurants/${RESTAURANT_ID}/table/${TABLE_ID}`)
      .then((response) => response.json())
      .then((data) => setRestaurantData(data));
  }, []);

  return (
    <>

      {restaurantData ? (<CustomerForm restaurant_data={restaurantData} />)
        : (
          <div style={{ display: "flex"}}>
            <CircularProgress sx={{position:"absolute", right:"50%", top: "50%" }} color="inherit" />
          </div>
        )
      }

    </>
  );
};

export default CustomerView;
