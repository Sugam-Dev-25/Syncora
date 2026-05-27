import API from "../../api/api";

export const searchUsersAPI = async (search) => {

  const { data } = await API.get(
    `/users/search?search=${search}`
  );

  return data;
};

export const getProfileAPI = async () => {

  const { data } = await API.get("/users/profile");

  return data;
};

export const getSingleUserAPI = async (id) => {

  const { data } = await API.get(`/users/${id}`);

  return data;
};