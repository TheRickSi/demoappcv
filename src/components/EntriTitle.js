import React from "react";
import Global from "./General";
import useSWR from "swr";
import { getFetcher } from "../util/fetchers/getFetcher";
const EntriTitle = ({ isbn, idx }) => {
  const url =
    Global.bookAPI +
    "?q=" +
    isbn +
    "&key=AIzaSyDZXv-h8X6rBcHP9tOaBkMIQa18bQmQlNA";
  const { data } = useSWR(url, getFetcher, {
    suspense: true,
  });
  return (
    <div className="p-2 flex-grow-1" key={"titlediv-" + idx}>
      {data.items[0].volumeInfo.title}
    </div>
  );
};
export default EntriTitle;
