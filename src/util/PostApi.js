import axios from "axios";
import useSWRMutation from "swr/mutation";
export function PostApi(route, token) {
  const head = {
    "Content-Type": "application/json",
  };
  if (token !== "") {
    head["Authorization"] = "Token " + token;
  }
  const fetcher = async (url, { arg }) => {
    const res = await axios
      .post(url, JSON.stringify(arg), {
        headers: head,
      })
      .then((response) => {
        console.log(response);
        return {
          Response: response.data,
          Form: arg,
        };
      })
      .catch(function (error) {});
    return res;
  };

  return useSWRMutation(route, fetcher, { suspense: false });
}
