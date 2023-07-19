import axios from "axios";
export async function putFetcher(url, arg, token) {
  console.log(arg);
  const head = {
    "Content-Type": "application/json",
  };
  if (token !== "") {
    head["Authorization"] = "Token " + token;
  }
  const res = await axios
    .put(url, JSON.parse(arg), {
      headers: head,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
  return res;
}
