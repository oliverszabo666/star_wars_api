import Alert from "react-bootstrap/Alert";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../context";
import "./Message.css";

/* const variants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
]; */

const getVariant = (type) => {
  const num = Math.floor(type / 100);

  if (num === 2) {
    return "success";
  }

  if (num === 4) {
    return "warning";
  }

  if (num === 5) {
    return "danger";
  }

  return "primary";
};

const Message = () => {
  const [message, setMessage] = useContext(MessageContext);
  const [current, setCurrent] = useState();

  useEffect(() => {
    if (message) {
      setCurrent(message);
      setMessage();
      setTimeout(() => {
        setCurrent();
      }, 5000);
    }
  }, [message]);

  useEffect(() => {
    const removeMessage = () => setCurrent();
    window.addEventListener("click", removeMessage);
    return () => window.removeEventListener("click", removeMessage);
  }, []);

  if (!current || !current.type) {
    return <></>;
  }

  return (
    <div className="messageDisplay">
      <div className="message">
        {current && (
          <Alert
            variant={getVariant(current.type)}
            onClose={() => setCurrent()}
            dismissible
          >
            <Alert.Heading>{current.text}</Alert.Heading>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Message;
