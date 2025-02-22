const BASE_URL = "http://localhost:3001";
const API_BASE_URL = "/api";

export async function createChat(token) {
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

export async function sendChatMessage(chatId, message, token) {
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

export async function handleResponse(response) {
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
}

export async function get(endpoint, token) {
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
}

export async function post(endpoint, data, token) {
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
}

export async function put(endpoint, data, token) {
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
}

export async function deleteRequest(endpoint, token) {
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
}
