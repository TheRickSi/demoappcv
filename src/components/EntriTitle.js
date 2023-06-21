import React from "react";
import { GetApi } from "../util/GetApi";
import Global from "./General";
const EntriTitle = ({ isbn, idx }) => {
  const { data } = GetApi(
    Global.bookAPI +
      "?q=" +
      isbn +
      "&key=AIzaSyDZXv-h8X6rBcHP9tOaBkMIQa18bQmQlNA"
  );
  return (
    <div className="p-2 flex-grow-1" key={"titlediv-" + idx}>
      {data.items[0].volumeInfo.title}
    </div>
  );
};
export default EntriTitle;
