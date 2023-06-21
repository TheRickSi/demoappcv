import useSWR from "swr";
import { useApi } from "../Hook/Api";
import axios from "axios";

export function GetApi(url) {
  const fetcher = async (url) => {
    const res = await axios.get(url).then((res) => {
      return res.data;
    });
    return res;
  };
  return useSWR(url, fetcher, { suspense: true });
}
