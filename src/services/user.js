import axios from "axios";

export const signUp = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signUp`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createPsw = async (formData) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/createPsw`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const signIn = async (formData) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/signIn`,
      formData
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const createUser = async (formData, token) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, formData, {
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
      `${process.env.REACT_APP_API_URL}/api/users/${formData.id}`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/`, {
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/devs/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getOneUser = async (id, token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
