import React from "react";
import { useContext } from "react";
import { MessageContext } from "../../context";
import Button from "react-bootstrap/Button";

export const VoteButton = (props) => {
  const [, setMessage] = useContext(MessageContext);

  const Vote = (e) => {
    e.preventDefault();
    const planet_name = props.props.info.name;
    console.log(`Voted on ${planet_name} successfully.`);

    const postVote = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planet_name }),
    };

    fetch("/vote", postVote)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        setMessage({
          text: `There was an error during voting on planet ${planet_name}.`,
          type: 500,
        });
        console.error(error);
      });
  };

  return (
    <Button variant="outline-success" onClick={Vote}>
      Vote
    </Button>
  );
};
