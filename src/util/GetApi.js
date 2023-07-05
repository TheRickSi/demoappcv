import useSWR from "swr";
import { useApi } from "../Hook/Api";
import axios from "axios";

export function GetApi(url, options) {
  const fetcher = async (url) => {
    const res = await axios.get(url).then((res) => {
      return res.data;
    });
    return res;
  };
  let optionsByD = {
    suspense: true,
    ...options,
  };
  return useSWR(url, fetcher, optionsByD);
}
