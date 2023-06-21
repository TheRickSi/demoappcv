import axios from "axios";
import { useApi } from "../Hook/Api";
import useSWR from "swr";
export function PutApi(url, article, token, setBlank) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token !== "") {
    headers["Authorization"] = "Token " + token;
  }
  const fetcher = async (url) => {
    const res = await axios.put(url, article, { headers }).then((response) => {
      setBlank(null);
      return response.data;
    });
    return res;
  };
  return useSWR(url, fetcher);
}
