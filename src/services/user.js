import axios from "axios";

export const signUp = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signUp");
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const signIn = async (formData) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/signIn",
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createUser = async (formData, token) => {
  try {
    const res = await axios.post("http://localhost:5000/api/users", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateDev = async (formData, token) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/users/${formData.id}`,
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

export const getAllUsers = async (token) => {
  try {
    const res = await axios.get("http://localhost:5000/api/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAllDevs = async (token) => {
  try {
    const res = await axios.get("http://localhost:5000/api/users/devs/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw  error;
  }
};

export const getOneUser = async (id, token) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/users/filter/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
