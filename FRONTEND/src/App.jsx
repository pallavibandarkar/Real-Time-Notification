import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NotificationForm from "./NotificationForm";
import {
  Container,
  Typography,
  List,
  ListItem,
  Snackbar,
  Alert,
} from "@mui/material";

const socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

function App() {
  const [notifications, setNotifications] = useState([]);
  const [feedback, setFeedback] = useState({ open: false, message: "", type: "success" });

  useEffect(() => {
    socket.on("receive_notification", ({ message }) => {
      setNotifications((prev) => [...prev, message]);
    });

    socket.on("success_notification", ({ status }) => {
      setFeedback({ open: true, message: status, type: "success" });
    });

    socket.on("error_notification", ({ error }) => {
      setFeedback({ open: true, message: error, type: "error" });
    });

    socket.on("connect_error", () => {
      setFeedback({ open: true, message: "Socket connection failed", type: "error" });
    });

    return () => {
      socket.off("receive_notification");
      socket.off("success_notification");
      socket.off("error_notification");
      socket.off("connect_error");
    };
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Real-Time Notification
      </Typography>

      <NotificationForm socket={socket} />

      <Typography variant="h6" sx={{ mt: 4 }}>
        Notifications
      </Typography>
      <List>
        {notifications.map((msg, index) => (
          <ListItem key={index}>{msg}</ListItem>
        ))}
      </List>



      {/* Feedback */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setFeedback({ ...feedback, open: false })}
          severity={feedback.type}
          sx={{ width: "100%" }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
