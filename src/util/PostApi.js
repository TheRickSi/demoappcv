import axios from "axios";
import useSWR from "swr";
export function PostApi(route, dates, token) {
  const head = {
    "Content-Type": "application/json",
  };
  if (token !== "") {
    head["Authorization"] = "Token " + token;
  }
  const fetcher = async (url) => {
    const res = await axios
      .post(url, dates, {
        headers: head,
      })
      .then((response) => {
        return {
          Response: response.data,
          Form: dates,
        };
      })
      .catch(function (error) {});
    return res;
  };

  return useSWR(route, fetcher, { suspense: false });
}
