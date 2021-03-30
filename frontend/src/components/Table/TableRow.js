import { VoteButton } from "../VoteButton/VoteButton";
import Button from "react-bootstrap/Button";
import ResidentsModal from "../ResidentsModal/ResidentsModal";
import { UsernameContext } from "../../context";
import { useContext } from "react";
import "./TableRow.css";

function thousandSeparator(num) {
  let num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

const TableRow = (props) => {
  const [username] = useContext(UsernameContext);

  return (
    <tr>
      <td>{props.info.name}</td>
      <td className="noBreak">
        {props.info.diameter === "unknown"
          ? "unknown"
          : thousandSeparator(props.info.diameter) + " km"}
      </td>
      <td>{props.info.climate}</td>
      <td>{props.info.terrain}</td>
      <td>
        {props.info.surface_water === "unknown"
          ? "unknown"
          : props.info.surface_water + "%"}
      </td>
      <td>
        {
          props.info.population === "unknown"
            ? "unknown"
            : thousandSeparator(props.info.population) /*  + " people" */
        }
      </td>
      <td>
        {props.info.residents.length === 0 ? (
          "No known residents"
        ) : (
          //------------------------------------------------------------------------------------------------
          <ResidentsModal
            residents={props.info.residents}
            planet={props.info.name}
          />
          // <Button variant="secondary" onClick={residentsData}>
          //   {props.info.residents.length} resident(s)
          // </Button>

          //------------------------------------------------------------------------------------------------
        )}
      </td>
      {username !== "" && (
        <td>
          <VoteButton props={props} />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
