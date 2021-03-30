import { useRef } from "react";
import { useContext } from "react";
import { UsernameContext, MessageContext } from "../context";

export const useUserAuth = (url) => {
  const [, setUsername] = useContext(UsernameContext);
  const [, setMessage] = useContext(MessageContext);

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameInput.current.value;
    const password = passwordInput.current.value;

    if (!username || !password) {
      return setMessage({ type: 400, text: "Please, fill in both fields." });
    }

    const user = { username, password };

    console.log("user:", user);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);

      setMessage({ text: data.message, type: res.status });

      if (data.username) {
        setUsername(data.username);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [usernameInput, passwordInput, handleSubmit];
};
