import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const CustomerView = () => {
  
  //with this hook we can extract the URL params listed down here
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const RESTAURANT_ID = params.get("restaurant_id");
  const TABLE_ID = params.get("table_id");

  //data fetched from the backend to valid the state of the restaurant and the table
  const [data, setData] = useState(null);
  
  
  

  //Fetch the data of the restaurant and the table to see if they're valid and then show up the interface
  React.useEffect(() => {
    fetch(`https://${SERVER_URL}/restaurant/${RESTAURANT_ID}/table/${TABLE_ID}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <h1>CUSTOMER OPTIONS:</h1>
    </>
  );
};

export default CustomerView;
