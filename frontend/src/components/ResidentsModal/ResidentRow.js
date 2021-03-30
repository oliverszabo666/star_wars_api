import { FaFemale, FaMale } from "react-icons/fa";

const ResidentRow = ({ resident }) => {
  return (
    <>
      <tr>
        <td>{resident.name}</td>
        <td>
          {isNaN(parseInt(resident.height))
            ? "-"
            : (parseInt(resident.height) / 100).toFixed(2)}
        </td>
        <td>{resident.mass !== "unknown" ? resident.mass : "-"}</td>
        <td>{resident.hair_color !== "none" ? resident.hair_color : "-"}</td>
        <td>{resident.skin_color}</td>
        <td>{resident.eye_color}</td>
        <td>{resident.birth_year !== "unknown" ? resident.birth_year : "-"}</td>
        <td className="gender-align-center">{resident.gender === "male" ? <FaFemale /> : <FaMale />}</td>
      </tr>
    </>
  );
};

export default ResidentRow;
