import TableRow from "./TableRow";
import Table from "react-bootstrap/Table";
import { UsernameContext } from "../../context";
import { useContext } from "react";

const TableComponent = (props) => {
  const [username] = useContext(UsernameContext);

  let planetList;
  //let planetList = ""; ez volt a hiba ami tr warningot dobta

  if (props.results) {
    planetList = props.results.map((planetinfo) => (
      <TableRow key={planetinfo.name} info={planetinfo} />
    ));
  }

  return (
    <Table responsive bordered>
      <thead className="noBreak">
        <tr>
          <th>Name</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Residents</th>

          {username !== "" && <th></th>}
        </tr>
      </thead>
      <tbody>{planetList}</tbody>
    </Table>
  );
};

export default TableComponent;
