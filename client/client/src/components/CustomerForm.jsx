import { useState } from "react";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Table ID: ${tableId}`);
    if (sendAlert) {
      console.log(`Sending alert with message: ${message}`);
    }
  };

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
                onChange={(event) => setMessage(event.target.value)}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          //TODO TERMINAR HANDLE SUBMIT: 
          // MANDAR MENSAJE - setAlert to false
          // PEDIR ATENCION - setAlert to true
          {showMessageInput && (
            <Button onClick={() => setSendAlert(true)}>Mandar Mensaje</Button>
          )}
          {!showMessageInput && (
            <Button onClick={() => handleSubmit}>Pedir Atencion</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerForm;
