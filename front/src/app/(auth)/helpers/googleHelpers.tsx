import axios from "axios";

const getHashParam = (paramName: string) => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const param = params.get(paramName);
  return param;
};

const fetchGoogleUserInfo = async (accessToken: string) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Error fetching user info");
  }
};

export { getHashParam, fetchGoogleUserInfo };
