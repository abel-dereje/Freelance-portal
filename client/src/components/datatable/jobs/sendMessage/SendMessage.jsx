import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./sendMessage.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";

const SendMessage = () => {
  const { userId } = useParams();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendMessage = async () => {
    try {
      setSending(true);
      const response = await axios.post(`http://localhost:4000/messages/${userId}`, {
        message: message
      });
      setSent(true);
      setMessage("");
    } catch (error) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    
    <div className="single">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
<br />
      <h4>Send Message</h4><br />
      <textarea
        className="messageInput"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {error && <div className="errorMessage">{error}</div>}
      <button
        className="sendButton"
        onClick={handleSendMessage}
        disabled={!message || sending}
      >
        {sending ? "Sending..." : "Send Message"}
      </button>
      {sent && <div className="successMessage">Message sent successfully!</div>}
    </div>
    </div>
  );
};

export default SendMessage;
