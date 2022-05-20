import axios from "axios";

export const getAllRols = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/rols/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
