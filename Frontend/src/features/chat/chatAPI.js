import API from "../../api/api";

export const getConversationsAPI =
async () => {

  const { data } = await API.get(
    "/conversations/my-conversations"
  );

  return data;
};

export const getMessagesAPI =
async (conversationId) => {

  const { data } = await API.get(
    `/messages/get-messages/${conversationId}`
  );

  return data;
};

export const sendMessageAPI =
async (formData) => {

  const { data } = await API.post(
    "/messages/send-message",
    formData
  );

  return data;
};

export const seenMessageAPI =
async (id) => {

  const { data } = await API.put(
    `/messages/mark-seen/${id}`
  );

  return data;
};