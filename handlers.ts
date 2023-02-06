const fetchList = async () => {
  const res = await fetch("https://random-word-api.herokuapp.com/all");
  const data = await res.json();
  return data;
};

export { fetchList };
