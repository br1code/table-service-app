import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { apiUrl } from "../constants/apiConstants";

function CustomerForm({ restaurant_data }) {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [showMessageInput, setShowMessageInput] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowMessageInput(event.target.checked);
    setSendAlert(false);
    setMessage("");
  };

  //HandleSubmit take the event and instead of default function it will send an alert message or the customer message
  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      restaurantId: restaurant_data.restaurantId,
      tableId: restaurant_data.tableId,
      message: message,
    }
    fetch(`${apiUrl}/api/Notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }).then((response) => console.log(response))
    setMessage("");
    setShowMessageInput(false);
  };
  
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Bienvenido a {restaurant_data.restaurantName}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              disabled
              margin="dense"
              label={`Su mesa es la numero: ${restaurant_data.tableName}`}
              fullWidth
              defaultValue={restaurant_data.tableName}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showMessageInput}
                  onChange={handleCheckboxChange}
                />
              }
              label="Quieres enviarle un mensaje al mozo?"
            />
            {showMessageInput && (
              <TextField
                margin="dense"
                label="Message"
                type="text"
                fullWidth
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value)
                }}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          {showMessageInput && (
            <Button onClick={() => {
              setSendAlert(true)
              handleSubmit(event)
            }}>Mandar Mensaje</Button>
          )}
          {!showMessageInput && (
            <Button onClick={() => handleSubmit(event)}>Pedir Atencion</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerForm;
