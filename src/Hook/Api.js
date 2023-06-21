import useSWR from "swr";
export function useApi(url, fetcher, isSuspense) {
  const { data, error } = useSWR(url, fetcher, { suspense: isSuspense });
  return { data };
}
