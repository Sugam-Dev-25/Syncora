import API from "../../api/api";

export const registerAPI = async (formData) => {

  const { data } = await API.post(
    "/auth/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;

};

export const loginAPI = async (formData) => {

  const { data } = await API.post(
    "/auth/login",
    formData
  );

  return data;

};

export const logoutAPI = async () => {
  const { data } = await API.post("/auth/logout");

  return data;
};

export const getMeAPI = async () => {
  const { data } = await API.get("/auth/me");

  return data;
};