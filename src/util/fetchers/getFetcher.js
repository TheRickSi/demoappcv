import axios from "axios";
export async function getFetcher(url) {
  const head = {
    "Content-Type": "application/json",
  };
  const res = await axios.get(url, { headers: head }).then((res) => {
    return res.data;
  });
  return res;
}
