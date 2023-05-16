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

function CustomerForm({ restaurant_name, table_number }) {
  const [open, setOpen] = useState(true);
  const [tableId, setTableId] = useState("");
  const [message, setMessage] = useState("");
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [sendAlert, setSendAlert] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowMessageInput(event.target.checked);
    setSendAlert(false);
    setMessage("");
  };

  //HandleSubmit take the event and instead of default function it will send an alert message or the customer message
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (showMessageInput && sendAlert && message) {
      console.log(`Mensaje de Mesa ${table_number}: ${message}`);
    } else {
      console.log(`La Mesa ${table_number} necesita atencion`);
    }
  };
  //This checks if the message is empty or not and based in that variable it will set true or false to the SendAlert variable
  useEffect(() => {
    if(message !== ""){
      setSendAlert(true);
    }
    else setSendAlert(false);
    
  }, [message])
  
  

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Bienvenido a {restaurant_name}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              disabled
              margin="dense"
              label={`Su mesa es la numero: ${table_number}`}
              fullWidth
              defaultValue={table_number}
              onChange={(event) => setTableId(event.target.value)}
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
                onChange={(event) =>{
                  setMessage(event.target.value)
                }}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          {showMessageInput && (
            <Button onClick={() =>{
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
