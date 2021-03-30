import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";

const VoteModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    fetchData();
  };

  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await fetch("/votestat");
    const json = await response.json();
    setData(json);
  };

  let votedPlanets;

  if (data) {
    const planets = data.map((d) => d.planet_name);
    const mySet = new Set(planets);
    const newPlanets = [...mySet];
    votedPlanets = newPlanets.map((value) => [
      {
        name: value,
        vote: planets.filter((item) => item === value).length,
      },
    ]);
  }

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Voting Statistics
      </Button>

      {votedPlanets && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Voting statistics</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Planet name</th>
                  <th>Received votes</th>
                </tr>
              </thead>
              <tbody>
                {votedPlanets.map((i) =>
                  i.map((planet) => {
                    return (
                      <tr key={planet.name}>
                        <td>{planet.name}</td>
                        <td>{planet.vote}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default VoteModal;
