import axios from "axios";
import useSWRMutation from "swr/mutation";
export function PutApi(url, token) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token !== "") {
    headers["Authorization"] = "Token " + token;
  }
  const fetcher = async (url, { arg }) => {
    const res = await axios
      .put(url, JSON.stringify(arg), { headers })
      .then((response) => {
        return response.data;
      });
    return res;
  };
  return useSWRMutation(url, fetcher);
}
