export const fetcher = async (url, option) => {
  return await fetch(url, option).then(res => res.json());
};
