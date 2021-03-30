import { Modal, Button, Table, Spinner } from "react-bootstrap";
import { useState } from "react";
import "./ResidentsModal.css";
import ResidentRow from "./ResidentRow";

const ResidentsModal = ({ residents, planet }) => {
  const [resident, setResidents] = useState([]);

  const FetchData = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    setResidents((prevResident) => [...prevResident, json]);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setResidents([]);
  };

  const handleShow = () => {
    for (let resident of residents) {
      FetchData(resident);
    }

    setShow(true);
  };

  return (
    <>
      <Button
        variant="outline-info"
        onClick={handleShow}
        className="noBreak"
        block
      >
        {`${residents.length} resident${residents.length > 1 ? "s" : ""}`}
      </Button>

      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Residents of {planet}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resident.length !== residents.length ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Table bordered className="residents-modal-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Height (m)</th>
                  <th>Mass</th>
                  <th>Hair color</th>
                  <th>Skin color</th>
                  <th>Eye color</th>
                  <th>Birth year</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {resident.map((item) => (
                  <ResidentRow
                    key={item.created + item.edited}
                    resident={item}
                  />
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResidentsModal;
