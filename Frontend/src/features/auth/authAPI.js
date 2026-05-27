import API from "../../api/api";

export const registerAPI = async (formData) => {
  const { data } = await API.post("/auth/register", formData);

  return data;
};

export const loginAPI = async (formData) => {
  const { data } = await API.post("/auth/login", formData);

  return data;
};