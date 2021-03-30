import { useState, useEffect } from "react";
import TableComponent from "../Table/TableComponent";
import Button from "react-bootstrap/Button";
import "./Index.css";

const Index = () => {
  const [url, setUrl] = useState("https://swapi.dev/api/planets/");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const FetchData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const json = await response.json();
    console.log("data:", json);
    setData(json);
    setLoading(false);
  };

  console.log(data);

  useEffect(() => {
    FetchData();
  }, [url]);

  return (
    <div className="index">
      <h1>Star Wars Universe Planets</h1>
      <div className="buttons">
        <div className="page">
          {data.count ? `${page}/${data.count / 10}` : ""}
        </div>
        <Button
          className="buttonPrevious"
          onClick={() => {
            setUrl(data.previous);
            setPage((prev) => prev - 1);
          }}
          disabled={loading || data.previous === null}
        >
          Previous
        </Button>
        <Button
          className="buttonNext"
          onClick={() => {
            setUrl(data.next);
            setPage((prev) => prev + 1);
          }}
          disabled={loading || data.next === null}
        >
          Next
        </Button>
      </div>

      <TableComponent results={data.results} />
    </div>
  );
};

export default Index;
