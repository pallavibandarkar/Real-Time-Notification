import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const NotificationForm = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send_notification", { message });
      setMessage("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2 }}>
      <TextField
        fullWidth
        label="Enter a message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
    </Box>
  );
};

export default NotificationForm;
