import axios from "axios";

export const getAllTasks = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tickets/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
    if (res.data === "") {
      return [];
    } else {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createTask = async (formData, token) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/tickets/`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (formData, token, taskId) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/tickets/${taskId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
