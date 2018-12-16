import "./index.scss";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import Grid from "./grid";
import fetch from "isomorphic-unfetch";

Grid.getInitialProps = async () => {
  const res = await fetch("http://127.0.0.1:3000/timeline?count=200");
  const data = await res.json();

  return {
    tweets: data
  };
};

export default Grid;
