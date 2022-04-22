import HashLoader from "react-spinners/HashLoader";

function Spinner(props) {
  return <HashLoader color={"#f68657"} loading={props.loading} size={50} />;
}

export default Spinner;
