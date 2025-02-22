const BASE_URL = "http://localhost:3001";
const API_BASE_URL = "https://your-api-endpoint.com";

async function createChat(token) {
  const res = await fetch(BASE_URL + "/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return Promise.reject({ status: res.status, data });
  }
  return data;
}

async function sendChatMessage(chatId, message, token) {
  const res = await fetch(BASE_URL + `/chats/${chatId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }
  return res.body;
}

const handleResponse = async (response) => {
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

const get = async (endpoint, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

const post = async (endpoint, data, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

const put = async (endpoint, data, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

const deleteRequest = async (endpoint, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export default {
  createChat,
  sendChatMessage,
  get,
  post,
  put,
  deleteRequest,
};
