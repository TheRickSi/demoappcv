import axios from "axios";
export async function getFetcher(url) {
  const res = await axios.get(url).then((res) => {
    return res.data;
  });
  return res;
}
