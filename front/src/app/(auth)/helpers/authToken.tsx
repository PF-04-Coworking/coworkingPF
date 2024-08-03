const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

const saveAuthToken = (authToken: string) => {
  localStorage.setItem("auth_token", authToken);
};

const removeAuthToken = () => {
  localStorage.removeItem("auth_token");
};

export { getAuthToken, saveAuthToken, removeAuthToken };
