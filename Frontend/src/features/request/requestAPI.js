import API from "../../api/api";

export const sendRequestAPI =
async (receiverId) => {

  const { data } = await API.post(
    "/requests/send-request",
    {
      receiverId,
    }
  );

  return data;
};

export const getRequestsAPI =
async () => {

  const { data } = await API.get(
    "/requests/get-requests"
  );

  return data;
};

export const acceptRequestAPI =
async (id) => {

  const { data } = await API.post(
    `/requests/accept-request/${id}`
  );

  return data;
};

export const rejectRequestAPI =
async (id) => {

  const { data } = await API.post(
    `/requests/reject-request/${id}`
  );

  return data;
};