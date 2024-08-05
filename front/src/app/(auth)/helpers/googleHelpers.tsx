import axios from "axios";

const getHashParam = (paramName: string) => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const param = params.get(paramName);
  return param;
};

export { getHashParam };
