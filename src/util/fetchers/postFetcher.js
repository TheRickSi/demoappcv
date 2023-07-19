import axios from "axios";
export async function postFetcher(url, { arg }) {
  const token = url.token;
  const head = {
    "Content-Type": "application/json",
  };
  if (token !== "") {
    head["Authorization"] = "Token " + token;
  }
  const res = await axios
    .post(url.url, JSON.stringify(arg), {
      headers: head,
    })
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      throw error;
    });
  return res;
}
